export default function Search({ query, onUpdateQuery, onUpdateSearch }) {
    return (
        <>
            <select onChange={onUpdateSearch}>
                <option value="title" > Title </option>
                <option value="author" > Author </option>
                <option value="isbn" > ISBN </option>
            </select>
            <input
                id="search"
                type="text"
                placeholder="Search"
                value={query}
                onChange={onUpdateQuery}>
            </input>
        </>
    )
}