CREATE TABLE "new_programme" (
	"policy_id" varchar(20) PRIMARY KEY NOT NULL,
	"profile_id" varchar(20),
	"group_name" varchar,
	"description" text,
	"category" varchar(20),
	"currency" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "policy_setting" (
	"policy_id" varchar(20),
	"monthly_limit" numeric,
	"advance_limit" numeric,
	"adv_policy_plugin" boolean DEFAULT false,
	"auto_budget" boolean DEFAULT true,
	"event_meet" boolean DEFAULT true,
	"allow_qr_voucher" boolean DEFAULT false,
	"show_balance" boolean DEFAULT false,
	"restrict_alcohol" boolean DEFAULT false,
	"mjs_restriction" boolean DEFAULT false,
	"hotel_restriction" numeric,
	"vendor_onboarding" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "transaction_setting" (
	"policy_id" varchar(20),
	"outstation_travel" varchar(20),
	"flight_transaction" boolean DEFAULT true,
	"bus_transaction" boolean DEFAULT true,
	"hotel_transaction" boolean DEFAULT true,
	"cab_transaction" boolean DEFAULT true,
	"recharge_transaction" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "voucher" (
	"voucher_id" varchar(20) PRIMARY KEY NOT NULL,
	"profile_id" varchar(20),
	"voucher_name" varchar(30),
	"category" varchar(20),
	"exp_size" numeric,
	"total_amount" numeric,
	"business_purpose" text,
	"exp_status" "status" NOT NULL,
	"priority" "priority",
	"compliance" "compliance",
	"next" "expense_next_level" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "voucher_expense" (
	"voucher_id" varchar(20),
	"exp_id" varchar(20) PRIMARY KEY NOT NULL,
	"amount" numeric NOT NULL,
	"date" timestamp,
	"vendor" varchar(25),
	"business_purpose" text,
	"category_id" varchar,
	"reciept" text,
	"priority" "priority",
	"compliance" "compliance",
	"remark" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "expense_approve_history" ADD COLUMN "voucher_id" varchar(20);--> statement-breakpoint
ALTER TABLE "new_programme" ADD CONSTRAINT "new_programme_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "new_programme" ADD CONSTRAINT "new_programme_category_category_category_id_fk" FOREIGN KEY ("category") REFERENCES "public"."category"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "new_programme" ADD CONSTRAINT "new_programme_currency_currency_currency_id_fk" FOREIGN KEY ("currency") REFERENCES "public"."currency"("currency_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policy_setting" ADD CONSTRAINT "policy_setting_policy_id_new_programme_policy_id_fk" FOREIGN KEY ("policy_id") REFERENCES "public"."new_programme"("policy_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_setting" ADD CONSTRAINT "transaction_setting_policy_id_new_programme_policy_id_fk" FOREIGN KEY ("policy_id") REFERENCES "public"."new_programme"("policy_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_category_category_category_id_fk" FOREIGN KEY ("category") REFERENCES "public"."category"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voucher_expense" ADD CONSTRAINT "voucher_expense_voucher_id_voucher_voucher_id_fk" FOREIGN KEY ("voucher_id") REFERENCES "public"."voucher"("voucher_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voucher_expense" ADD CONSTRAINT "voucher_expense_category_id_category_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_approve_history" ADD CONSTRAINT "expense_approve_history_voucher_id_voucher_voucher_id_fk" FOREIGN KEY ("voucher_id") REFERENCES "public"."voucher"("voucher_id") ON DELETE cascade ON UPDATE no action;