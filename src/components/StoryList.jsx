import StoryItem from "./StoryItem";

const StoryList = ({ stories }) => {
  return (
    <section>
      {stories.map((story, index) => (
        <StoryItem 
          key={story.id}
          headline={story.headline}
          summary={story.summary}
          sources={story.sources}
          defaultOpen={index === 0}
        />
      ))}
    </section>
  )
}

export default StoryList;