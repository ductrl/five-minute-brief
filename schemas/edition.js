import { z } from "zod";

const MAX_SUMMARY_WORDS = 50;

const countWords = (text) => {
  const trimmed = text.trim();
  return (trimmed === "" ? 0 : trimmed.split(/\s+/).length);
}

const SourceSchema = z.object({
  publisher: z.string().trim().min(1),
  url: z.url().startsWith('https://'),
})

const StorySchema = z.object({
  id: z.string().trim().min(1),
  headline: z.string().trim().min(1),
  summary: z
    .string()
    .trim()
    .min(1)
    .refine((summary) => countWords(summary) <= MAX_SUMMARY_WORDS, {
      message: `Summary must be ${MAX_SUMMARY_WORDS} words or fewer`
    }),
  sources: z.array(SourceSchema).min(1).max(3),
})

const EditionSchema = z
  .object({
    schemaVersion: z.literal(1),

    editionDate: z.iso.date(),

    coverageStart: z.iso.datetime(),
    coverageEnd: z.iso.datetime(),
    publishedAt: z.iso.datetime(),

    stories: z.array(StorySchema).min(3).max(7),
  })
  .refine(
    (edition) => {
      const ids = edition.stories.map(story => story.id);
      return (new Set(ids).size === edition.stories.length);
    }, 
    {
      message: 'Story IDs must be unique',
      path: ['stories']
    }
  )
  .refine(
    (edition) => new Date(edition.coverageStart) < new Date(edition.coverageEnd),
    {
      message: 'Coverage end must occur after coverage start',
      path: ['coverageEnd']
    }
  )

export { SourceSchema, StorySchema, EditionSchema };