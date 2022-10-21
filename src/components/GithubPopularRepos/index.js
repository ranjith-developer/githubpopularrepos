import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    reposData: [],
    activeLanguageFilter: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageFilter} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilter}`,
    )
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        imageUrl: eachRepo.avatar_url,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
        forksCount: eachRepo.forks_count,
        issuesCount: eachRepo.issues_count,
      }))
      this.setState({
        reposData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="error-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesList = () => {
    const {reposData} = this.state

    return (
      <ul className="repos-cards-list-container">
        {reposData.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoData={eachRepo} />
        ))}
      </ul>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  clickLanguageFilter = newFilterId => {
    this.setState({activeLanguageFilter: newFilterId}, this.getRepositories)
  }

  renderLanguageFiltersList = () => {
    const {activeLanguageFilter} = this.state

    return (
      <ul className="filters-list-container">
        {languageFiltersData.map(eachLanguageFilter => (
          <LanguageFilterItem
            key={eachLanguageFilter.id}
            isActive={eachLanguageFilter.id === activeLanguageFilter}
            languageFilterDetails={eachLanguageFilter}
            clickLanguageFilter={this.clickLanguageFilter}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="github-popular-repos-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFiltersList()}
          {this.renderApiStatusView()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
