import React, {Component} from 'react'
import styles from './BooksList.module.scss'

class BooksList extends Component {
    render() {
        const {books} = this.props 
        return (
          <div className={styles.BooksList}>
            {books.map(book => (
              <div className={styles.Book} key={book.id}>
                {!book.volumeInfo.imageLinks ? (
                  <div
                    className={`${styles.noImage} ${styles.imageSide}`}
                  />
                ) : (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    className={`${styles.imageSide} ${styles.image}`}
                    alt={book.volumeInfo.title}
                  />
                )}
                <div>
                  <h3>{book.volumeInfo.title}</h3>
                  <p>
                    {!book.volumeInfo.description
                      ? "No description"
                      : book.volumeInfo.description.substr(0, 300)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
    }
   
}

export default BooksList