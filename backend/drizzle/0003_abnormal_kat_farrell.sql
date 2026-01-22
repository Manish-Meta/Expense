ALTER TABLE "Approval_history" RENAME TO "expense_approve_history";--> statement-breakpoint
ALTER TABLE "expense_approve_history" DROP CONSTRAINT "Approval_history_exp_id_expense_exp_id_fk";
--> statement-breakpoint
ALTER TABLE "expense_approve_history" DROP CONSTRAINT "Approval_history_emp_id_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "expense_approve_history" ADD COLUMN "profile_id" varchar(30);--> statement-breakpoint
ALTER TABLE "expense_approve_history" ADD CONSTRAINT "expense_approve_history_exp_id_expense_exp_id_fk" FOREIGN KEY ("exp_id") REFERENCES "public"."expense"("exp_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_approve_history" ADD CONSTRAINT "expense_approve_history_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_approve_history" DROP COLUMN "emp_id";