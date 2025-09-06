CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(160) NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"cover_url" text NOT NULL,
	"cover_alt" varchar(180) DEFAULT '',
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
