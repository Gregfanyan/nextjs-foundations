'use client';

import { useState } from 'react';

// small client island - the post page around it stays a Server Component
export function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setLikes(liked ? likes - 1 : likes + 1);
        setLiked(!liked);
      }}
      className="w-fit rounded border px-3 py-1 text-sm hover:bg-gray-50"
    >
      {liked ? '♥' : '♡'} {likes}
    </button>
  );
}
