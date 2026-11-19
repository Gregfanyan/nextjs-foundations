import { notFound } from "next/navigation";
import { dbGetAuthor, dbGetComments, dbGetPost } from "@/lib/posts-db";

// Timings from the server log (3 queries x ~400ms each):
//   one after another .......... ~1200ms
//   author + comments together .. ~800ms  <- what's below
// The comments query only needs the post id, so it can't start before the
// post lookup, but it doesn't have to wait for the author.
async function getPostData(slug: string) {
  const post = await dbGetPost(slug);
  if (!post) return null;

  const [author, comments] = await Promise.all([
    dbGetAuthor(post.authorId),
    dbGetComments(post.id),
  ]);

  return { post, author, comments };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const start = performance.now();
  const data = await getPostData(slug);
  console.log(
    `[post] Loaded ${slug} in ${Math.round(performance.now() - start)}ms`
  );

  if (!data) notFound();

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-8">
      <article>
        <h1 className="font-bold text-3xl capitalize">{data.post.title}</h1>
        <p className="text-gray-500 text-sm">By {data.author.name}</p>
        <p className="mt-4">{data.post.body}</p>
      </article>

      <section>
        <h2 className="mb-2 font-semibold text-xl">
          Comments ({data.comments.length})
        </h2>
        <ul className="space-y-2">
          {data.comments.map((comment) => (
            <li key={comment.id} className="rounded border p-3 text-sm">
              <strong>{comment.author}</strong>: {comment.text}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
