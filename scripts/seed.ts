import { config } from 'dotenv';
config({ path: '.env.local' });

import { db } from "@/server/db/client";
import { posts } from "@/server/db/schema";
import { postsData } from "@/modules/blog/data/postsData";

async function seed() {
  console.log("Starting seed...");
  
  try {
    // Clear existing data
    await db.delete(posts);
    console.log("Cleared existing posts");

    // Insert new posts
    const insertedPosts = await db
      .insert(posts)
      .values(
        postsData.map((post) => {
          // Ensure all required fields are present
          if (!post.content) {
            throw new Error(`Missing content for post: ${post.title}`);
          }
          
          return {
            slug: post.slug,
            title: post.title,
            description: post.description,
            content: post.content, // Now we know this is defined
            coverUrl: post.coverUrl,
            coverAlt: post.coverAlt || '', // Provide a default empty string if null
            tags: post.tags,
            createdAt: new Date(post.createdAt),
          };
        })
      )
      .returning();

    console.log(`Seeded ${insertedPosts.length} posts`);
    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Error during seed:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
