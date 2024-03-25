export default function BookCard({ books }) {
    return (
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {books.map((book) => (
                <div key={book.id} style={{ border: "1px solid", margin: "5px" }}>

                    <h1>{book.title} - {book.subtitle}</h1>

                    <img
                        className="book-covers"
                        src={book.image} // alt={book.title} height="400px" width="300px"
                    />

                    <ul>
                        <li>ISBN: {book.isbn}</li>
                        <li>Author: {book.author}</li>
                        <li>Publisher: {book.publisher} - {book.published}</li>
                        <li>Number of pages: {book.pages}</li>
                        <li>{book.website}</li>
                        <li>{book.description}</li>
                    </ul>

                </div>
            ))}
        </div>
    )
}