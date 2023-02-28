require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const authorizationMiddleware = require('./authorizatino-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  try {
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "accounts" ("username", "hashedPassword")
      values ($1, $2)
      on conflict("username")
      do nothing
      returning "userId", "username", "joinedAt"
      `;

    const params = [username, hashedPassword];

    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(409, 'username is already taken');
    } else {
      res.status(201).json(user);
    }
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }

  try {
    const sql = `
    select "userId",
           "hashedPassword",
           "newUser"
    from "accounts"
      where "username" = $1
    `;

    const params = [username];

    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword, newUser } = user;
    const isMatching = await argon2.verify(hashedPassword, password);
    if (!isMatching) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username, newUser };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.use(authorizationMiddleware);

app.get('/api/decks', async (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select "decks".*,
           count("flashcards".*) as "cardCount",
           sum("flashcards"."confidence") as "totalConfidence"
      from "decks"
    left join "flashcards" using ("deckId")
    where "decks"."userId" = $1
    group by "decks"."deckId"
  `;

  const params = [userId];

  try {
    const result = await db.query(sql, params);
    const decks = result.rows;
    res.status(200).json(decks);
  } catch (err) {
    next(err);
  }
});

app.get('/api/cards/:deckId', async (req, res, next) => {
  const { userId } = req.user;
  const deckId = Number(req.params.deckId);
  if (!deckId || deckId < 1) {
    throw new ClientError(400, 'deckId must be a positive integer');
  }

  let sql = `
  select  "decks"."deckName",
          "flashcards".*
      from "decks"
  left join "flashcards" using ("deckId")
  where "deckId" = $1
    and "decks"."userId" = $2
    order by "cardId"
  `;

  if (req.query.order === 'shuffle') {
    sql = `
    select  "decks"."deckName",
            "flashcards".*
      from "decks"
    left join "flashcards" using ("deckId")
    where "deckId" = $1
     and "decks"."userId" = $2
     order by random()
  `;
  } else if (req.query.order === 'asc') {
    sql = `
    select  "decks"."deckName",
          "flashcards".*
      from "decks"
    left join "flashcards" using ("deckId")
    where "deckId" = $1
      and "decks"."userId" = $2
      order by "confidence"
  `;
  } else if (req.query.order === 'desc') {
    sql = `
    select  "decks"."deckName",
          "flashcards".*
      from "decks"
    left join "flashcards" using ("deckId")
    where "deckId" = $1
      and "decks"."userId" = $2
      order by "confidence" desc
  `;
  }

  const params = [deckId, userId];

  try {
    const result = await db.query(sql, params);
    const cards = result.rows;
    res.status(200).json(cards);
  } catch (err) {
    next(err);
  }
});

app.get('/api/card/:cardId', async (req, res, next) => {
  const { userId } = req.user;
  const cardId = Number(req.params.cardId);
  if (!cardId || cardId < 1) {
    throw new ClientError(400, 'cardId must be a positive integer');
  }

  const sql = `
  select "flashcards"."question",
         "flashcards"."answer",
         "decks"."deckName"
    from "flashcards"
    join "decks" using ("deckId")
  where "cardId" = $1
    and "flashcards"."userId" = $2
  `;

  const params = [cardId, userId];

  try {
    const result = await db.query(sql, params);
    const [card] = result.rows;
    if (!card) {
      throw new ClientError(404, `cannot find card with cardId ${cardId}`);
    } else {
      res.json(card);
    }
  } catch (err) {
    next(err);
  }
});

app.post('/api/create-deck', async (req, res, next) => {
  const { userId } = req.user;
  const { deckName } = req.body;
  if (!deckName) {
    throw new ClientError(400, 'deckName is a required field');
  }

  const sql = `
  insert into "decks" ("deckName", "userId")
  values ($1, $2)
  returning *
  `;

  const params = [deckName, userId];

  try {
    const result = await db.query(sql, params);
    const [deck] = result.rows;
    res.status(201).json(deck);
  } catch (err) {
    next(err);
  }
});

app.post('/api/add-card/:deckId', async (req, res, next) => {
  const { userId } = req.user;
  const deckId = Number(req.params.deckId);
  if (!deckId || deckId < 1) {
    throw new ClientError(400, 'deckId must be a positive integer');
  }
  const { question, answer } = req.body;
  if (!question || !answer) {
    throw new ClientError(400, 'question and answer are required fields');
  }

  const sql = `
  insert into "flashcards" ("question", "answer", "userId", "deckId")
  values ($1, $2, $3, $4)
  returning *
  `;

  const params = [question, answer, userId, deckId];

  try {
    const result = await db.query(sql, params);
    const [cards] = result.rows;
    res.status(201).json(cards);
  } catch (err) {
    next(err);
  }
});

