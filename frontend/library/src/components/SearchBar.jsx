export default function SearchBar({ query, onUpdateQuery, onUpdateSearch }) {
  return (
    <>
      <div style={{position:"sticky"}}>
        <select onChange={onUpdateSearch} style={{ alignItems: "center" }}>
          <option value="title"> Title </option>
          <option value="author"> Author </option>
          <option value="isbn"> ISBN </option>
        </select>
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={query}
          onChange={onUpdateQuery}
        ></input>
      </div>
    </>
  );
}
