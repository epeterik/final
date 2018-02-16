import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//package imports
import { connect } from "react-redux";

//App Imports
import { WaitSpinner } from '../components/waitSpinner';

class ArticleCard extends Component {
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
        //console.log("Entering ArticleCard.handleWaitSpinner - Bool Value is: ", displayTheWaitSpinner);
        this.setState({showWaitSpinner: displayTheWaitSpinner});
        //console.log("Leaving ArticleCard.handleWaitSpinner");
    }

    handleError(errorEncountered) {
        //console.log("Entering ArticleCard.handleError"); //debug
        
        //update error state if an error was encountered during the axios call
        this.setState({errorText: errorEncountered});
        
        //console.log("Leaving ArticleCard.handleError"); //debug
    }


    render() {
        //debug
        //console.log("Article Card Props: ", this.props); 

        //store local value for less overall typing
        let localArticleObject = this.props.articleData; 
        let localArticleIndex = this.props.articleIndex;

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
                            <div className="small-9 columns tableDiv">
                                <div className="row">
                                    <div className="small-12 columns">
                                        <div className="row">
                                            <div className="small-6 columns text-left">
                                                <a href={localArticleObject.url} target="_blank"><h3>{ localArticleObject.title }</h3></a>
                                            </div>
                                            <div className="small-3 columns text-center">
                                                { /* localArticleObject.publishedAt */ }
                                            </div>
                                            <div className="small-3 columns text-right">
                                                { localArticleObject.author }
                                            </div>
                                        </div>
                                        <div className="row">
                                            &nbsp;
                                        </div>
                                        <div className="row">
                                            <div className="small-12 columns">
                                                { localArticleObject.description }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

        ); //end return

    } //end render

} //end ArticleCard

const mapStateToProps = (state) => {
    return {
       // stubbing in, in case we need this in the future (working through final sequentially)
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
          // stubbing in, in case we need this in the future (working through final sequentially)
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ArticleCard);