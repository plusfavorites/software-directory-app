import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo1';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-06-01';

export const useCdn = process.env.NODE_ENV === 'production';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});
