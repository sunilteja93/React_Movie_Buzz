import React from 'react';
import { Link } from 'react-router-dom';

class FavMovie extends React.Component {
    render() {
        if (localStorage.getItem('fav') === null) {
            return (<div className='row'>
                <div className="col s12 center-align">
                    <h4>Sorry, there were no movies search</h4>
					<div className='s12'>
                        <Link to='/' className='blue-link'>&larr; Back</Link>
                    </div>
                </div>
            </div>)
        }
        let search = localStorage.getItem('fav').split(',')
        let results = search.map((movie, index) => (
            <div className='col s12' key={`${movie}_${index}`}>
                <div className='card blue darken-4'>
                    <div className='card-content white-text'>
                        <span className='card-title'>{movie}</span>
                    </div>
                </div>
            </div>
        ))
        return (
            <div className="fav-container">
				<h1>Favorite Searches</h1>
                {results}
                <div className='row'>
                    <div className='s12'>
                        <Link to='/' className='blue-link'>&larr; Back</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default FavMovie;
