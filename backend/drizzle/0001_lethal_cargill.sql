ALTER TABLE "organization" RENAME COLUMN "owner_id" TO "profile_id";--> statement-breakpoint
ALTER TABLE "organization" DROP CONSTRAINT "organization_owner_id_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE no action ON UPDATE no action;