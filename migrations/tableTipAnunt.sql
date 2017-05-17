CREATE TABLE "public"."tip_anunt" (
	"id" serial4 NOT NULL,
	"name" varchar(50) COLLATE "default",
	PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."tip_anunt" OWNER TO "postgres";
