CREATE TABLE "security" (
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
ALTER TABLE "organization" DROP CONSTRAINT "organization_default_currency_currency_currency_id_fk";
--> statement-breakpoint
ALTER TABLE "currency" ALTER COLUMN "currency_code" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "currency" ALTER COLUMN "country_code" SET DATA TYPE varchar(30);--> statement-breakpoint
ALTER TABLE "currency" ADD COLUMN "auto_update" boolean;--> statement-breakpoint
ALTER TABLE "currency" ADD COLUMN "multiple_cur_support" boolean;--> statement-breakpoint
ALTER TABLE "currency" ADD COLUMN "exchange_rate_provider" text;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "cur_id" varchar(20);--> statement-breakpoint
ALTER TABLE "security" ADD CONSTRAINT "security_org_id_organization_organization_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organization"("organization_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_cur_id_currency_currency_id_fk" FOREIGN KEY ("cur_id") REFERENCES "public"."currency"("currency_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "currency" DROP COLUMN "country";--> statement-breakpoint
ALTER TABLE "currency" DROP COLUMN "previous_price";--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "default_currency";--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "mul_cur";--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "auto_update_rates";--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "ex_rate_pro";