app.patch('/update/newuser', (req, res, next) => {
  const { userId } = req.user;

  const sql = `
  update "accounts"
  set "newUser" = false
  where "userId" = $1
  returning *
  `;

  const params = [userId];

  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(404, `cannot find user with userId ${userId}`);
      } else {
        res.send();
      }
    })
    .catch(err => next(err));
});

app.patch('/api/card/:cardId', (req, res, next) => {
  const { userId } = req.user;
  const cardId = Number(req.params.cardId);
  if (!cardId || cardId < 1) {
    throw new ClientError(400, 'cardId must be a positive integer');
  }
  const { question, answer } = req.body;
  if (!question || !answer) {
    throw new ClientError(400, 'question and answer are required fields');
  }

  const sql = `
  update "flashcards"
  set "question" = $1,
      "answer" = $2
  where "cardId" = $3
    and "userId" = $4
  returning *
  `;

  const params = [question, answer, cardId, userId];

  db.query(sql, params)
    .then(result => {
      const [updatedCard] = result.rows;
      if (!updatedCard) {
        throw new ClientError(404, `cannot find card with cardId ${cardId}`);
      } else {
        res.json(updatedCard);
      }
    })
    .catch(err => next(err));
});

app.patch('/api/card/confidence/:cardId', (req, res, next) => {
  const { userId } = req.user;
  const cardId = Number(req.params.cardId);
  const confidence = Number(req.body.confidence);
  if (!cardId || cardId < 1) {
    throw new ClientError(400, 'cardId must be a positive integer');
  }
  if (!confidence || confidence < 0 > 5) {
    throw new ClientError(400, 'confidence must be a positive integer between 1 and 5');
  }

  const sql = `
  update "flashcards"
  set "confidence" = $1
  where "cardId" = $2
    and "userId" = $3
  returning *
  `;

  const params = [confidence, cardId, userId];

  db.query(sql, params)
    .then(result => {
      const [updatedCard] = result.rows;
      if (!updatedCard) {
        throw new ClientError(404, `cannot find card with cardId ${cardId}`);
      } else {
        res.json(updatedCard);
      }
    })
    .catch(err => next(err));
});

app.patch('/api/deck/confidence/:deckId', (req, res, next) => {
  const { userId } = req.user;
  const deckId = Number(req.params.deckId);
  if (!deckId) {
    throw new ClientError(400, 'deckId must be a positive integer');
  }

  const sql = `
  update "flashcards"
  set "confidence" = 0
  where "deckId" = $1
    and "userId" = $2
  returning *
  `;

  const params = [deckId, userId];

  db.query(sql, params)
    .then(result => {
      const updatedCards = result.rows;
      if (!updatedCards || !updatedCards.length) {
        throw new ClientError(404, `cannot find cards with deckId ${deckId}`);
      } else {
        res.json(updatedCards);
      }
    })
    .catch(err => next(err));
});

app.delete('/api/deletecard/:cardId', (req, res, next) => {
  const { userId } = req.user;
  const cardId = Number(req.params.cardId);
  if (!cardId) {
    throw new ClientError(400, 'cardId must be a positive integer');
  }

  const sql = `
  delete from "flashcards"
    where "cardId" = $1
      and "userId" = $2
  returning *
  `;

  const params = [cardId, userId];

  db.query(sql, params)
    .then(result => {
      const [deleted] = result.rows;
      if (!deleted) {
        throw new ClientError(404, `cannot find card with cardId ${cardId}`);
      } else {
        res.status(204).send();
      }
    })
    .catch(err => next(err));
});

app.delete('/api/deletedeck/:deckId', (req, res, next) => {
  const { userId } = req.user;
  const deckId = Number(req.params.deckId);
  if (!deckId) {
    throw new ClientError(400, 'deckId must be a positive integer');
  }

  const sql = `
  WITH deletedCards as (
    delete from "flashcards"
      where "deckId" = $1
        and "userId" = $2
    )
    delete from "decks"
      where "deckId" = $1
  `;

  const params = [deckId, userId];

  db.query(sql, params)
    .then(result => {
      const deleted = result.rows;
      if (!deleted || deleted === []) {
        throw new ClientError(404, `cannot find deck with deckId ${deckId}`);
      } else {
        res.status(204).send();
      }
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
