import Header from "./components/Header";
import StoryItem from "./components/StoryItem";
import StoryList from "./components/StoryList";
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

      <footer>This is the footer</footer>
    </>
  )
}

export default App
