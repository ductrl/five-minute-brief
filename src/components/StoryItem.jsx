import { useState } from "react";

const StoryItem = ({ 
  headline, 
  summary, 
  sources,
  defaultOpen=false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <article className="border-bottom py-4">
      {/* ----- Headline ----- */}
      <button
        className="story-toggle btn w-100 p-0 border-0 d-flex justify-content-between align-items-start text-start"
        onClick={handleToggle}
      >
        <span className="story-headline fw-semibold">
          {headline}
        </span> 
        <i
          className={`bi ${
            isOpen ? 'bi-chevron-up' : 'bi-chevron-down'
          } ms-3 flex-shrink-0`}
        ></i>
      </button>

      {/* ----- Content ----- */}
      {isOpen && (
        <div>
          <p className="story-summary pt-3">
            {summary}
          </p>
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