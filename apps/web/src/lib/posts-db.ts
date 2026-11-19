import "server-only";

// Fake DB layer. Every query takes ~400ms so the waterfall is easy to see.
const QUERY_MS = 400;
const delay = () => new Promise((resolve) => setTimeout(resolve, QUERY_MS));

export type Post = {
  id: string;
  slug: string;
  title: string;
  body: string;
  authorId: string;
};
export type Author = { id: string; name: string };
export type Comment = {
  id: string;
  postId: string;
  author: string;
  text: string;
};

const KNOWN_SLUGS = new Set(["hello-world", "nextjs-tips", "my-first-post"]);

export async function dbGetPost(slug: string): Promise<Post | null> {
  await delay();
  if (!KNOWN_SLUGS.has(slug)) return null;
  return {
    id: `post-${slug}`,
    slug,
    title: slug.replace(/-/g, " "),
    body: "A short post, loaded from a very slow database.",
    authorId: "author-1",
  };
}

export async function dbGetAuthor(id: string): Promise<Author> {
  await delay();
  return { id, name: "Jane Developer" };
}

export async function dbGetComments(postId: string): Promise<Comment[]> {
  await delay();
  return Array.from({ length: 3 }, (_, i) => ({
    id: `${postId}-c${i}`,
    postId,
    author: `Reader ${i + 1}`,
    text: `Comment number ${i + 1}`,
  }));
}
