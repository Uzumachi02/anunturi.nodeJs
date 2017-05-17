CREATE TABLE "public"."cat_anunt" (
	"id" serial4 NOT NULL,
	"name" varchar(64) COLLATE "default",
	PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."cat_anunt" OWNER TO "postgres";
