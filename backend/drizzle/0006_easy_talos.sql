CREATE TYPE "public"."expense_next_level" AS ENUM('User', 'Validator', 'Admin', 'Vendor', 'Finish');--> statement-breakpoint
ALTER TYPE "public"."status" ADD VALUE 'Validator' BEFORE 'Approved';--> statement-breakpoint
ALTER TABLE "expense" ALTER COLUMN "next" SET DATA TYPE "public"."expense_next_level" USING "next"::text::"public"."expense_next_level";