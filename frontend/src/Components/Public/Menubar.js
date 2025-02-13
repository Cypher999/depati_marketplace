"use client"
import { useState, useEffect } from "react";
export default function (){
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    // Menutup dropdown jika klik di luar area menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest("#navbarNav") && !event.target.closest(".navbar-toggler")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
            <a className="navbar-brand fw-bold" href="#">Depati Marketplace</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" onClick={toggleNavbar}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Products</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Contact Us</a></li>
                </ul>
                <button className="btn btn-outline-primary ms-3">Login</button>
                <button className="btn btn-primary ms-2">Sign Up</button>
            </div>
        </div>
    </nav>)
}