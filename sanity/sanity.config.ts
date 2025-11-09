import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { app } from '@/sanity/schema/app';
import { category } from '@/sanity/schema/category';
import { post } from '@/sanity/schema/post';

export default defineConfig({
  name: 'softwave',
  title: 'SoftWave Directory',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo1',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  schema: {
    types: [app, category, post],
  },
  plugins: [deskTool(), visionTool()],
});
