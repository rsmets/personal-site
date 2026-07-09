import { defineCollection, z } from "astro:content";

export const collections = {
  work: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      startDate: z.coerce.date(),
      // Optional end date for projects - if not provided, project is considered ongoing
      endDate: z.coerce.date().optional(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
    }),
  }),
  blog: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      // img and img_alt are optional; YAML parses blank values as null, so nullish() handles both null and undefined
      img: z.string().nullish(),
      img_alt: z.string().nullish(),
    }),
  }),
};
