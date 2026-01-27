CREATE TABLE "emailTemplate" (
	"id" varchar PRIMARY KEY NOT NULL,
	"createdBy" varchar(100),
	"actionType" varchar(200),
	"subject" varchar(700),
	"body" varchar(3000),
	"isActive" boolean,
	"created_at" timestamp DEFAULT now()
);
