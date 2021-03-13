import {Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import s from "../Navbar/navbar.module.css"

const Navbar = () => {
    return(
        <Nav className={s.custom_nav}>
            <Nav.Item>
                <NavLink to="/" className={s.pageLink} activeClassName={s.activeNavLink} exact>Home</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/contact" className={s.pageLink} activeClassName={s.activeNavLink} exact>Contact</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/about" className={s.pageLink} activeClassName={s.activeNavLink} exact>About Us</NavLink>
            </Nav.Item>
        </Nav>
    )
}

export default Navbar;