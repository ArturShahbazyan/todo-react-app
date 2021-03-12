import React, {Component} from 'react'
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {Route, Switch, Redirect} from 'react-router-dom';
import ToDo from "./Components/pages/ToDo/ToDo";
import About from "./Components/pages/About/About";
import Contact from "./Components/pages/Contact/Contact";


class App extends Component {

    render() {
        return (
            <div className="App">
                <Navbar/>
                <div className="app-content-wrapper">
                </div>
                <Switch>
                    <Route path="/" exact render={() => <ToDo/>}/>
                    <Route  path="/contact" exact render={() => <Contact/>}/>
                    <Route path="/about" exact render={() => <About/>}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        );
    }
}

export default App;
