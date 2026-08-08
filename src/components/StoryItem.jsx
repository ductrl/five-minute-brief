import { useState } from "react";

const StoryItem = ({ headline, summary }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <article>
      <button
        onClick={handleToggle}
      >
        <span>{headline}</span> 
        <span>
          {isOpen
            ? <i className="bi bi-chevron-up"></i>
            : <i className="bi bi-chevron-down"></i>
          }
        </span>
      </button>

      {isOpen && (
        <div>
          {summary}
        </div>
      )}
    </article>
  )
}

export default StoryItem;