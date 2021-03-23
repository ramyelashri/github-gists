import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './style.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.githubToken = '64eca3787a12c5c054476f7bc9e383b5624a94d0';
    this.state = {
      username: 'addyosmani', // sample user with gists and forked gists
      error: null,
      loading: false,
      fetched: false,
      items: null,
      currentPage: 0,
    };
  }

  updateUsername = (e) => {
    this.setState({username: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getUserGists();
  }

  getUserGists = () => {
    const { username, currentPage } = this.state;
    if(username !== '') {
      this.setState({ loading: true, error: null, fetched: false })
      const resultsPerPage = 10;
      const gistsUrl = `https://api.github.com/users/${username}/gists??access_token=${this.githubToken}&per_page=${resultsPerPage}&page=${currentPage}`;
      axios.get(gistsUrl)
        .then(response => {
          axios.all(response.data.map(gist => {
            return axios.get(`${gist.forks_url}??access_token=64eca3787a12c5c054476f7bc9e383b5624a94d0&per_page=3`)
              .then(response => {
                gist['forks'] = response.data;
                return gist;
              });
          }))
            .then(allData => {
              this.setState({ items: allData, fetched: true, loading: false })
            })
        })
        .catch(error => {
          this.setState({ loading: false, fetched: false, error: true })
        })
    }
  }

  render() {
    const { loading, items, error, fetched } = this.state
    return (
      <div className="Search">
        <div>
          <form className="Search__form" onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <div>
              <TextField variant="outlined" label="Github username" value={this.state.username}
                         onChange={this.updateUsername}/>
            </div>
            <div>
              <Button variant="contained" color="primary" type="submit">Search</Button>
            </div>
          </form>
        </div>

        <div>
          {loading &&
            <div>loading...</div>
          }
          {!loading && error &&
          <div>No such username found, please try again</div>
          }
          {!loading && !error && fetched &&
          <div>
            <h2>User gists</h2>
            {items.length === 0 ?
              <div>No gists found</div>
              :
              <ul>
                {items.map((item, index) => {
                  return (
                    <div className="Search__gist" key={index}>
                      <span className="Global__bold">
                        Gist name:&nbsp;
                      </span>
                      <a href="{item.html_url}">{Object.keys(item.files)[0]}</a>
                      <div>
                        <span className="Global__bold">Tags:</span>&nbsp;
                        {Object.keys(item.files).map((file, index) => (
                          <span key={index}>
                            {index === 0 ?
                              item.files[file].language
                              :
                              ', ' + item.files[file].language
                            }
                          </span>
                        ))}

                        <div>
                          <div className="Search__forks-title Global__bold">
                            Recently forked by:&nbsp;
                          </div>

                          {!item.forks || item.forks.length === 0 ?
                            <div className="Search__forks">No one forked this gist</div>
                            :
                            <div>
                              {item.forks.map((fork, index) => (
                                <div className="Search__forks" key={index}>
                                  <div className="Search__fork-item">
                                    <img className="Search__forker-image"
                                         src={fork.owner.avatar_url}
                                         alt={fork.owner.login} />
                                  </div>
                                  <div>
                                    {fork.owner.login}
                                  </div>
                                </div>
                              ))}
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  )
                })}
              </ul>
            }
          </div>
          }
        </div>
      </div>
    )
  }
}

export default Search;
