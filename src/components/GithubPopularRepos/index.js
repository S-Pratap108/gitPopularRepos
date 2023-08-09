import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFiltersItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusValue = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    activeOptionId: languageFiltersData[0].id,
    apiStatus: apiStatusValue.failure,
  }

  componentDidMount() {
    this.getReposList()
  }

  updateActiveOptionId = btnId => {
    this.setState({activeOptionId: btnId}, this.getReposList)
  }

  getReposList = async () => {
    const {activeOptionId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeOptionId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    console.log(fetchedData.popular_repos)
    if (response.ok === true) {
      const updatedData = fetchedData.popular_repos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      this.setState({reposList: updatedData, apiStatus: apiStatusValue.success})
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderSuccessView = () => {
    const {reposList} = this.state

    return (
      <ul className="repos-cont">
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderReposStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValue.success:
        return this.renderSuccessView()
      case apiStatusValue.failure:
        return this.renderFailureView()
      case apiStatusValue.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeOptionId} = this.state

    return (
      <div className="App-bg">
        <h1 className="hdg"> Popular </h1>
        <ul className="buttons-cont">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFiltersItem
              key={eachLanguage.id}
              languageDetails={eachLanguage}
              updateActiveOptionId={this.updateActiveOptionId}
              activeOptionId={activeOptionId}
            />
          ))}
        </ul>
        {this.renderReposStatus()}
      </div>
    )
  }
}

export default GithubPopularRepos
