//package imports
import React, { Component } from 'react';
import { 
    BrowserRouter,
    Route
    } from 'react-router-dom';

//css imports
import './ui-toolkit/css/nm-cx/main.css';
import './css/custom.css';

//app imports
import { HeadingNavEntryWithToolTip } from './components/showActiveNavLinks';
import TopHeadlines from './containers/topHeadlines';
import SelectArticles from './containers/selectArticles';
import PersonalFeed from './containers/personalFeed';

class App extends Component {
  render() {
    return (
      <div className="bg-off-white padding-medium">
        <BrowserRouter>
          <div>
            {/*page header*/}
            <div className="row">
              {/*page title*/}
              <div className="small-6 columns">
                <h1 className="padding-bottom-medium">News Me!</h1>
              </div>
              {/*page links*/}
              <div className="small-6 columns text-right">
                <ul className="heading-nav padding-bottom-medium">
                  <HeadingNavEntryWithToolTip label="Home" to="/" activeOnlyWhenExact={true} toolTipText="Home" />
                  <HeadingNavEntryWithToolTip label="Customize" to="/categories" activeOnlyWhenExact={true} toolTipText="Customize" />
                  <HeadingNavEntryWithToolTip label="Personal Feed" to="/feed" activeOnlyWhenExact={true} toolTipText="Personal Feed" />
                </ul>
              </div>
            </div>
            <div className="row">
              &nbsp; {/* Spacer needed to more closely align with mockups */}
            </div>           
              <div className="row padding-horiz-medium">
                {/* This is where all of our content will be rendered */}
                  <div className="columns small-12 padding-vert-medium">    
                    <Route exact path="/" component={ TopHeadlines } />    
                    <Route exact path="/categories" component={ SelectArticles } />
                    <Route exact path="/feed" component={ PersonalFeed } />          
                  </div>
              </div>
            </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
