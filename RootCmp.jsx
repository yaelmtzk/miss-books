const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Navigate } = ReactRouterDOM

import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"

export function RootCmp() {
    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/index" element={<BookIndex />} />
                        <Route path="/index/:bookId" element={<BookDetails />} />
                        <Route path="/index/edit" element={<BookEdit />} />
                        <Route path="/index/edit/:bookId" element={<BookEdit />} />
                    </Routes>

                </main>
            </section>
        </Router>
    )
}