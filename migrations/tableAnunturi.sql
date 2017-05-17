CREATE TABLE "public"."anunturi" (
	"id" serial4 NOT NULL,
	"user_id" int4 NOT NULL,
	"cat_id" int2 DEFAULT 1,
	"tip_id" int2 DEFAULT 1,
	"titlu" varchar(128) NOT NULL COLLATE "default",
	"describe" text COLLATE "default",
	"price" numeric,
	"view" int4 DEFAULT 0,
	"status" int2 DEFAULT 1,
	"add_dt" timestamp(6) NULL DEFAULT now(),
	PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."anunturi" OWNER TO "postgres";
