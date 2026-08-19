const Footer = ({ publishedAt }) => {
  return (
    <footer className="pt-4">
      <h2 className="footer-message pb-4 border-bottom">
        That's the brief for today.
      </h2>
      <div className="footer-meta pt-3">
        <p className="fw-bold mb-2">Published at {publishedAt}</p>
        <p className="mb-0">AI-generated headlines and summaries may contain error.</p>
      </div>
    </footer>
  )
}

export default Footer;