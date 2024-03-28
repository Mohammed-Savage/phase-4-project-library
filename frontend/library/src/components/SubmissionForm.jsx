

export default function SubmissionForm( {onAddBook, newBook, onChangeNewBook} ) {
    return (
        <>
            <div>
                <form style={{width:"50%"}} className="new-book-form" onSubmit={event => onAddBook(event)}>
                    <h1 style={{ marginTop:"0"}}>New Book</h1>
                    <div className="input-container" style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)"}}>
                    <input placeholder="Title" name="title" value={newBook.title} onChange={onChangeNewBook} required type="text"></input>
                    <input placeholder="ISBN" name="isbn" value={newBook.isbn} onChange={onChangeNewBook} type="text"></input>
                    <input placeholder="Subtitle" name="subtitle" value={newBook.subtitle} onChange={onChangeNewBook} type="text"></input>
                    <input placeholder="Author" name="author" value={newBook.author} onChange={onChangeNewBook} required type="text"></input>
                    <input placeholder="Published" name="published" value={newBook.published} onChange={onChangeNewBook} type="text"></input>
                    <input placeholder="Publisher" name="publisher" value={newBook.publisher} onChange={onChangeNewBook} type="text"></input>
                    <input placeholder="Pages" name="pages" value={newBook.pages} onChange={onChangeNewBook} type="number" min="0"></input>
                    <input placeholder="Website" name="website" value={newBook.website} onChange={onChangeNewBook} type="text"></input>
                    <input placeholder="Image" name="image" value={newBook.image} onChange={onChangeNewBook} required type="text"></input> 
                    <textarea placeholder="Description" name="description" value={newBook.description} onChange={onChangeNewBook} type="text" rows={"5"} cols={35}></textarea> <br/>
                    <input type="Submit" value="Submit Book" style={{height:"20px"}}></input>
                    </div>
                </form>
            </div>
        </>
    )
}