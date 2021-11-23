import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './Pages/Login';
import Home from './Pages/Home';
import ShopManagement from './Pages/ShopManagement';
import userManager from './Pages/UserManager';

function App() {
  return (
  <Router>
    <Switch>
      <Route exact path='/admin' component={Home}>
      </Route>
      <Route path='/admin/login' component={Login}>
      </Route>
      <Route path='/admin/Shop_Management' component={ShopManagement}>
      </Route>
      <Route path='/admin/User_Management' component={userManager}>
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
