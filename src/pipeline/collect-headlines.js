import { gunzipSync } from 'node:zlib';
import { Buffer } from 'node:buffer';
import { NEWS_SOURCES } from './config/new-sources.js';

const GDELT_BASE_URL = 'https://data.gdeltproject.org/gdeltv5/weblegacy/ngrams';

const fetchTocFile = async (timeStamp) => {
  const url = `${GDELT_BASE_URL}/${timeStamp}.toc.json.gz`;
  
  console.log(`Fetching ${url}`);

  const response = await fetch(url);

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
    source.domains.some(domain => hostname === domain || hostname.endsWith(domain))
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

const articles = await fetchTocFile('20260630201600')

console.log(`All articles: ${articles.length}`)

const approvedArticles = filterApprovedArticles(articles)

console.log(`Approved articles: ${approvedArticles.length}`)
console.log(approvedArticles.slice(0, 5));