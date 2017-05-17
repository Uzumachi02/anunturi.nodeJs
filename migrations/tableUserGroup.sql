CREATE TABLE "public"."user_group" (
	"id" serial4 NOT NULL,
	"name" varchar(50) COLLATE "default",
	"display_name" varchar(64) COLLATE "default",
	PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."user_group" OWNER TO "postgres";
