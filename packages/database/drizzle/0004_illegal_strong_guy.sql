CREATE TABLE IF NOT EXISTS "device" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"brand" varchar(256) NOT NULL,
	"image" varchar(2048),
	"product_link" varchar(2048)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "devices_to_reports" (
	"device_id" integer NOT NULL,
	"report_id" integer NOT NULL,
	CONSTRAINT "devices_to_reports_device_id_report_id_pk" PRIMARY KEY("device_id","report_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "devices_to_reports" ADD CONSTRAINT "devices_to_reports_device_id_device_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."device"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "devices_to_reports" ADD CONSTRAINT "devices_to_reports_report_id_report_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."report"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
