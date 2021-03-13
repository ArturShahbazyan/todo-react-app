import React, {Component} from 'react'
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {Route, Switch, Redirect} from 'react-router-dom';
import ToDo from "./Components/pages/ToDo/ToDo";
import About from "./Components/pages/About/About";
import Contact from "./Components/pages/Contact/Contact";
import NotFound from "./Components/pages/NotFound/NotFound";
import SingleTask from "./Components/pages/SingleTask/SingleTask";


class App extends Component {

    render() {
        return (
            <div className="App">
                <Navbar/>
                <div className="app-content-wrapper">
                </div>
                <Switch>
                    <Route path="/" exact component={ToDo}/>
                    <Route  path="/contact" exact component={Contact}/>
                    <Route path="/about" exact component={About}/>
                    <Route path="/task/:id" exact component={SingleTask}/>
                    <Route path="/404" exact component={NotFound}/>
                    <Redirect to="/404"/>
                </Switch>
            </div>
        );
    }
}

export default App;
