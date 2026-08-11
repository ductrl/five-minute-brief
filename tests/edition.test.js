import { describe, expect, test } from "vitest";
import { EditionSchema } from "../schemas/edition";
import { createValidEdition } from "./fixtures/edition";

const expectInvalid = (edition, { path, code, message }) => {
  const result = EditionSchema.safeParse(edition);

  expect(result.success).toBe(false);

  if (path !== undefined) {
    expect(result.error.issues[0].path).toEqual(path);
  }

  if (code !== undefined) {
    expect(result.error.issues[0].code).toBe(code);
  }

  if (message !== undefined) {
    expect(result.error.issues[0].message).toBe(message);
  }
}

describe('EditionSchema', () => {
  test('accepts a valid edition', () => {
    const validEdition = createValidEdition();
    expect(EditionSchema.safeParse(validEdition).success).toBe(true);
  })

  test('rejects editions with fewer than 3 stories', () => {
    const edition = createValidEdition();
    edition.stories = edition.stories.slice(0, 2);

    expectInvalid(edition, {
      path: ['stories'],
      code: 'too_small'
    });
  })

  test('reject duplicate story IDs', () => {
    const edition = createValidEdition();
    edition.stories[1].id = edition.stories[0].id;

    expectInvalid(edition, {
      path: ['stories'],
      message: 'Story IDs must be unique'
    });
  })

  test('reject empty headlines', () => {
    const edition = createValidEdition();
    edition.stories[0].headline = '';

    expectInvalid(edition, {
      path: ["stories", 0, "headline"],
      code: 'too_small'
    });
  })

  test('reject summaries longer than 50 words', () => {
    const edition = createValidEdition();
    edition.stories[0].summary = Array(51).fill('word').join(' ');

    expectInvalid(edition, {
      path: ["stories", 0, "summary"],
      message: 'Summary must be 50 words or fewer'
    });
  })

  test('rejects non-HTTPS source URLs', () => {
    const edition = createValidEdition();
    edition.stories[0].sources[0].url = 'http://example.com';

    expectInvalid(edition, {
      path: ["stories", 0, "sources", 0, "url"],
      code: "invalid_format"
    });
  })

  test('rejects edition with more than 7 stories', () => {
    const edition = createValidEdition();

    while (edition.stories.length < 8) {
      edition.stories.push({
        ...edition.stories[0],
        id: `story-${edition.stories.length + 1}`
      });
    }

    expectInvalid(edition, {
      path: ['stories'],
      code: 'too_big',
    });
  })

  test('rejects stories with no sources', () => {
    const edition = createValidEdition();
    edition.stories[0].sources = [];

    expectInvalid(edition, {
      path: ['stories', 0, 'sources'],
      code: 'too_small',
    });
  })

  test('reject stories with more than 3 sources', () => {
    const edition = createValidEdition();
    edition.stories[0].sources = [
      { publisher: 'Reuters', url: 'https://reuters.com' },
      { publisher: 'BBC', url: 'https://bbc.com' },
      { publisher: 'AP', url: 'https://apnews.com' },
      { publisher: 'CNN', url: 'https://cnn.com' },
    ];

    expectInvalid(edition, {
      path: ['stories', 0, 'sources'],
      code: 'too_big',
    });
  })

  test('rejects empty publisher names', () => {
    const edition = createValidEdition();
    edition.stories[0].sources[0].publisher = '';

    expectInvalid(edition, {
      path: ['stories', 0, 'sources', 0, 'publisher'],
      code: 'too_small',
    });
  })

  test('rejects malformed source URLs', () => {
    const edition = createValidEdition();
    edition.stories[0].sources[0].url = 'not-a-url';

    expectInvalid(edition, {
      path: ['stories', 0, 'sources', 0, 'url'],
      code: 'invalid_format',
    });
  })

  test('rejects invalid edition dates', () => {
    const edition = createValidEdition();
    edition.editionDate = 'August 11, 2026';

    expectInvalid(edition, {
      path: ['editionDate'],
      code: 'invalid_format',
    });
  })

  test('rejects invalid coverage timestamps', () => {
    const edition = createValidEdition();
    edition.coverageStart = 'not-a-datetime';

    expectInvalid(edition, {
      path: ['coverageStart'],
      code: 'invalid_format',
    });
  })

  test('rejects coverage end before coverage start', () => {
    const edition = createValidEdition();

    edition.coverageStart = '2026-08-12T04:00:00Z';
    edition.coverageEnd = '2026-08-11T04:00:00Z';

    expectInvalid(edition, {
      path: ['coverageEnd'],
      message: 'Coverage end must occur after coverage start',
    });
  })

  test('rejects unsupported schema versions', () => {
    const edition = createValidEdition();
    edition.schemaVersion = 2;

    expectInvalid(edition, {
      path: ['schemaVersion'],
      code: 'invalid_value',
    });
  })
})