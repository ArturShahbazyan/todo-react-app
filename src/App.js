import React, {Component} from 'react'
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {Route, Switch, Redirect} from 'react-router-dom';
import ToDo from "./Components/pages/ToDo/ToDo";
import About from "./Components/pages/About/About";
import Contact from "./Components/pages/Contact/Contact";
import NotFound from "./Components/pages/NotFound/NotFound";
import ContactContextProvider from "./Context/ContactContextProvider";
import SingleTaskWithReducer from "./Components/pages/SingleTask/SingleTaskWithReducer";

const pages = [
    {path: "/", Component: ToDo},
    {path: "/contact", Component: Contact, ContextProvider: ContactContextProvider},
    {path: "/about", Component: About},
    {path: "/task/:id", Component: SingleTaskWithReducer},
    {path: "/404", Component: NotFound},
];

class App extends Component {

    render() {

        const pageRoutes = pages.map((page, index) => {
                const {ContextProvider, Component} = page;
                return <Route
                    path={page.path}
                    exact
                    key={index}
                    render={(props) => {
                        return (
                            ContextProvider ?
                                <ContextProvider>
                                    <Component {...props}/>
                                </ContextProvider> :
                                <Component {...props}/>
                        )
                    }
                    }
                />
            }
        )

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
