import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = (props) => {
    return (
        <div className='col s12'>
            <div className='card blue darken-4'>
                <div className='card-content white-text'>
                    <span className='card-title'>{props.title}</span>
                    <p>{props.year}</p>
                </div>
                <div className='card-action'>
                    <Link to={`/results/${props.imdbID}`}>Info</Link>
                </div>
            </div>
        </div>
    );
}

const ErrorMessage = () => {
    return (
        <div className='row'>
            <div className="col s12 center-align">
                <h4>Sorry, there were no movies matching that query!</h4>
            </div>
        </div>
    );
}

class MovieSearch extends React.Component {
    static intialState = () => ({
        searchTerm: '',
        year: '',
        genre: '',
        rating: '',
        results: []
    })

    state = MovieSearch.intialState();
    componentWillMount() {
        this.setState({ searchTerm: '', results: [] })
    }

    componentDidMount() {
        this.setState({
            searchTerm: localStorage.getItem('searchTerm') !== null ? localStorage.getItem('searchTerm') : '',
            results: localStorage.getItem('results') !== null ? JSON.parse(localStorage.getItem('results')) : []
        });
    }
	
	
    updateInputValue = ({ target: { name, value } }) => this.setState({ [name]: value });

    clear = () => {
        this.setState(MovieSearch.intialState());
        localStorage.removeItem('searchTerm');
        localStorage.removeItem('results');
    }

    search = (e) => {
        e.preventDefault();
        if (this.state.searchTerm !== "") {
            if (this.state.rating) {
                return fetch(`https://omdbapi.com/?t=${this.state.searchTerm}&apikey=de1925b&y=${this.state.year}&type=${this.state.genre}&plot=full`)
                    .then(res => {
                        res.json().then(data => {
                            localStorage.setItem('searchTerm', this.state.searchTerm);
                            localStorage.setItem('results', JSON.stringify(data));
                            localStorage.setItem('fav',
                                localStorage.getItem('fav') !== null
                                    ? [localStorage.getItem('fav'), this.state.searchTerm.toLowerCase()]
                                    : [this.state.searchTerm.toLowerCase()]);
                            Number(data.imdbRating) > this.state.rating
                                ? this.setState({ results: [data] })
                                : this.setState({ results: [] })
                        });
                    }).catch(err => {
                        this.setState({ searchTerm: '', results: [] });
                    })
            }
			
            fetch(`https://omdbapi.com/?s=${this.state.searchTerm}&apikey=de1925b&y=${this.state.year}&type=${this.state.genre}&plot=full`)
                .then(res => {
                    res.json().then(data => {
                        localStorage.setItem('searchTerm', this.state.searchTerm);
                        localStorage.setItem('results', JSON.stringify(data.Search));
						 this.setState({ results: data.Search });
                        if (localStorage.getItem('fav') === null) {
                            localStorage.setItem('fav', [this.state.searchTerm.toLowerCase()])
                        } else {
                            if (!localStorage.getItem('fav').includes(this.state.searchTerm.toLowerCase())) {
                                localStorage.setItem('fav', [localStorage.getItem('fav'), this.state.searchTerm.toLowerCase()])
                            }
                        }
                    }); 
                }).catch(err => {
                    this.setState({ searchTerm: '', results: [] });
                })
        }
    }
	

    render() {
        let results = this.state.results !== undefined ?
            this.state.results.map((movie, id) => {
                return (
                    <MovieCard key={id} title={movie.Title} imdbID={movie.imdbID} year={movie.Year} />
                );
            })
            : <ErrorMessage />;

        return (
            <div>
                <div className='row'>
                    <div className='col s12 center-align'>
                        <h1>Movie Buzz</h1>
                        <p className='sub-heading'>Movie Buzz is your source for movie reviews and movie ratings to help maximize your movie-search-experience. Search and explore movies from a wide collection of genres.</p>
                    </div>
                </div>
                <div className='row center-align'>
                    <div className="col s12">
                        <form onSubmit={this.search}>
                            <input value={this.state.searchTerm} onChange={this.updateInputValue} name="searchTerm" placeholder="Movie Title: ex. Bat Man"/>
                            <div className='center-align'>
                                <button className='waves-effect waves-light btn blue darken-4' title='Search' type='submit'>search</button>
                                <button className='waves-effect waves-light btn blue darken-4' title='Clear' type='button' onClick={this.clear}>clear</button>
                                <Link to='/fav' className='waves-effect waves-light btn blue darken-4' title='Favorites List'>Favorites</Link>
                            </div>
                            <div className='checkbox-container'>
                                <label>
                                    <input type="number" name="year" min="1800" max="2019" placeholder="Year" value={this.state.year} onChange={this.updateInputValue} />
                                </label>
                                <label>
                                    <input type="number" name="rating" min="0" max="10" placeholder="> Rating" value={this.state.rating} onChange={this.updateInputValue} />
                                </label>
                                <label className="type-container">
                                    <span>Genre:&nbsp;</span>
                                    <select name="genre" value={this.state.genre} onChange={this.updateInputValue}>
                                        <option value="movie">Movie</option>
                                        <option value="series">Series</option>
                                        <option value="episode">Episode</option>
                                    </select>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='row'>
                    {results}
                </div>
            </div>
        );
    }
}

export default MovieSearch;
