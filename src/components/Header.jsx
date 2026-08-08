const Header = ({ date, storyCount }) => (
  <header>
    <p>The essential read</p>
    <h1>Five Minute Brief</h1>
    <p>
      {date} 
      <i class="bi bi-dot"></i>
      {storyCount} stories
    </p>
  </header>
)

export default Header;