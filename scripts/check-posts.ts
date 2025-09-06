import { db } from "@/server/db/client";
import { posts } from "@/server/db/schema";

async function checkPosts() {
  console.log("Fetching all posts from the database...");
  const allPosts = await db.select().from(posts);
  
  console.log(`Found ${allPosts.length} posts:`);
  allPosts.forEach((post, index) => {
    console.log(`\n--- Post ${index + 1} ---`);
    console.log(`Title: ${post.title}`);
    console.log(`Slug: ${post.slug}`);
    console.log(`Content length: ${post.content?.length || 0} characters`);
    console.log(`First 100 chars: ${post.content?.substring(0, 100)}...`);
  });
}

checkPosts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error checking posts:", error);
    process.exit(1);
  });
