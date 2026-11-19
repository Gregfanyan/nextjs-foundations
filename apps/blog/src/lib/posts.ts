import { fetchPostBySlug } from '@repo/api/blog';
import { cache } from 'react';

// generateMetadata and the page both need the post - cache() makes sure they
// get the same one within a single request (the mock API invents a new post
// every call for unknown slugs)
export const getPost = cache(fetchPostBySlug);
