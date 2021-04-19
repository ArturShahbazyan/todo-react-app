import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {Route, Switch, Redirect} from 'react-router-dom';
import ToDo from "./Components/pages/ToDo/ToDo";
import About from "./Components/pages/About/About";
import Contact from "./Components/pages/Contact/Contact";
import NotFound from "./Components/pages/NotFound/NotFound";
import ContactContextProvider from "./Context/ContactContextProvider";
import SingleTaskWithReducer from "./Components/pages/SingleTask/SingleTaskWithHooks";
import {connect} from 'react-redux';
import Preloader from "./Components/Preloader/Preloader";
import ReactTypingEffect from 'react-typing-effect';
import Footer from "./Components/Footer/Footer";

const pages = [
    {path: "/", Component: ToDo},
    {path: "/contact", Component: Contact, ContextProvider: ContactContextProvider},
    {path: "/about", Component: About},
    {path: "/task/:id", Component: SingleTaskWithReducer},
    {path: "/404", Component: NotFound},
];

const App = ({isLoad}) => {

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
            <Footer/>
            {
                isLoad && <Preloader/>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    const {
        isLoad
    } = state.globalState;
    return {
        isLoad
    }
}

export default connect(mapStateToProps, null)(App);
