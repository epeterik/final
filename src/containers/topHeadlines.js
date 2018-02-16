//package imports
import React, { Component } from 'react';
import { connect } from "react-redux";

//css imports
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { getListOfTopHeadlines } from '../actions/actions';
import ArticleCard from './articleCard';

class TopHeadlines extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            showWaitSpinner: false
        }

        //bindings
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
        //this.retrieveTheTopHeadlines = this.retrieveTheTopHeadlines.bind(this);
    }

    handleWaitSpinner(displayTheWaitSpinner) {
        //console.log("Entering TopHeadlines.handleWaitSpinner - Bool Value is: ", displayTheWaitSpinner);
        this.setState({showWaitSpinner: displayTheWaitSpinner});
        //console.log("Leaving TopHeadlines.handleWaitSpinner");
    }

    handleError(errorEncountered) {
        //console.log("Entering TopHeadlines.handleError"); //debug
        
        //update error state if an error was encountered during the axios call
        this.setState({errorText: errorEncountered});
        
        //console.log("Leaving TopHeadlines.handleError"); //debug
    }

    componentDidMount() {
        console.log("TopHeadlines - componentDidMount");

        //lets make the call to get the top headlines
        this.props.retrieveTheTopHeadlines(this.handleWaitSpinner, this.handleError);
    }

    //For mapping retrieved article data to an article card for display
    mapMyHeadlineArticles(articleObject, arrayIndex) {
        return (
            <tr key={ "headlineArticleRow" + arrayIndex }>
                <td key={ "headlineArticleData" + arrayIndex }>
                    <ArticleCard articleData={ articleObject } articleIndex={ arrayIndex } key={ "headlineArticleCard" + arrayIndex } />
                </td>
            </tr>
        ); 
    }

    render() {
        //debug
        //console.log("TopHeadlines Props: ", this.props); //comenting out as this triggers on every keystroke

        return (
            <div>
                <h1 className="text-center">Top Headlines</h1>
                <div className="card padding-medium">
                    {this.state.showWaitSpinner ?
                        <div className="text-center">
                            <h3>Loading Top Headlines</h3>
                            <WaitSpinner />
                            <h4>Please be patient</h4>
                        </div>
                        :
                        this.state.errorText.trim() !== "" ?
                            <div>
                                <h3 className="text-center errorEncountered">Top Headline Data Not Found :(</h3>
                            </div>
                        :
                        <div>
                            <table className="table scrollable">
                                <tbody style={{height: "500px"}}>
                                    { this.props.topHeadlineArticles.map(this.mapMyHeadlineArticles) }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>

        ); //end return

    } //end render

} //end TopHeadlines

const mapStateToProps = (state) => {
    return {
       topHeadlineArticles: state.topHeadlinesList
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
                retrieveTheTopHeadlines: (waitCallback, errorCallBack) => {
                    dispatch(getListOfTopHeadlines(waitCallback, errorCallBack))
            }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(TopHeadlines);
