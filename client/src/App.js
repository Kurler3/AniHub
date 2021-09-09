import './scss_styles/App.scss';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Homepage from './components/Homepage';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import AnimePage from './components/AnimePage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/anime/:id" component={AnimePage} />
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
