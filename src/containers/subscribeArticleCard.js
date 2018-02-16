import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//package imports
import { connect } from "react-redux";

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { setSubscribedArticle } from '../actions/actions';

class SubscribeArticleCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            showWaitSpinner: false
        }

        //bindings
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleArticleSubscribe = this.handleArticleSubscribe.bind(this);
        this.subscribedArticleFind = this.subscribedArticleFind.bind(this);
    }

    handleWaitSpinner(displayTheWaitSpinner) {
        //console.log("Entering SubscribeArticleCard.handleWaitSpinner - Bool Value is: ", displayTheWaitSpinner);
        this.setState({showWaitSpinner: displayTheWaitSpinner});
        //console.log("Leaving SubscribeArticleCard.handleWaitSpinner");
    }

    handleError(errorEncountered) {
        //console.log("Entering SubscribeArticleCard.handleError"); //debug
        
        //update error state if an error was encountered during the axios call
        this.setState({errorText: errorEncountered});
        
        //console.log("Leaving SubscribeArticleCard.handleError"); //debug
    }

    handleArticleSubscribe(articleObject) {
        console.log("Entering handleArticleSubscribe");
        //Make call to add the article to our subscribed articles repository
        this.props.subscribeToArticle(articleObject, this.handleWaitSpinner, this.handleError);
        console.log("Leaving handleArticleSubscribe");
    }

    subscribedArticleFind(articleDataObject) {
        //console.log("Entering subscribedArticleFind");
        //console.log(articleDataObject.name); //debug
        //console.log(this.props.articleData.title); //debug

        //check if this is a subscribed to article
        return articleDataObject.name === this.props.articleData.title ? true : false;
    }

    render() {
        //debug
        //console.log("Subscribable Article Card Props: ", this.props); 

        //store local value for less overall typing
        let localArticleObject = this.props.articleData; 
        let localArticleIndex = this.props.articleIndex;

        //lets check if this is a tracked article
        let articleTrackedIfFound;
        articleTrackedIfFound = this.props.listOfSubscribedArticles.find(this.subscribedArticleFind);
        console.log("subscribed article value: ", articleTrackedIfFound); //debug

        return (
            
            <div className="card padding-medium" key={"articleCard" + localArticleIndex} id={"articleCard" + localArticleIndex} >
                {this.state.showWaitSpinner ?
                    <div className="text-center">
                        <h3>Updating Article Subscribed Status</h3>
                        <WaitSpinner />
                        <h4>Please be patient</h4>
                    </div>
                    :
                    <div> 
                        <div className="row">
                            <div className="small-3 columns tableDiv">
                                <img alt={localArticleObject.name + " picture"} src={localArticleObject.urlToImage} height="150" width="255" border="1"/>
                            </div>
                            <div className="small-7 columns tableDiv">
                                <div className="row">
                                    <div className="small-12 columns">
                                        <div className="row text-center">
                                            <a href={localArticleObject.url} target="_blank"><h3>{ localArticleObject.title }</h3></a>
                                        </div>
                                        <div className="row">
                                            &nbsp;
                                        </div>
                                        <div className="row">
                                            { localArticleObject.description }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="small-2 columns text-center">
                                {/* alternate render prevents user from overriding the disabled status in the browser and refiring the button action */}
                                {articleTrackedIfFound === undefined ?
                                    <button className="button btn-cta small" onClick={() => this.handleArticleSubscribe(localArticleObject)}>Subscribe</button>
                                    :
                                    
                                    <button className="button btn-cta warning small" disabled={true}>Subscribed</button>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>

        ); //end return

    } //end render

} //end SubscribeArticleCard

const mapStateToProps = (state) => {
    return {
       listOfSubscribedArticles: state.subscribedArticlesList
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
            subscribeToArticle: (articleData, waitFlag, errorFunction) => {
                dispatch(setSubscribedArticle (articleData, waitFlag, errorFunction))
            }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SubscribeArticleCard);