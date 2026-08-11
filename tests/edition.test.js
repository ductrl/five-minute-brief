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
})