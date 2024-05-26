CREATE TABLE IF NOT EXISTS "report" (
	"id" integer PRIMARY KEY NOT NULL,
	"status" "report_status" DEFAULT 'starting' NOT NULL,
	"title" text NOT NULL,
	"node_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "node" ALTER COLUMN "status" SET DEFAULT 'offline';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_node_id_node_id_fk" FOREIGN KEY ("node_id") REFERENCES "public"."node"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
