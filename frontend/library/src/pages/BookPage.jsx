////////////
// Import //
////////////

import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import BookCard from "../components/BookCard";

export default function BookPage() {

/////////////////////////////
// Variables and Functions //
/////////////////////////////

const [books, setBooks] = useState([]);
const [query, setQuery] = useState("");
const [search, setSearch] = useState("title");

// a function variable that updates the query whenever the search-box's value changes
const onUpdateQuery = (event) => setQuery(event.target.value);
const onUpdateSearch = (event) => setSearch(event.target.value);

const filteredBooksByTitle = 
books.filter(
  book => query ?
  // if query is truthy (not empty): 
  // check for each book's title in lower-case to match the query's value in lower-case, 
  // then return those books that match the values
  book.title.toLowerCase().includes(query.toLowerCase()) 
  // if else query is falsy (null, empty value): then return all books
  : true
);

const filteredBooksByISBN = 
books.filter(
  book => query ?
  book.isbn.includes(query)
  : true
)

const filteredBooksByAuthor =
books.filter(
  book => query ?
  book.author.toLowerCase().includes(query.toLowerCase())
  :true
)

var filteredBooks = []

switch(search)
{
  case "title":
    filteredBooks = filteredBooksByTitle
    break;
  case "author":
    filteredBooks = filteredBooksByAuthor
    break;
  case "isbn":
    filteredBooks = filteredBooksByISBN
    break;
}

//////////
// CRUD //
//////////

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/books");
        const data = await response.json(); // Convert "pure-string" json into a readable javascript for the computer to process 
        setBooks(data); // Update state with fetched data
      }
      catch (error) {
        console.error("Error fetching data", error);
        throw error;
      }
    }

    fetchData(); // Call the async function
  }, []); // Empty dependency array to run only once

/////////
// App //
/////////

  return (
    <>
      <NavBar />

      <Search query={query} onUpdateQuery={onUpdateQuery} onUpdateSearch={onUpdateSearch} />

      <BookCard books={filteredBooks} />
    </>
  );
};
