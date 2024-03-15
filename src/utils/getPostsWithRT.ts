import type { MarkdownInstance } from "astro";
import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

export const getReadingTime = async () => {
  const globPosts = import.meta.glob("../content/blog/*.md") as Promise<
    CollectionEntry<"blog">["data"][]
  >;

  const mapFrontmatter = new Map();
  const globPostsValues = Object.values(globPosts);
  await Promise.all(
    globPostsValues.map(async globPost => {
      const { frontmatter } = await globPost();

      console.log(frontmatter.readingTime);

      mapFrontmatter.set(
        slugifyStr(frontmatter.title),
        frontmatter.readingTime
      );
    })
  );

  return mapFrontmatter;
};

const getPostsWithRT = async (posts: CollectionEntry<"blog">[]) => {
  const mapFrontmatter = await getReadingTime();
  return posts.map(post => {
    post.data.readingTime = mapFrontmatter.get(slugifyStr(post.data.title));
    console.log(post.data.readingTime);
    return post;
  });
};

export default getPostsWithRT;
