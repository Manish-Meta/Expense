CREATE TABLE "expense_form" (
	"form_id" varchar(30) PRIMARY KEY NOT NULL,
	"form_name" varchar(50),
	"module" varchar(30)
);
--> statement-breakpoint
CREATE TABLE "policy_violations" (
	"violation_id" bigserial PRIMARY KEY NOT NULL,
	"exp_id" varchar(50),
	"rule_code" varchar(50),
	"message" text,
	"severity" varchar(20),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "category_id" SET DATA TYPE varchar(20);--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" ALTER COLUMN "field_name" DROP NOT NULL;--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" ALTER COLUMN "field_key" DROP NOT NULL;--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" ALTER COLUMN "field_type" DROP NOT NULL;--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" ALTER COLUMN "required" DROP DEFAULT;--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" ALTER COLUMN "editable" DROP DEFAULT;--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" ALTER COLUMN "order_index" DROP DEFAULT;--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" ADD COLUMN "form_id" varchar(30);--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" ADD COLUMN "visible_to" jsonb DEFAULT '["employee"]'::jsonb;--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" ADD COLUMN "editable_by" jsonb DEFAULT '["employee"]'::jsonb;--> statement-breakpoint
-- ALTER TABLE "policy_violations" ADD CONSTRAINT "policy_violations_exp_id_expense_exp_id_fk" FOREIGN KEY ("exp_id") REFERENCES "public"."expense"("exp_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" ADD CONSTRAINT "expense_form_fields_form_id_expense_form_form_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."expense_form"("form_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" DROP COLUMN "encrypted";--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" DROP COLUMN "min_length";--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" DROP COLUMN "max_length";--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" DROP COLUMN "options";--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" DROP COLUMN "created_at";--> statement-breakpoint
-- ALTER TABLE "expense_form_fields" DROP COLUMN "updated_at";