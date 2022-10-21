// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoData} = props

  return (
    <li className="repo-card-item-container">
      <img
        className="card-item-image"
        src={repoData.imageUrl}
        alt={repoData.name}
      />
      <h1 className="card-item-name">{repoData.name}</h1>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="stats-text">{repoData.starsCount} stars</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="stats-text">{repoData.forksCount} forks</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="stats-text">{repoData.issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
