const Footer = ({ publishedAt }) => {
  return (
    <footer>
      <h2>That's the brief for today.</h2>
      <p>Published at {publishedAt}</p>
      <p>AI-generated headlines and summaries may contain error.</p>
    </footer>
  )
}

export default Footer;