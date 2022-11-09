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
);

insert into "flashcards" (
  "question",
  "answer",
  "userId",
  "deckId"
) values (
  'Do you like pancakes?',
  'Yeah we like pancakes',
  1,
  1
), (
  'Do you like waffles?',
  'Yeah we like waffles',
  1,
  1
);
