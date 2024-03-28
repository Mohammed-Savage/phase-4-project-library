import React, { useState } from 'react';

export default function BookCard({ books }) {
    const [checkedOutBooks, setCheckedOutBooks] = useState([]);

    const toggleCheckedOut = (bookId) => {
        if (checkedOutBooks.includes(bookId)) {
            setCheckedOutBooks(checkedOutBooks.filter(id => id !== bookId));
        } else {
            setCheckedOutBooks([...checkedOutBooks, bookId]);
        }
    };

    return (
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {books.map((book) => (
                <div key={book.id} style={{ border: "1px solid", margin: "5px", minHeight:"500px", minWidth:"400px"}}>
                    <h1>{book.title} - {book.subtitle}</h1>
                    <img
                    style={{height:"400px", width:"100%"}}
                        className="book-covers"
                        src={book.image}
                        alt={book.title}
                        // onError run the fallback image when the default image doesn't load
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "./image/fallback.gif";
                        }}
                    />
                    <br />
                    <button
                        onClick={() => toggleCheckedOut(book.id)}
                        style={{
                            backgroundColor: checkedOutBooks.includes(book.id) ? 'red' : 'green',
                            color: 'white',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            flex: "1",
                            marginLeft:"200px"
                        }}
                    >
                        {checkedOutBooks.includes(book.id) ? 'Checked Out' : 'Available'}
                    </button>
                    <ul>
                        <li>ISBN: {book.isbn}</li>
                        <li>Author: {book.author}</li>
                        <li>Publisher: {book.publisher} - {book.published}</li>
                        <li>Number of pages: {book.pages}</li>
                        <li>Website: {book.website}</li>
                        <li>Description: {book.description}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}
