insert into "accounts" (
  "username",
  "hashedPassword"
) values (
  'dummyUser',
  'asdhiuqewhd983y@#Y#$@#Y@_08rt39dfasdh2398y_@*y'
);

insert into "decks" (
  "deckName",
  "userId"
) values (
  'Test test 1 2 3',
  1
), (
  'duMB qUesTions',
  1
);

insert into "flashcards" (
  "question",
  "answer",
  "userId",
  "deckId",
  "confidence"
) values (
  'Do you like pancakes?',
  'Yeah we like pancakes',
  1,
  1,
  4
), (
  'Do you like waffles?',
  'Yeah we like waffles',
  1,
  1,
  3
), (
  'Do you like french toast?',
  'Yeah we like french toast',
  1,
  1,
  5
);

insert into "flashcards" (
  "question",
  "answer",
  "userId",
  "deckId",
  "confidence"
) values (
  'What is brown and sticky?',
  'A stick',
  1,
  2,
  5
), (
  'What is Tim"s favourite flavour of watermelon?',
  'red obv',
  1,
  2,
  3
), (
  'What is red and tastes like paint?',
  'red paint',
  1,
  2,
  1
)
