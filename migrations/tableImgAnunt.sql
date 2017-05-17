CREATE TABLE "public"."img_anunt" (
	"id" serial4 NOT NULL,
	"anunt_id" int4 NOT NULL,
	"url" varchar(255) COLLATE "default",
	"add_dt" timestamp(6) NULL DEFAULT now(),
	PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."img_anunt" OWNER TO "postgres";
