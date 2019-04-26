import React, { Component } from 'react'
import ReactDOM  from 'react-dom'
import BooksList from './components/BooksList/BooksList'
import styles from './App.module.scss'
import Spinner from './components/Spinner/Spinner'

class App extends Component {
    state = {
        filteredBooks: [],
        startIndex : 0,
        lastPhrase: '',
        fetched: false,
        booksLoaded: 0,
        totalItems: 0,
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleMoreBooks);

    }
  

    preformSearch = () => {
        const input = ReactDOM.findDOMNode(this.refs.search);
        fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${input.value.toLowerCase()}&maxResults=10`
        )
          .then(response => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          })
          .then(responseData => {
            this.setState(prevState => ({
              filteredBooks: responseData.items,
              startIndex: prevState.startIndex + 10,
              lastPhrase: input.value.toLowerCase(),
              fetched: !prevState.fetched,
              totalItems: responseData.totalItems,
              booksLoaded: prevState.booksLoaded + 10
            }));
            input.value = "";
            console.log(this.state.booksLoaded);
            console.log(this.state.totalItems);
          })
          .catch(error => console.log(error));
        this.setState(prevState => ({fetched: !prevState.fetched}));
        
    }

    handleMoreBooks = () => {
      if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && this.state.totalItems > this.state.booksLoaded) {
        fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${
            this.state.lastPhrase
          }&maxResults=40&startIndex=${this.state.startIndex}`
        )
          .then(response => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          })
          .then(json => {
            const newBooks = json.items.filter(item => {
                return this.state.filteredBooks.indexOf(item) === -1;
            })
            this.setState(prevState => ({
              filteredBooks: [...prevState.filteredBooks].concat(newBooks),
              startIndex: prevState.startIndex + 40,
              fetched: !prevState.fetched,
              booksLoaded: prevState.booksLoaded + 40
            }));
            console.log(this.state.booksLoaded);
          })
          .catch(error => console.log(error));
      } else if(this.state.totalItems <= this.state.booksLoaded ) {
          console.log('all books has been loaded')
      }
        
    }

    render() {
        return (
            <div>
                <header className={styles.PageHeader}>
                    <h1 className={styles.heading}>Search books</h1>
                    <div>
                        <input className={styles.input} type='text' ref='search' placeholder='Find interesting books' />
                        <button className={styles.button} onClick={this.preformSearch}>Search</button>
                    </div>
                </header>
                <div>
                   {!this.state.filteredBooks 
                    ? 
                     <Spinner /> 
                    :
                     <BooksList books={this.state.filteredBooks}/>
                    }
                </div>
            </div>
        )
    }
}

export default App