CREATE TABLE "payment_info" (
	"exp_id" varchar(20),
	"payment_method" "pay_met",
	"profile_id" varchar(20),
	"amount" numeric,
	"payment_date" timestamp,
	"ref_num" varchar(50),
	"receipt" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "payment_info_ref_num_unique" UNIQUE("ref_num")
);
--> statement-breakpoint
ALTER TABLE "emailtemplate" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "payment_info" ADD CONSTRAINT "payment_info_exp_id_expense_exp_id_fk" FOREIGN KEY ("exp_id") REFERENCES "public"."expense"("exp_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_info" ADD CONSTRAINT "payment_info_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;