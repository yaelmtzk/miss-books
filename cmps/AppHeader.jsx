const { Link, NavLink } = ReactRouterDOM

export function AppHeader() { 
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <div className="logo-box">
                    <img src="../assets/img/logo.png" alt="logo" />
                    <p>Miss Books</p>
                </div>
                <nav>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/index">Book Index</NavLink>
                </nav>
            </section>
        </header>
    )
}
