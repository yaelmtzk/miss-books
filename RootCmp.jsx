
import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/Home.jsx"
import { AboutUs } from "./pages/About.jsx"
import { BookIndex } from "./pages/Index.jsx"

const {useState } = React

export function RootCmp() {
    const [page, setPage] = useState('index')
    return (
            <section className="app main-layout">
                <AppHeader page={page} onSetPage={setPage} />
                <main>
                    <main>
                        {page === 'home' && <HomePage />}
                        {page === 'about' && <AboutUs />}
                        {page === 'index' && <BookIndex />}
                    </main>
                </main>
            </section>
    )
}