import React from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import '../App.css';

class App extends React.Component {
	onSearchSubmit(term) {
		axios.get('https://api.unsplash.com/search/photos', {
			params: { query: term },
			headers: {
				Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
			}
		});
	}

	render() {
		return (
			<div>
				<SearchBar userSubmit={this.onSearchSubmit} />
			</div>
		);
	}
}

export default App;
