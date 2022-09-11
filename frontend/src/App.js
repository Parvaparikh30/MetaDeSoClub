import React from 'react';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Trending } from './components/trending/Trending';
import { GlobalProvider } from './context/GlobalState';
import { Status } from './pages/Status';
import { Login } from './pages/Login'
import ScrollToTop from './utils/ScrollToTop';
import { Profile } from './pages/Profile';
import { AddressProvider } from './context/AddressContext';
import { Whitelist } from './pages/Whitelist'
import { CCProvider } from './context/CC';
import { Welcome } from './pages/Welcome'
function App() {
  console.log(useLocation)
  console.log(window.location.pathname)

  // const render = () => {
  //   if (window.location.pathname == '/login') {
  //     return (
  //       <Route path="/login" component={Login} />
  //     )
  //   }
  //   else {

  //   }


  // }
  return (
    <GlobalProvider >
      <AddressProvider>
        <CCProvider>
          <Router >


            <ScrollToTop>
              <div className="App">
                <div className="side-nav">
                  <Sidebar />
                </div>
                <div className="main">
                  <Route exact path='/' component={Welcome} />
                  <Route exact path="/home" component={Home} />
                  <Route path="/signup" component={Login} />

                  <Route path="/kyc" component={Whitelist} />

                </div>

                <div className="trending">
                  <Trending />
                </div>
              </div>
            </ScrollToTop>

          </Router>
        </CCProvider>
      </AddressProvider>
    </GlobalProvider>
  );
}

export default App;
