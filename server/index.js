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
  if (!deckId) {
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
