////////////
// Import //
////////////

import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import SubmissionForm from "../components/SubmissionForm";

export default function BookPage() {

/////////////////////////////
// Variables and Functions //
/////////////////////////////

// Book state
const [books, setBooks] = useState([]);
const [newBook, setNewBook] = useState({
  isbn:"",
  title:"",
  subtitle:"",
  author:"",
  published:"",
  publisher:"",
  pages:0,
  description:"",
  website:"",
  image: ""
});

// SearchBar state
const [query, setQuery] = useState("");
const [search, setSearch] = useState("title");

// function variable that updates the query whenever the search-box's value changes
const onUpdateQuery = (event) => setQuery(event.target.value);
const onUpdateSearch = (event) => setSearch(event.target.value);

// function that set newBook from the SubmissionForm
function onChangeNewBook(event) {
  setNewBook({ ...newBook, [event.target.name]: event.target.value })
}

///////////////
// SearchBar //
///////////////

const filteredBooksByTitle = 
books.filter(
  book => query ?
  // if query is truthy (not empty): 
  // check for each book's title in lower-case to match the query's value in lower-case, 
  // then return those books that match the values
  book.title.toLowerCase().includes(query.toLowerCase()) 
  // else if query is falsy (null, empty value): 
  // then return all books
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

// filteredBooks determine what to search based on the dropbox's value
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

// GET method
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
}, [books]); // whenever the books got changed, re-render everthing

// POST method
function onAddBook(event){
  event.preventDefault();
  fetch("http://localhost:3000/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newBook) // convert newBook from js to json for the db.json to store data
  }),then(response => response.json())
}

/////////
// App //
/////////

  return (
    <>
      <NavBar />

      <SubmissionForm onAddBook={onAddBook} onChangeNewBook={onChangeNewBook} newBook={newBook}/>

      <SearchBar query={query} onUpdateQuery={onUpdateQuery} onUpdateSearch={onUpdateSearch}/>

      <BookCard books={filteredBooks}/>
    </>
  );
};
