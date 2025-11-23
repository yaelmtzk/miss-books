const { useState, useEffect } = React

export function HomePage() {
    return (
        <section className="home">
            <h1 className="welcome-title">Welcome to Miss Books</h1>
            <p className="welcome-text">
                Explore our rich collection of Jewish religious books — from Torah and Talmud to commentaries and Jewish thought. Find inspiration, wisdom, and guidance for every stage of life.
            </p>
            <div className="button-group">
                <a href="#" className="btn primary-btn" 
                onClick={(ev) => onPageChange(ev, 'index')}>Browse Books</a>
                <a href="#" className="btn secondary-btn">About Us</a>
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

