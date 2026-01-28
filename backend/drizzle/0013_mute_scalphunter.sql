ALTER TABLE "expense_approve_history" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "expense" ALTER COLUMN "exp_status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('Submited', 'Validated', 'Approved', 'Draft', 'Escalated', 'Needs-info', 'Paid', 'Pending', 'Rejected', 'Processing', 'Withdrawn');--> statement-breakpoint
ALTER TABLE "expense_approve_history" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "expense" ALTER COLUMN "exp_status" SET DATA TYPE "public"."status" USING "exp_status"::"public"."status";