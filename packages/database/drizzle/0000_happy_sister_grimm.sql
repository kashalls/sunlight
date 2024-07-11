DO $$ BEGIN
 CREATE TYPE "public"."discovery" AS ENUM('websocket', 'manual', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('iperf3', 'iperf2', 'stream', 'webrtc');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "device" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"brand" varchar(256) NOT NULL,
	"image" varchar(2048),
	"product_link" varchar(2048)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "network" (
	"id" serial PRIMARY KEY NOT NULL,
	"ssid" text NOT NULL,
	"password" text DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "node" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"status" "status" DEFAULT 'offline',
	"mac" text[] NOT NULL,
	"discovery" "discovery" DEFAULT 'other',
	"network_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"last_seen" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "node_to_tests" (
	"node_id" integer NOT NULL,
	"test_id" integer NOT NULL,
	CONSTRAINT "node_to_tests_node_id_test_id_pk" PRIMARY KEY("node_id","test_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "report" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_id" integer NOT NULL,
	"status" "status" NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "test" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_id" integer NOT NULL,
	"type" "type" NOT NULL,
	"host" text NOT NULL,
	"port" integer NOT NULL,
	"options" json NOT NULL,
	"node_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"finished_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "node" ADD CONSTRAINT "node_network_id_network_id_fk" FOREIGN KEY ("network_id") REFERENCES "public"."network"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "node_to_tests" ADD CONSTRAINT "node_to_tests_node_id_node_id_fk" FOREIGN KEY ("node_id") REFERENCES "public"."node"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "node_to_tests" ADD CONSTRAINT "node_to_tests_test_id_test_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."test"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_device_id_device_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."device"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "test" ADD CONSTRAINT "test_device_id_device_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."device"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "test" ADD CONSTRAINT "test_node_id_node_id_fk" FOREIGN KEY ("node_id") REFERENCES "public"."node"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
