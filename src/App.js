import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {Route, Switch, Redirect} from 'react-router-dom';
import ToDo from "./Components/pages/ToDo/ToDo";
import About from "./Components/pages/About/About";
import Contact from "./Components/pages/Contact/Contact";
import NotFound from "./Components/pages/NotFound/NotFound";
import SingleTaskWithReducer from "./Components/pages/SingleTask/SingleTask";
import {connect} from 'react-redux';
import Preloader from "./Components/Preloader/Preloader";
import ReactTypingEffect from 'react-typing-effect';
import React, {useEffect} from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const pages = [
    {path: "/", Component: ToDo},
    {path: "/contact", Component: Contact},
    {path: "/about", Component: About},
    {path: "/task/:id", Component: SingleTaskWithReducer},
    {path: "/404", Component: NotFound},
];

const App = ({isLoad, successMessage, errorMessage}) => {

    const pageRoutes = pages.map((page, index) => {
            const {Component} = page;
            return <Route
                path={page.path}
                exact
                key={index}
                render={(props) => {
                    return (
                        <Component {...props}/>
                    )
                }
                }
            />
        }
    )

    useEffect(() => {
        errorMessage && toast.error(`🦄 ${errorMessage}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, [errorMessage]);

    useEffect(() => {
        successMessage && toast.success(`🦄 ${successMessage}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, [successMessage]);

    return (
        <div className="App">
            <Navbar/>
            <div className="banner">
                <div className="react_txt">
                    <ReactTypingEffect
                        text={["React", "A JavaScript library for building user interfaces!"]}
                        speed={200}
                        typingDelay={200}
                        eraseDelay={200}
                        eraseSpeed={150}
                    />
                </div>
            </div>

            <div className="app-content-wrapper">
            </div>
            <Switch>
                {pageRoutes}
                <Redirect to="/404"/>
            </Switch>
            {
                isLoad && <Preloader/>
            }
            {
                (successMessage || errorMessage) && <ToastContainer/>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    const {
        isLoad,
        successMessage,
        errorMessage
    } = state.globalState;
    return {
        isLoad,
        successMessage,
        errorMessage
    }
}

export default connect(mapStateToProps, null)(App);
