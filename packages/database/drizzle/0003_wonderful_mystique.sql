DO $$ BEGIN
 CREATE TYPE "public"."discovery" AS ENUM('websocket', 'manual', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "report" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "node" ADD COLUMN "discovery" "discovery" DEFAULT 'other';