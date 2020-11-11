import React from 'react';

import { Route, Switch } from "react-router-dom";

import AddItem from './components/pages/AddItem';
import Home from './components/pages/Home';
import Items from './components/pages/Items';
import Navbar from './components/ui/Navbar';
import firebase, { FirebaseContext } from './firebase';

const App = () => {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <div className="md:flex max-h-screen">

        <Navbar />
        <div className="md:w-4/6 xl:w-5/6 p-4  overflow-y-hidden">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/add-item">
              <AddItem />
            </Route>
            <Route path="/items">
              <Items />
            </Route>
          </Switch>

        </div>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;