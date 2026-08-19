const Header = ({ date, storyCount }) => (
  <header className="brief-header border-bottom pb-4 mb-4 fs-6">
    <p className="brief-eyebrow text-uppercase fw-bold mb-3">The essential read</p>
    <h1 className="brief-title text-uppercase fw-bold mb-3">Five Minute Brief</h1>
    {date && storyCount &&
      <p className="brief-meta mb-0 fs-6">
        {date} 
        <i className="bi bi-dot"></i>
        {storyCount} stories
      </p>
    }
  </header>
)

export default Header;