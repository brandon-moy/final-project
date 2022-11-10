require('dotenv/config');
const express = require('express');
const ClientError = require('./client-error');
const pg = require('pg');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/decks', (req, res, next) => {
  const sql = `
    select *
      from "decks"
    where "userId" = $1
  `;

  const params = [1];

  db.query(sql, params)
    .then(result => {
      const decks = result.rows;
      res.status(200).json(decks);
    })
    .catch(err => next(err));
});

app.get('/api/cards/:deckId', (req, res, next) => {
  const deckId = Number(req.params.deckId);
  if (!deckId || deckId < 1) {
    throw new ClientError(400, 'deckId must be a positive integer');
  }

  const sql = `
  select *
    from "flashcards"
  where "deckId" = $1
    and "userId" = $2
  order by "cardId"
  `;

  const params = [deckId, 1];

  db.query(sql, params)
    .then(result => {
      const cards = result.rows;
      res.status(200).json(cards);
    })
    .catch(err => next(err));
});

app.get('/api/card/:cardId', (req, res, next) => {
  const cardId = Number(req.params.cardId);
  if (!cardId || cardId < 1) {
    throw new ClientError(400, 'cardId must be a positive integer');
  }

  const sql = `
  select "question",
         "answer"
    from "flashcards"
  where "cardId" = $1
    and "userId" = $2
  `;

  const params = [cardId, 1];

  db.query(sql, params)
    .then(result => {
      const [card] = result.rows;
      if (!card) {
        throw new ClientError(404, `cannot find card with cardId ${cardId}`);
      } else {
        res.json(card);
      }
    })
    .catch(err => next(err));
});

app.post('/api/create-deck', (req, res, next) => {
  const { deckName } = req.body;
  if (!deckName) {
    throw new ClientError(400, 'deckName is a required field');
  }

  const sql = `
  insert into "decks" ("deckName", "userId")
  values ($1, $2)
  returning *
  `;

  const params = [deckName, 1];

  db.query(sql, params)
    .then(result => {
      const [deck] = result.rows;
      res.status(201).json(deck);
    })
    .catch(err => next(err));
});

app.post('/api/add-card/:deckId', (req, res, next) => {
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

  const params = [question, answer, 1, deckId];

  db.query(sql, params)
    .then(result => {
      const [cards] = result.rows;
      res.status(201).json(cards);
    })
    .catch(err => next(err));
});

app.patch('/api/card/:cardId', (req, res, next) => {
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

  const params = [question, answer, cardId, 1];

  db.query(sql, params)
    .then(result => {
      const [updatedCard] = result.rows;
      if (!updatedCard) {
        throw new ClientError(404, `cannot find card with cardId ${cardId}`);
      } else {
        res.json(updatedCard);
      }
    });
});

app.delete('/api/deletecard/:cardId', (req, res, next) => {
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

  const params = [cardId, 1];

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

  const params = [deckId, 1];

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
