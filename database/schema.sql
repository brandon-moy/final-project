set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "public"."accounts" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"joinedAt" timestamp with time zone NOT NULL default now(),
	CONSTRAINT "accounts_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."flashcards" (
	"question" TEXT NOT NULL,
	"answer" TEXT NOT NULL,
	"userId" int NOT NULL,
	"confidence" int NOT NULL DEFAULT '0',
	"deckId" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."decks" (
	"deckId" serial NOT NULL,
	"deckName" TEXT NOT NULL,
	"userId" int NOT NULL,
	"deckConfidence" int NOT NULL DEFAULT '0',
	CONSTRAINT "decks_pk" PRIMARY KEY ("deckId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_fk0" FOREIGN KEY ("userId") REFERENCES "accounts"("userId");
ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_fk1" FOREIGN KEY ("deckId") REFERENCES "decks"("deckId");

ALTER TABLE "decks" ADD CONSTRAINT "decks_fk0" FOREIGN KEY ("userId") REFERENCES "accounts"("userId");
