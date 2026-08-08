import StoryItem from "./StoryItem";

const StoryList = ({ stories }) => {
  return (
    <section>
      {stories.map(story => (
        <StoryItem 
          key={story.id}
          headline={story.headline}
          summary={story.summary}
          sources={story.sources}
        />
      ))}
    </section>
  )
}

export default StoryList;