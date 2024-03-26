import NavBar from "../components/NavBar"

export default function HomePage() {
    return(
        <>
            <header>
                <NavBar></NavBar>
            </header>
            <div id="home" style={{height:"500px"}}>
                <h1 id="home-title">The Duke's Archives</h1>
                <h2 id="authors">By Austin, Mohammed, Tiffany, and Vinh </h2>
            </div>
            <footer style={{borderTop:"1px solid"}}>
                <div className="frontend" style={{textAlign:"left"}}><h2>Frontend Gia Vinh Nguyen & Austin Rivera</h2></div>
                <div className="backend" style={{textAlign:"right"}}><h2>Tiffany Man & Mohammed Omar Backend</h2></div>
            </footer>
        </>
    )
}