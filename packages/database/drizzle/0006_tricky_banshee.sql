CREATE TABLE IF NOT EXISTS "network" (
	"id" integer PRIMARY KEY NOT NULL,
	"ssid" text NOT NULL,
	"password" text
);
--> statement-breakpoint
ALTER TABLE "node" ADD COLUMN "network_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "node" ADD CONSTRAINT "node_network_id_network_id_fk" FOREIGN KEY ("network_id") REFERENCES "public"."network"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
