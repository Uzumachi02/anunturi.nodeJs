CREATE TABLE "public"."users" (
	"id" serial4 NOT NULL,
	"group_id" int2 DEFAULT 1,
	"login" varchar(64) NOT NULL COLLATE "default",
	"password" varchar(32) NOT NULL COLLATE "default",
	"email" varchar(128) NOT NULL COLLATE "default",
	"f_name" varchar(64) COLLATE "default",
	"l_name" varchar(64) COLLATE "default",
	"p_name" varchar(64) COLLATE "default",
	"online_dt" timestamp(6) NULL,
	"reg_dt" timestamp(6) NULL DEFAULT now(),
	PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."users" OWNER TO "postgres";
