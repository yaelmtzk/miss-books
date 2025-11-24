const { Link, NavLink } = ReactRouterDOM

export function Home() {
    return (
        <section className="home">
            <h1 className="welcome-title">Welcome to Miss Books</h1>
            <p className="welcome-text">
                Explore our rich collection of Jewish religious books — from Torah and Talmud to commentaries and Jewish thought. Find inspiration, wisdom, and guidance for every stage of life.
            </p>
            <div className="button-group">
                <button className="btn primary-btn" >
                    <Link to="/index">Browse Books</Link>
                </button>
                <button className="btn secondary-btn">
                    <Link to="/about">About</Link>
                </button>
            </div>
            <div className="image-container">
                <img
                    src="../assets/img/home.jpg"
                    alt="Books"
                    className="welcome-image"
                />
            </div>
        </section>
    )
}

