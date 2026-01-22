ALTER TABLE "advance_option" DROP CONSTRAINT "advance_option_location_id_location_location_id_fk";
--> statement-breakpoint
ALTER TABLE "Approval_history" DROP CONSTRAINT "Approval_history_exp_id_expense_exp_id_fk";
--> statement-breakpoint
ALTER TABLE "Approval_history" DROP CONSTRAINT "Approval_history_emp_id_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "category" DROP CONSTRAINT "category_profile_id_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "expense" DROP CONSTRAINT "expense_profile_id_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "expense" DROP CONSTRAINT "expense_category_id_category_category_id_fk";
--> statement-breakpoint
ALTER TABLE "expense" DROP CONSTRAINT "expense_advance_option_advance_option_advance_opt_id_fk";
--> statement-breakpoint
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_profile_id_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "organization" DROP CONSTRAINT "organization_profile_id_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "organization" DROP CONSTRAINT "organization_address_location_location_id_fk";
--> statement-breakpoint
ALTER TABLE "organization" DROP CONSTRAINT "organization_default_currency_currency_currency_id_fk";
--> statement-breakpoint
ALTER TABLE "allow_category" DROP CONSTRAINT "allow_category_profile_id_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "employee_config" DROP CONSTRAINT "employee_config_profile_id_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "employee_config" DROP CONSTRAINT "employee_config_reporting_manager_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "employee_roles" DROP CONSTRAINT "employee_roles_profile_id_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "employee_roles" DROP CONSTRAINT "employee_roles_role_id_roles_role_id_fk";
--> statement-breakpoint
ALTER TABLE "user_detail" DROP CONSTRAINT "user_detail_profile_id_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "validator_config" DROP CONSTRAINT "validator_config_profile_id_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "advance_option" ADD CONSTRAINT "advance_option_location_id_location_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("location_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Approval_history" ADD CONSTRAINT "Approval_history_exp_id_expense_exp_id_fk" FOREIGN KEY ("exp_id") REFERENCES "public"."expense"("exp_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Approval_history" ADD CONSTRAINT "Approval_history_emp_id_profile_profile_id_fk" FOREIGN KEY ("emp_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_category_id_category_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_advance_option_advance_option_advance_opt_id_fk" FOREIGN KEY ("advance_option") REFERENCES "public"."advance_option"("advance_opt_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_address_location_location_id_fk" FOREIGN KEY ("address") REFERENCES "public"."location"("location_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_default_currency_currency_currency_id_fk" FOREIGN KEY ("default_currency") REFERENCES "public"."currency"("currency_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "allow_category" ADD CONSTRAINT "allow_category_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_config" ADD CONSTRAINT "employee_config_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_config" ADD CONSTRAINT "employee_config_reporting_manager_profile_profile_id_fk" FOREIGN KEY ("reporting_manager") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_roles" ADD CONSTRAINT "employee_roles_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_roles" ADD CONSTRAINT "employee_roles_role_id_roles_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("role_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_detail" ADD CONSTRAINT "user_detail_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "validator_config" ADD CONSTRAINT "validator_config_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;