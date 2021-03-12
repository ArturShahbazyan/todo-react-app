import {Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import s from "../Navbar/navbar.module.css"

const Navbar = () => {
    return(
        <Nav className={s.custom_nav}>
            <Nav.Item>
                <NavLink to="/" activeClassName={s.activeNavLink} exact>Home</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/contact" activeClassName={s.activeNavLink} exact>Contact</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/about" activeClassName={s.activeNavLink} exact>About Us</NavLink>
            </Nav.Item>
        </Nav>
    )
}

export default Navbar;