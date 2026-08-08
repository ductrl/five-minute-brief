import Header from "./components/Header";
import StoryList from "./components/StoryList";
import Footer from "./components/Footer";
import { mockBrief } from "./data/mockBrief";

const App = () => {
  return (
    <>
      <Header 
        date={mockBrief.date} 
        storyCount={mockBrief.stories.length}
      />

      <StoryList 
        stories={mockBrief.stories}
      />

      <Footer publishedAt={mockBrief.publishedAt}/>
    </>
  )
}

export default App;
