
export function AppHeader({page = 'home', onSetPage}) {

    function onPageChange(ev, page) {
        ev.preventDefault()
        onSetPage(page)
    }    

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <div className="logo-box">
                    <img src="../assets/img/logo.png" alt="logo" />
                    <p>Miss Books</p>
                </div>
                
                <nav>
                    <a href="" className={(page === 'home') ? 'active' : ''}
                        onClick={(ev) => onPageChange(ev, 'home')}>
                        Home
                    </a> |
                    <a href="" className={(page === 'about') ? 'active' : ''}
                        onClick={(ev) => onPageChange(ev, 'about')}>
                        About
                    </a>
                        <a href="" className={(page === 'index') ? 'active' : ''}
                        onClick={(ev) => onPageChange(ev, 'index')}>
                        Book Index
                    </a>
                </nav>
            </section>
        </header>
    )
}
