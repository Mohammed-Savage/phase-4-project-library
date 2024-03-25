import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/books");
        const data = await response.json();
        // Update state with fetched data
        setBooks(data);
      } catch (error) {
        console.error("Error fetching data", error);
        throw error;
      }
    }

    fetchData(); // Call the async function
  }, []); // Empty dependency array to run only once

  return (
    <>
      <NavBar />
      <div>
        
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {books.map((book) => (
            <div key={book.id} style={{border:"1px solid", margin:"5px"}}>
              <h1 style={{textAlign:"center"}}>{book.title}</h1>
              <h3 style={{textAlign:"center"}}>{book.subtitle}</h3>
              <img
              className="book-covers"
              src={book.image}
              alt={book.title}
             style={{height:"400px", width: "350px", marginLeft:"70px"}}
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
      </div>
    </>
  );
};

export default Books;
