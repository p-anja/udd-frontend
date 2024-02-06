const Navbar = () => {
  return (
    <div className="m-4 p-1">
      <ul className="nav nav-pills nav-fill ">
        <li className="nav-item" key={1}>
          <a style={{ textDecoration: "none", color: "gray" }} href="/">
            <h1>UDD</h1>
          </a>
        </li>
        <li className="nav-item" key={4}>
          <a className="nav-link" href="/registration" style={{ textDecoration: "none", fontWeight: "bold", color: "gray" }}>
            Dodaj novu vladu
          </a>
        </li>
        <li className="nav-item" key={5}>
          <a className="nav-link" href="/indexing" style={{ textDecoration: "none", fontWeight: "bold", color: "gray" }}>
            Indeksiranje i parsiranje
          </a>
        </li>
        <li className="nav-item" key={2}>
          <a className="nav-link" aria-current="page" href="/" style={{ textDecoration: "none", fontWeight: "bold", color: "gray" }}>
            Osnovni i upiti fraza
          </a>
        </li>
        <li className="nav-item" key={3}>
          <a className="nav-link" href="/advancedSearch" style={{ textDecoration: "none", fontWeight: "bold", color: "gray" }}>
            Bulovi upiti
          </a>
        </li>
      </ul>
      <hr></hr>
    </div>
  );
};

export default Navbar;
