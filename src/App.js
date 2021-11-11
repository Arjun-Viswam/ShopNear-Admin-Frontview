import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './Pages/Login';
import Home from './Pages/Home';

function App() {
  return (
  <Router>
    <Switch>
      <Route exact path='/admin' component={Home}>
      </Route>
      <Route path='/admin/login' component={Login}>
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
