import {Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import s from "../Navbar/navbar.module.css"

const NavbarItems = [
    {to: "/", value: "Home"},
    {to: "/contact", value: "Contact"},
    {to: "/about", value: "About"}
]

const Navbar = () => {

    const NavbarList = NavbarItems.map((navbarItem, index) => {
        return <Nav.Item key={index}>
            <NavLink to={navbarItem.to}
                     className={s.pageLink}
                     activeClassName={s.activeNavLink}
                     exact
            >
                {navbarItem.value}
            </NavLink>
        </Nav.Item>
    })

    return (
        <Nav className={s.custom_nav}>
            {NavbarList}
        </Nav>
    )
}

export default Navbar;