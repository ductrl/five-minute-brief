const createValidEdition = () => ({
  schemaVersion: 1,
  editionDate: '2026-08-08',
  coverageStart: '2026-08-08T04:00:00Z',
  coverageEnd: '2026-08-09T04:00:00Z',
  publishedAt: '2026-08-09T12:00:00Z',

  stories: [
    {
      id: 'story-1',
      headline: 'First story',
      summary: 'This is a valid summary for the first story.',
      sources: [
        {
          publisher: 'Reuters',
          url: 'https://www.reuters.com',
        },
      ],
    },
    {
      id: 'story-2',
      headline: 'Second story',
      summary: 'This is a valid summary for the second story.',
      sources: [
        {
          publisher: 'BBC',
          url: 'https://www.bbc.com',
        },
      ],
    },
    {
      id: 'story-3',
      headline: 'Third story',
      summary: 'This is a valid summary for the third story.',
      sources: [
        {
          publisher: 'Associated Press',
          url: 'https://apnews.com',
        },
      ],
    },
  ],
})

export { createValidEdition };