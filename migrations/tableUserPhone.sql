CREATE TABLE "public"."user_phone" (
	"id" serial4 NOT NULL,
	"user_id" int4 NOT NULL,
	"type" varchar(64) DEFAULT 'Mobil'::character varying COLLATE "default",
	"number" varchar(64) NOT NULL COLLATE "default",
	"add_dt" timestamp(6) NULL DEFAULT now(),
	PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."user_phone" OWNER TO "postgres";
