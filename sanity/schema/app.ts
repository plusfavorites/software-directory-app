import { defineField, defineType } from 'sanity';

export const app = defineType({
  name: 'app',
  title: 'App',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'version',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'os',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'developer',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'screenshots',
      type: 'array',
      of: [
        {
          name: 'screenshot',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'downloadLinks',
      type: 'array',
      of: [
        {
          name: 'downloadLink',
          title: 'Download link',
          type: 'object',
          fields: [
            { name: 'name', type: 'string', validation: (rule) => rule.required() },
            { name: 'url', type: 'url', validation: (rule) => rule.required() },
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'releaseDate',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'topDownloads',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'version',
      media: 'screenshots.0',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title,
        subtitle: subtitle ? `Version ${subtitle}` : undefined,
      };
    },
  },
});
