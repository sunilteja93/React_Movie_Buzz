// React Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import MovieSearch from './components/MovieSearch.jsx';
import MovieInfo from './components/MovieInfo.jsx';
import FavMovie from './components/FavMovie.jsx';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={MovieSearch} />
                    <Route path='/results/:id' component={MovieInfo} />
                    <Route path='/fav' component={FavMovie} />
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('container'));
