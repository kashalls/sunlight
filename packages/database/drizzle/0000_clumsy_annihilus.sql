DO $$ BEGIN
 CREATE TYPE "public"."interface" AS ENUM('ethernet', 'wireless', 'unknown');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('online', 'working', 'offline', 'missing');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "node" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"status" "status" DEFAULT 'missing',
	"mac" text[] DEFAULT '{}'::text[] NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"last_seen" timestamp DEFAULT now()
);
