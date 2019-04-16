import React, { Component } from 'react'
import ReactDOM  from 'react-dom'
import BooksList from './components/BooksList/BooksList'
import styles from './App.module.scss'
import Spinner from './components/Spinner/Spinner'

class App extends Component {
    state = {
        filteredBooks: [],
    }

    componentDidMount = () => {
        this.fetchInitialBooks();
    }

   
    fetchInitialBooks = () => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=search+terms`)
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    filteredBooks: responseData.items,
                }) 
            })
    }       

    preformSearch = () => {
        const input = ReactDOM.findDOMNode(this.refs.search);
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${input.value.toLowerCase()}&maxResults=10`)
             .then(response => response.json())
             .then(responseData => {
                     this.setState((prevState) => ({
                         filteredBooks: responseData.items,
                     }))
                 input.value = ''
             })
             
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