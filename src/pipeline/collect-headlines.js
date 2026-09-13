import { gunzipSync } from 'node:zlib';
import { Buffer } from 'node:buffer';
import { NEWS_SOURCES } from './config/new-sources.js';

const GDELT_BASE_URL = 'https://data.gdeltproject.org/gdeltv5/weblegacy/ngrams';

const fetchTocFile = async (timeStamp) => {
  const url = `${GDELT_BASE_URL}/${timeStamp}.toc.json.gz`;
  
  console.log(`Fetching ${url}`);

  const response = await fetch(url);

  if (response.status == 404) {
    return []; // this is normal and pretty much expected
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch GDELT TOC: ${response.status} ${response.statusText}`);
  }

  // longer than necessary because I don't fully understand this yet

  // get the fetched data in the form of raw bytes
  const compresed = await response.arrayBuffer();
  // convert the compressed data into a Node Buffer
  const buffer = Buffer.from(compresed);
  // decompress the data (which returns another **buffer**)
  const decompressed = gunzipSync(buffer);
  // convert raw bytes into actual text
  const jsonl = decompressed.toString('utf-8');
  // console.log(jsonl);

  // converting the json data into an array of objects
  // --- article object shape ---
  /**
   * ID: 'number',
   * date: 'string',
   * img: 'string',
   * lang: 'string',
   * title: 'string',
   * url: 'string'
   */
  const articles = jsonl  
    .trim()
    .split('\n')
    .map(line => JSON.parse(line));

  return articles;
}

const getSourceFromUrl = (url) => {
  const hostname = new URL(url).hostname.toLowerCase();

  return NEWS_SOURCES.find(source => 
    source.domains.some(domain => hostname === domain || hostname.endsWith(`.${domain}`))
  );
}

const filterApprovedArticles = (articles) => {
  const approvedArticles = [];

  for (const article of articles) {
    if (article.lang !== 'en') continue;

    const source = getSourceFromUrl(article.url);

    if (!source) continue;

    approvedArticles.push({
      headline: article.title,
      url: article.url,
      publishedAt: article.date,
      publisher: source.name,
      tier: source.tier,
      weight: source.weight,
    });
  }

  return approvedArticles;
}

// convert JS Date object into TOC timestamp
const formatGdeltTimestamp = (date) => {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hour = String(date.getUTCHours()).padStart(2, '0')
  const minute = String(date.getUTCMinutes()).padStart(2, '0')

  return `${year}${month}${day}${hour}${minute}00`
}

// get 1,440 timestamps for the past 24 hours
const getTocTimestamps = (coverageStart, coverageEnd) => {
  const timestamps = []

  const current = new Date(coverageStart)
  const end = new Date(coverageEnd)

  current.setUTCSeconds(0, 0)

  while (current < end) {
    timestamps.push(formatGdeltTimestamp(current))
    current.setUTCMinutes(current.getUTCMinutes() + 1)
  }

  return timestamps
}

const collectHeadlines = async(coverageStart, coverageEnd) => {
  const timestamps = getTocTimestamps(coverageStart, coverageEnd);
  const headlinesByUrl = new Map();

  for (const timestamp of timestamps) {
    const articles = await fetchTocFile(timestamp);

    if (articles.length === 0) continue;

    const approvedArticles = filterApprovedArticles(articles);

    for (const article of approvedArticles) {
      if (!headlinesByUrl.has(article.url)) {
        headlinesByUrl.set(article.url, article);
      }
    }
  }

  return [...headlinesByUrl.values()]
}

const headlines = await collectHeadlines(
  '2026-06-30T20:00:00Z',
  '2026-06-30T21:00:00Z',
)

console.log(`Collected headlines: ${headlines.length}`)
console.log(headlines.slice(0, 5))