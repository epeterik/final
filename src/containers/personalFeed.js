//package imports
import React, { Component } from 'react';
import { connect } from "react-redux";

//css imports
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { getSubscribedArticlesList } from '../actions/actions';
import ArticleCard from './articleCard';

class PersonalFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            showWaitSpinner: false
        }

        //bindings
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleWaitSpinner(displayTheWaitSpinner) {
        //console.log("Entering PersonalFeed.handleWaitSpinner - Bool Value is: ", displayTheWaitSpinner);
        this.setState({showWaitSpinner: displayTheWaitSpinner});
        //console.log("Leaving PersonalFeed.handleWaitSpinner");
    }

    handleError(errorEncountered) {
        //console.log("Entering PersonalFeed.handleError"); //debug
        
        //update error state if an error was encountered during the axios call
        this.setState({errorText: errorEncountered});
        
        //console.log("Leaving PersonalFeed.handleError"); //debug
    }

    componentDidMount() {
        console.log("PersonalFeed - componentDidMount");

        //get list of subscribed to articles
        this.props.getSubscribedArticlesList(this.handleWaitSpinner, this.handleError);
    }

    //For mapping retrieved article data to an article card for display
    mapMySubscribedArticles(subscribedArticleObject, arrayIndex) {
        //parse out the tracked/subscribed article data for easier coding
        let localArticleObject = subscribedArticleObject.articleObject;

        return (
            <tr key={ "subscribedArticleRow" + arrayIndex }>
                <td key={ "subscribedArticleData" + arrayIndex }>
                    <ArticleCard articleData={ localArticleObject } articleIndex={ arrayIndex } key={ "subscribedArticleCard" + arrayIndex } />
                </td>
            </tr>
        ); 
    }

    render() {
        //debug
        //console.log("PersonalFeed Props: ", this.props);

        return (
            <div>
                {this.state.showWaitSpinner ?
                    <div className="text-center">
                        <h3>Loading Articles From Your Personal Feed</h3>
                        <WaitSpinner />
                        <h4>Please be patient</h4>
                    </div>
                    :
                    this.state.errorText.trim() !== "" ?
                        <div>
                            <h3 className="text-center errorEncountered">Personal Feed Data Not Found :(</h3>
                        </div>
                    :
                    <div>
                        <h1 className="text-center">Personal Feed</h1>
                        <div className="card padding-medium">
                            { this.props.listOfSubscribedArticles.length === 0 ?
                                <div className="text-center">
                                    <h3>You have not subscribed to any articles yet.</h3>
                                    <p>You can subscribe to articles by going to the customize page.</p>
                                </div>
                            :
                                <table className="table scrollable">
                                    <tbody style={{height: "500px"}}>
                                        { this.props.listOfSubscribedArticles.map(this.mapMySubscribedArticles) }
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                }
            </div>

        ); //end return

    } //end render

} //end PersonalFeed

const mapStateToProps = (state) => {
    return {
        listOfSubscribedArticles: state.subscribedArticlesList
    };
  };
  
const mapDispatchToProps = (dispatch) => {
      return {
                getSubscribedArticlesList: (waitCallback, errorCallBack) => {
                    dispatch(getSubscribedArticlesList(waitCallback, errorCallBack));
            }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PersonalFeed);
