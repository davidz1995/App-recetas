import './App.css';
import { Route } from 'react-router';
import Landing  from './components/actionComponents/Landing';
import Panel from './components/presentationComponents/Panel';
import GetUsers from './components/actionComponents/GetUsers';
import Products from './components/actionComponents/Products';
import Orders from './components/actionComponents/Orders'
import Ingredients from './components/actionComponents/Ingredients';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  return (
    <div className="App">
      <Route path='/' exact component = {Landing}/>
      <Route path='/panel' exact component = {Panel}/>
      <Route path='/users' exact component = {GetUsers}/>
      <Route path='/products' exact component = {Products}/>
      <Route path='/orders' exact component = {Orders}/>
      <Route path='/ingredients' exact component = {Ingredients}/>
    </div>
  );
}

export default App;
