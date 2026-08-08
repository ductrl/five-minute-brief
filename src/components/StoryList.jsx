import StoryItem from "./StoryItem";

const StoryList = ({ stories }) => {
  return (
    <section>
      {stories.map(story => (
        <StoryItem 
          key={story.id}
          headline={story.headline}
          summary={story.summary}
        />
      ))}
    </section>
  )
}

export default StoryList;