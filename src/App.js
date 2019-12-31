import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import VmOg from './VmOg';
import VmKj from './VmKj';
import VmRs from './VmRs';
import { DropdownList } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => (
    <div className = "UkrainianOgienko"> <VmOg /></div>
)

const KingJames = () => (
    <div className = "KingJames"> <VmKj /> </div>
)

const UkrainianOgienko = () => (
    <div className = "UkrainianOgienko"> <VmOg /></div>
)

const RussianSynodal = () => (
    <div className ="RussianSynodal"> <VmRs /></div>
)



class App extends Component {

    render() {
        return (
      <Router>
       <div className="">
         <nav className="navbar-expand-md bg-dark navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item"><Link to="/" className="nav-link"></Link></li>
            <li className="nav-item"><Link to="/kingjames" className="nav-link">King James</Link></li>
            <li className="nav-item"><Link to="/ukrainiaogienko" className="nav-link">Ukrainian Ogienko</Link></li>
            <li className="nav-item"><Link to="/russiansynodal" className="nav-link">Russian Synodal</Link></li>
          </ul>
         </nav>
         <Switch>
             <Route exact path="/" component={Home}/>
             <Route path="/kingjames" component={KingJames}/>
             <Route path="/ukrainiaogienko" component={UkrainianOgienko}/>
             <Route path="/russiansynodal" component={RussianSynodal}/>
         </Switch>
        </div>
      </Router>

        )
    }
}

export default App;


