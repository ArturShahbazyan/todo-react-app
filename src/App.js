import React, {Component} from 'react'
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {Route, Switch, Redirect} from 'react-router-dom';
import ToDo from "./Components/pages/ToDo/ToDo";
import About from "./Components/pages/About/About";
import Contact from "./Components/pages/Contact/Contact";
import NotFound from "./Components/pages/NotFound/NotFound";
import SingleTask from "./Components/pages/SingleTask/SingleTask";

const pages = [
    {path: "/", component: ToDo},
    {path: "/contact", component: Contact},
    {path: "/about", component: About},
    {path: "/task/:id", component: SingleTask},
    {path: "/404", component: NotFound},
];

class App extends Component {

    render() {

        const pageRoutes = pages.map((page, index) => {
            return <Route
                path={page.path}
                component={page.component}
                exact
                key={index}
            />
        })

        return (
            <div className="App">
                <Navbar/>
                <div className="app-content-wrapper">
                </div>
                <Switch>
                    {pageRoutes}
                    <Redirect to="/404"/>
                </Switch>
            </div>
        );
    }
}

export default App;
