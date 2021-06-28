import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import NavBar from './NavBar'
import Routines from './Routines'
import Activities from './Activities'
import Register from './Register';
import Home from './Home'
import Login from './Login'
import NewRoutine from './NewRoutine'
import NewActivity from './NewActivity'
import MyRoutines from './MyRoutines'

const App = (props) => {

    const [currentUser, setCurrentUser] = useState('')
    const [navStatus, setNavStatus] = useState(false) 
    const [searchTerm, setSearchTerm] = useState('')


    return <div id ="app">
        <Router>
            <header>
                <div id="navs">
                    <div className='title'>Track . Fit</div>
                    <input type="text" 
                            id="search-bar" 
                            name="search-bar" 
                            placeholder="Search" 
                            onChange={(event) => {
                                setSearchTerm(event.target.value)}}></input>
                    <a className="hamburger" onClick={() => setNavStatus(!navStatus)} ><i className="material-icons">menu</i></a>
                    </div>
            </header>
            <main>
                <section id="lefty"></section>
                <section id="content-main">
                    <Route exact path='/Routines' render={() => <Home currentUser={currentUser} searchTerm={searchTerm}/>} />
                    <Route exact path='/Register' render={() => <Register currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
                    <Route exact path='/Routines' render={() => <Routines />} />
                    <Route exact path='/Activities' render={() => <Activities />} />
                    <Route exact path='/Login' render={() => <Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
                    <Route exact path='/NewRoutine' render={() => <NewRoutine currentUser={currentUser}/>} />
                    <Route exact path='/NewActivity' render={() => <NewActivity currentUser={currentUser}/>} />
                    <Route exact path='/MyRoutines' render={() => <MyRoutines currentUser={currentUser}/>} />

                </section>
                <section id="sidenav">
                    
                    {navStatus ? <NavBar 
                                        currentUser={currentUser} 
                                        setCurrentUser={setCurrentUser}/> : ''}
                

                </section>
                
            </main>
        </Router>
    </div>
    
}

export default App;
