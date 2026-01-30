CREATE TYPE "public"."expense_next_level" AS ENUM('User', 'Validator', 'Admin', 'Vendor', 'Finish');--> statement-breakpoint
CREATE TYPE "public"."user_role_enum" AS ENUM('User', 'Validator', 'Admin');--> statement-breakpoint
CREATE TYPE "public"."tax_cal_method" AS ENUM('Tax Inclusive', 'Tax Exclusive');--> statement-breakpoint
CREATE TYPE "public"."pay_met" AS ENUM('credit card', 'corporate card', 'bank transfer', 'cash');--> statement-breakpoint
CREATE TYPE "public"."val_scopr" AS ENUM('ALL_DEPT', 'OWN_DEPT', 'ASSIGNED_TEAMS');--> statement-breakpoint
CREATE TYPE "public"."priority_level" AS ENUM('standard validator', 'senior validator', 'lead validator');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('Submited', 'Validated', 'Approved', 'Draft', 'Escalated', 'Needs-info', 'Paid', 'Pending', 'Rejected', 'Processing', 'Withdrawn');--> statement-breakpoint
CREATE TYPE "public"."compliance" AS ENUM('Compliant', 'Warning', 'Violation');--> statement-breakpoint
CREATE TYPE "public"."priority" AS ENUM('Low', 'Medium', 'High');--> statement-breakpoint
CREATE TABLE "currency" (
	"currency_id" varchar(20) PRIMARY KEY NOT NULL,
	"currency_code" varchar(20),
	"currency_name" varchar(30),
	"country_code" varchar(30),
	"current_price" integer,
	"auto_update" boolean,
	"multiple_cur_support" boolean,
	"exchange_rate_provider" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "emailtemplate" (
	"id" varchar PRIMARY KEY NOT NULL,
	"createdBy" varchar(100),
	"actionType" varchar(200),
	"subject" varchar(700),
	"body" varchar(3000),
	"isActive" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "advance_option" (
	"advance_opt_id" varchar(20) PRIMARY KEY NOT NULL,
	"project_name" varchar(30),
	"location_id" varchar(20),
	"payment_method" "pay_met",
	"attendees" varchar(20),
	"billable_client" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "category" (
	"profile_id" varchar(20),
	"category_id" varchar PRIMARY KEY NOT NULL,
	"description" text,
	"cat_name" varchar(50) NOT NULL,
	"limit" integer,
	"rec_req" boolean,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "category_cat_name_unique" UNIQUE("cat_name")
);
--> statement-breakpoint
CREATE TABLE "expense_approve_history" (
	"exp_id" varchar(20),
	"profile_id" varchar(30),
	"status" "status",
	"remark" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "expense_form_fields" (
	"field_id" varchar(30) PRIMARY KEY NOT NULL,
	"category_id" varchar(20),
	"field_name" varchar(50) NOT NULL,
	"field_key" varchar(50) NOT NULL,
	"field_type" varchar(20) NOT NULL,
	"required" boolean DEFAULT false,
	"editable" boolean DEFAULT true,
	"encrypted" boolean DEFAULT false,
	"min_length" integer,
	"max_length" integer,
	"options" json,
	"order_index" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "expense" (
	"exp_id" varchar(20) PRIMARY KEY NOT NULL,
	"profile_id" varchar(20),
	"amount" numeric NOT NULL,
	"date" timestamp,
	"vendor" varchar(25),
	"business_purpose" text,
	"category_id" varchar,
	"advance_option" varchar,
	"reciept" text,
	"exp_status" "status" NOT NULL,
	"priority" "priority",
	"compliance" "compliance",
	"next" "expense_next_level" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "feedback" (
	"feedback_id" varchar(10) PRIMARY KEY NOT NULL,
	"profile_id" varchar(20),
	"rating" integer NOT NULL,
	"cmd" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "info" (
	"from" varchar(20),
	"to" varchar(20),
	"information" text,
	"attach" text,
	"is_view" boolean DEFAULT false,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "location" (
	"location_id" varchar(20) PRIMARY KEY NOT NULL,
	"area" varchar,
	"state_name" varchar(20),
	"country_name" varchar(20),
	"country_code" numeric,
	"lat" varchar(20),
	"lon" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "organization" (
	"organization_id" varchar PRIMARY KEY NOT NULL,
	"profile_id" varchar(20),
	"org_name" varchar(30),
	"industry_type" text,
	"emp_count" numeric NOT NULL,
	"address" varchar(20),
	"ph_num" numeric NOT NULL,
	"web_url" varchar(100) NOT NULL,
	"cur_id" varchar(20),
	"start_month" varchar(20),
	"year" numeric,
	"tax_jurisdiction" varchar(30),
	"tax_cal_method" "tax_cal_method" DEFAULT 'Tax Inclusive',
	"org_logo" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "organization_org_name_unique" UNIQUE("org_name")
);
--> statement-breakpoint
CREATE TABLE "payment_info" (
	"exp_id" varchar(20),
	"payment_method" "pay_met",
	"profile_id" varchar(20),
	"amount" numeric,
	"payment_date" timestamp,
	"ref_num" varchar(50),
	"receipt" text,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "payment_info_ref_num_unique" UNIQUE("ref_num")
);
--> statement-breakpoint
CREATE TABLE "security" (
	"founder" varchar(20),
	"org_id" varchar(20),
	"min_length" numeric,
	"uppercase" boolean,
	"num_length" boolean,
	"req_symbol" boolean,
	"paasword_exp" numeric,
	"req_mfa" boolean,
	"sms_auth" boolean,
	"email_auth" boolean,
	"authenticator_app" boolean,
	"hordware_token" boolean,
	"sso" boolean,
	"identity_provider" text,
	"session_timeout" numeric,
	"max_session" numeric,
	"ip_restriction" boolean,
	"field_level_enc" boolean,
	"audit_log" boolean,
	"log_retention" numeric
);
--> statement-breakpoint
CREATE TABLE "allow_category" (
	"profile_id" varchar(20),
	"category" varchar(30),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "department" (
	"deptartment_id" varchar(30) PRIMARY KEY NOT NULL,
	"name" varchar(15) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "department_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "employee_config" (
	"profile_id" varchar(20),
	"reporting_manager" varchar(20),
	"monthly_limit" numeric,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "employee_roles" (
	"profile_id" varchar(50) NOT NULL,
	"role_id" varchar(20) NOT NULL,
	"assigned_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"profile_id" varchar(20) PRIMARY KEY NOT NULL,
	"username" varchar(50),
	"email" text NOT NULL,
	"f_name" varchar(20),
	"l_name" varchar(20),
	"full_name" varchar(50) NOT NULL,
	"designation" text,
	"profile_status" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"dept_id" text NOT NULL,
	CONSTRAINT "profile_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"role_id" varchar(20) PRIMARY KEY NOT NULL,
	"role_name" varchar(50) NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true,
	"limit" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "roles_role_name_unique" UNIQUE("role_name")
);
--> statement-breakpoint
CREATE TABLE "user_detail" (
	"user_id" varchar(20),
	"profile_id" varchar(50) NOT NULL,
	"password_hash" text NOT NULL,
	"is_locked" boolean DEFAULT false,
	"locking_time" numeric,
	"login_attempt" numeric DEFAULT 0,
	"last_password_change" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_detail_profile_id_unique" UNIQUE("profile_id")
);
--> statement-breakpoint
CREATE TABLE "validator_config" (
	"profile_id" varchar(20),
	"val_scope" "val_scopr" NOT NULL,
	"approval_limit" numeric(12, 2),
	"priority_level" "priority_level" NOT NULL,
	"notify" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "applicability_rule" (
	"applicability_id" varchar(20) PRIMARY KEY NOT NULL,
	"deptartment_id" varchar(30),
	"category_id" varchar,
	"min_amount" numeric,
	"max_amount" numeric,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "approval_stage" (
	"workflow_id" varchar(20),
	"stage_id" varchar(20),
	"approver_type" varchar(30),
	"stage_name" varchar(20),
	"process_time" numeric,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "approvel_history" (
	"profile_id" varchar,
	"work_flow_id" varchar PRIMARY KEY NOT NULL,
	"workflow_name" varchar(20) NOT NULL,
	"workflow_type" varchar,
	"description" text,
	"applicability_rule" varchar,
	"process_time" numeric,
	"warning" numeric,
	"email_notify" boolean,
	"slack_alert" boolean,
	"sms_remainder" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "advance_option" ADD CONSTRAINT "advance_option_location_id_location_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("location_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_approve_history" ADD CONSTRAINT "expense_approve_history_exp_id_expense_exp_id_fk" FOREIGN KEY ("exp_id") REFERENCES "public"."expense"("exp_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_approve_history" ADD CONSTRAINT "expense_approve_history_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_form_fields" ADD CONSTRAINT "expense_form_fields_category_id_category_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_category_id_category_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_advance_option_advance_option_advance_opt_id_fk" FOREIGN KEY ("advance_option") REFERENCES "public"."advance_option"("advance_opt_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "info" ADD CONSTRAINT "info_from_profile_profile_id_fk" FOREIGN KEY ("from") REFERENCES "public"."profile"("profile_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "info" ADD CONSTRAINT "info_to_profile_profile_id_fk" FOREIGN KEY ("to") REFERENCES "public"."profile"("profile_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_address_location_location_id_fk" FOREIGN KEY ("address") REFERENCES "public"."location"("location_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_cur_id_currency_currency_id_fk" FOREIGN KEY ("cur_id") REFERENCES "public"."currency"("currency_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_info" ADD CONSTRAINT "payment_info_exp_id_expense_exp_id_fk" FOREIGN KEY ("exp_id") REFERENCES "public"."expense"("exp_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_info" ADD CONSTRAINT "payment_info_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "security" ADD CONSTRAINT "security_org_id_organization_organization_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organization"("organization_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "allow_category" ADD CONSTRAINT "allow_category_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_config" ADD CONSTRAINT "employee_config_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_config" ADD CONSTRAINT "employee_config_reporting_manager_profile_profile_id_fk" FOREIGN KEY ("reporting_manager") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_roles" ADD CONSTRAINT "employee_roles_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_roles" ADD CONSTRAINT "employee_roles_role_id_roles_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("role_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_detail" ADD CONSTRAINT "user_detail_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "validator_config" ADD CONSTRAINT "validator_config_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applicability_rule" ADD CONSTRAINT "applicability_rule_deptartment_id_department_deptartment_id_fk" FOREIGN KEY ("deptartment_id") REFERENCES "public"."department"("deptartment_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applicability_rule" ADD CONSTRAINT "applicability_rule_category_id_category_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approval_stage" ADD CONSTRAINT "approval_stage_workflow_id_approvel_history_work_flow_id_fk" FOREIGN KEY ("workflow_id") REFERENCES "public"."approvel_history"("work_flow_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approvel_history" ADD CONSTRAINT "approvel_history_profile_id_profile_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("profile_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approvel_history" ADD CONSTRAINT "approvel_history_applicability_rule_applicability_rule_applicability_id_fk" FOREIGN KEY ("applicability_rule") REFERENCES "public"."applicability_rule"("applicability_id") ON DELETE no action ON UPDATE no action;