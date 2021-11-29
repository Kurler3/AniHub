import './scss_styles/App.scss';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Homepage from './components/Homepage';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import AnimePage from './components/AnimePage';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm';
import MyList from './components/MyList';
import Media from './components/Media';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import Community from './components/Community';
import SearchCommunities from './components/SearchCommunities';
import CommunityMembers from './components/CommunityMembers';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/auth" component={AuthForm}/>
        <Route exact path="/anime/:id" component={AnimePage} />
        <Route exact path="/media" component={Media} />
        <Route exact path="/list" component={MyList} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/media/submit/:communityName?" component={CreatePost} />
        <Route exact path="/media/:communityName" component={Community} />
        <Route exact path="/communities/:defaultSearchInput?" component={SearchCommunities} />
        <Route exact path="/members/:communityName" component={CommunityMembers} />
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
