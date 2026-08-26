import Header from "./components/Header";
import StoryList from "./components/StoryList";
import Footer from "./components/Footer";
import StatusMessage from "./components/StatusMessage";
import { useEffect, useState } from "react";
import { EditionSchema } from "../schemas/edition";
import { formatEditionDate, formatPublishedTime } from "./utils/date";

const App = () => {
  const [status, setStatus] = useState('loading');
  const [edition, setEdition] = useState(null);

  useEffect(() => {
    const loadEdition = async () => {
      try {
        const response = await fetch('./current.json');
        const data = await response.json();
        console.log(data);

        const result = EditionSchema.safeParse(data);

        if (!result.success) {
          setStatus('invalid-data');
          return;
        }

        setStatus('success');
        setEdition(data);
      } catch (error) {
        console.error(error);
        setStatus('invalid-data');
      }
      
    }

    loadEdition();
  }, [])

  if (status !== 'success') {
    return (
      <main className="brief border border-2">
        <Header/>
        <StatusMessage status={status}/>
      </main>
    )
  }

  return (
    <main className="brief border border-2">
      <Header 
        date={formatEditionDate(edition.editionDate)} 
        storyCount={edition.stories.length}
      />

      <StoryList 
        stories={edition.stories}
      />

      <Footer publishedAt={formatPublishedTime(edition.publishedAt)}/>
    </main>
  )
}

export default App;
