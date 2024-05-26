DROP TABLE "devices_to_reports";--> statement-breakpoint
ALTER TABLE "report" DROP CONSTRAINT "report_node_id_node_id_fk";
--> statement-breakpoint
ALTER TABLE "report" ADD COLUMN "device_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_device_id_device_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."device"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "report" DROP COLUMN IF EXISTS "node_id";