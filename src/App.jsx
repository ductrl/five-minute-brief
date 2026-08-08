import Header from "./components/Header";
import StoryList from "./components/StoryList";
import Footer from "./components/Footer";
import StatusMessage from "./components/StatusMessage";
import { mockBrief } from "./data/mockBrief";
import { useState } from "react";

const App = () => {
  const [status, setStatus] = useState('success');

  if (status !== 'success') {
    return (
      <main>
        <Header/>
        <StatusMessage status={status}/>
      </main>
    )
}

  return (
    <main>
      <Header 
        date={mockBrief.date} 
        storyCount={mockBrief.stories.length}
      />

      <StoryList 
        stories={mockBrief.stories}
      />

      <Footer publishedAt={mockBrief.publishedAt}/>
    </main>
  )
}

export default App;
