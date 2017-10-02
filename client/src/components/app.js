import React from 'react';
import { Route } from 'react-router-dom';
import Nav from './nav';
import Background from './background';
import Header from './header';
import AboutColumn from './about_column';
import Home from './home';
import Footer from './footer';

const App = () => (
    <div>
        <Background/>
        <div className="app home_page_body margin_bottom">
            <Nav/>
            <Header/>
            <Route exact path='/' component={AboutColumn}/>
            <Route exact path='/' component={Home}/>
            <Footer/>
        </div>
    </div>
);

export default App;
