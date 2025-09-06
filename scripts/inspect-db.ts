import { db } from "@/server/db/client";
import { posts } from "@/server/db/schema";

async function inspectDatabase() {
  console.log("Inspecting database...");
  
  try {
    // Get all posts
    const allPosts = await db.select().from(posts);
    console.log(`\nFound ${allPosts.length} posts in the database.`);
    
    allPosts.forEach((post, index) => {
      console.log(`\n--- Post ${index + 1} ---`);
      console.log(`Title: ${post.title}`);
      console.log(`Slug: ${post.slug}`);
      console.log(`Content exists: ${!!post.content}`);
      console.log(`Content length: ${post.content?.length || 0} characters`);
      console.log(`First 100 chars: ${post.content?.substring(0, 100) || 'N/A'}`);
      console.log(`Created: ${post.createdAt}`);
    });
    
    // Check the schema
    console.log("\nDatabase schema:");
    console.log(JSON.stringify(posts, null, 2));
    
  } catch (error) {
    console.error("Error inspecting database:", error);
  } finally {
    process.exit(0);
  }
}

inspectDatabase();
