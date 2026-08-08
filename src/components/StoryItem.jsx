import { useState } from "react";

const StoryItem = ({ headline, summary, sources }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <article>
      {/* ----- Headline ----- */}
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

      {/* ----- Content ----- */}
      {isOpen && (
        <div>
          <p>{summary}</p>
          {sources.map(source => (
            <a 
              key={source.publisher}
              href={source.url}
              target="_blank"
            >
              {source.publisher}|
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

export default StoryItem;