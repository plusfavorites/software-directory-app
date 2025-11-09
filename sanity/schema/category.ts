import { defineField, defineType } from "sanity";
import { ListIcon } from "@sanity/icons";

export const category = defineType({
  name: "category",
  title: "Categories",
  type: "document",
  icon: ListIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      type: "string",
      description: "Optional Lucide icon name used on the frontend.",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
    },
  },
});
