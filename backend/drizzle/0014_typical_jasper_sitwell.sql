CREATE TABLE "info" (
	"from" varchar(20),
	"to" varchar(20),
	"information" text,
	"attach" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "info" ADD CONSTRAINT "info_from_profile_profile_id_fk" FOREIGN KEY ("from") REFERENCES "public"."profile"("profile_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "info" ADD CONSTRAINT "info_to_profile_profile_id_fk" FOREIGN KEY ("to") REFERENCES "public"."profile"("profile_id") ON DELETE no action ON UPDATE no action;