// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repoDetails

  return (
    <li className="repo-card">
      <img className="avatar" src={avatarUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <div className="points-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="icon"
          alt="stars"
        />
        <p> {starsCount} stars</p>
      </div>
      <div className="points-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="icon"
          alt="forks"
        />
        <p> {forksCount} forks</p>
      </div>
      <div className="points-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="icon"
          alt="open issues"
        />
        <p> {issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
