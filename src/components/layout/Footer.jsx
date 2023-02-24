import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <ul className="social">
                <li><FaFacebook /></li>
                <li><FaInstagram /></li>
                <li><FaLinkedin /></li>
            </ul>
            <p className="copy_right"> <span>Todo-List</span> &copy; 2023</p>
        </footer>
    )
}

export default Footer;