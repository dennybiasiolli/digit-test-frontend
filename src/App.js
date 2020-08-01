import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import './App.css';


export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/">
                <Counter />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
};
