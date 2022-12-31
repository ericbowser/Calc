CREATE TABLE "User"(
	userid Serial Primary key,
	username text NOT NULL,
	password text NOT NULL,
	active boolean NOT NULL
);