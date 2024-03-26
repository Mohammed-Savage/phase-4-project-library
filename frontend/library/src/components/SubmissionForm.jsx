export default function SubmissionForm( {onAddBook, newBook, onChangeNewBook} ) {
    return (
        <>
            <form onSubmit={event => onAddBook(event)}>
                <h1>New Book</h1>
                <input placeholder="Title" name="title" value={newBook.title} onChange={onChangeNewBook} required type="text"></input>
                <input placeholder="Isbn" name="isbn" value={newBook.isbn} onChange={onChangeNewBook} type="text"></input>
                <input placeholder="Subtitle" name="subtitle" value={newBook.subtitle} onChange={onChangeNewBook} type="text"></input>
                <input placeholder="Author" name="author" value={newBook.author} onChange={onChangeNewBook} required type="text"></input>
                <input placeholder="Published" name="published" value={newBook.published} onChange={onChangeNewBook} type="text"></input>
                <input placeholder="Publisher" name="publisher" value={newBook.publisher} onChange={onChangeNewBook} type="text"></input>
                <input placeholder="Pages" name="pages" value={newBook.pages} onChange={onChangeNewBook} type="number"></input>
                <input placeholder="Description" name="description" value={newBook.description} onChange={onChangeNewBook} type="text"></input>
                <input placeholder="Website" name="website" value={newBook.website} onChange={onChangeNewBook} type="text"></input>
                <input placeholder="Image" name="image" value={newBook.image} onChange={onChangeNewBook} required type="text"></input>
                <input type="Submit"></input>
            </form>
        </>
    )
}