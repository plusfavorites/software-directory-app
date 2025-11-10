import { defineArrayMember, defineField, defineType } from "sanity";
import { DownloadIcon } from "@sanity/icons";

export const app = defineType({
  name: "app",
  title: "Apps",
  type: "document",
  icon: DownloadIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "version",
      type: "string",
    }),
    defineField({
      name: "os",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "developer",
      type: "string",
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "screenshots",
      type: "array",
      of: [
        defineArrayMember({
          name: "screenshot",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "downloadLinks",
      type: "array",
      validation: (rule) => rule.min(1),
      of: [
        defineArrayMember({
          name: "downloadLink",
          type: "object",
          fields: [
            defineField({
              name: "name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "releaseDate",
      type: "datetime",
    }),
    defineField({
      name: "downloads",
      type: "number",
      description: "Used for the Top downloads module.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "version",
      media: "heroImage",
    },
  },
});
