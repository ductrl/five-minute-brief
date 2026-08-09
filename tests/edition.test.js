import { describe, expect, test } from "vitest";
import { EditionSchema } from "../schemas/edition";

const validEdition = {
  schemaVersion: 1,
  editionDate: '2026-08-08',
  coverageStart: '2026-08-08T04:00:00Z',
  coverageEnd: '2026-08-09T04:00:00Z',
  publishedAt: '2026-08-09T12:00:00Z',
  stories: [
    {
      id: 'story-1',
      headline: 'Story one',
      summary: 'A valid summary.',
      sources: [
        {
          publisher: 'Reuters',
          url: 'https://www.reuters.com',
        },
      ],
    },
    {
      id: 'story-2',
      headline: 'Story two',
      summary: 'Another valid summary.',
      sources: [
        {
          publisher: 'BBC',
          url: 'https://www.bbc.com',
        },
      ],
    },
    {
      id: 'story-3',
      headline: 'Story three',
      summary: 'A third valid summary.',
      sources: [
        {
          publisher: 'Associated Press',
          url: 'https://apnews.com',
        },
      ],
    },
  ],
}

describe('EditionSchema', () => {
  test('accepts a valid edition', () => {
    const result = EditionSchema.safeParse(validEdition);
    expect(result.success).toBe(true);
  })
})