import React from 'react';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component  {
  state = { images: [] };

  onSearchSubmit = async (term) => {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: term},
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
          }
      })

      this.setState({ images: response.data.results })
  }

  render() {
      return (
          <div>
              <SearchBar userSubmit={this.onSearchSubmit}/>
              <span>Found: {this.state.images.length} images</span>
              <ImageList foundImages={this.state.images} />
          </div>
      )
  }
}

export default App;