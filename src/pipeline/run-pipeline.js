import { validateEdition } from "./validate-edition.js";
import { NEWS_SOURCES } from "./config/new-sources.js"; 

const runPipeline = async () => {
  console.log('[pipeline] Starting');

  // collection 
  // selection 
  // research 
  // writing
  
  const edition = {};

  const validatedEdition = validateEdition(edition);

  console.log('[pipeline] Edition validated');
  

  // write files
}

runPipeline();