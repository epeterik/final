//package imports
import React, { Component } from 'react';
import { connect } from "react-redux";

//css imports
import '../ui-toolkit/css/nm-cx/main.css';
import '../css/custom.css';

//App Imports
import { WaitSpinner } from '../components/waitSpinner';
import { getCategorizedListOfArticles,
         setSelectedCategory,
         getSubscribedArticlesList } from '../actions/actions';
import SubscribeArticleCard from './subscribeArticleCard';

class SelectArticles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            showWaitSpinner: false,
            category: ""
        }

        //bindings
        this.handleWaitSpinner = this.handleWaitSpinner.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleNewsCategoryChange = this.handleNewsCategoryChange.bind(this);
    }

    handleWaitSpinner(displayTheWaitSpinner) {
        //console.log("Entering SelectArticles.handleWaitSpinner - Bool Value is: ", displayTheWaitSpinner);
        this.setState({showWaitSpinner: displayTheWaitSpinner});
        //console.log("Leaving SelectArticles.handleWaitSpinner");
    }

    handleError(errorEncountered) {
        //console.log("Entering SelectArticles.handleError"); //debug
        
        //update error state if an error was encountered during the axios call
        this.setState({errorText: errorEncountered});
        
        //console.log("Leaving SelectArticles.handleError"); //debug
    }

    componentDidMount() {
        console.log("SelectArticles - componentDidMount");

        //set default selected category value - esp useful if user navigates back during same session
        document.getElementById(this.props.selectedArticleCategory).checked = true;

        //get list of subscribed to articles for proper rendering of the Subscribe/d button on the cards
        this.props.getSubscribedArticlesList(this.handleWaitSpinner, this.handleError);

        //get relevant category articles
        this.props.retrieveCategoryArticles(this.props.selectedArticleCategory, this.handleWaitSpinner, this.handleError)
    }

    //For mapping retrieved article data to an article card that allows for subscribing to an article
    mapMyCategorizedArticles(articleObject, arrayIndex) {
        return (
            <tr key={ "categorizedArticleRow" + arrayIndex }>
                <td key={ "categorizedArticleData" + arrayIndex }>
                    <SubscribeArticleCard articleData={ articleObject } articleIndex={ arrayIndex } key={ "categorizedArticleCard" + arrayIndex } />
                </td>
            </tr>
        ); 
    }

    handleNewsCategoryChange(event) {
        console.log("Entering handleNewsCategoryChange"); //debug

        //get value
        let localSelectedCategory = event.target.value;
        console.log(localSelectedCategory); //debug

        //update store state
        this.props.setSelectedCategory(localSelectedCategory);

        //get new article category data (or refresh what we already have...)
        this.props.retrieveCategoryArticles(localSelectedCategory, this.handleWaitSpinner, this.handleError);

        console.log("Leaving handleNewsCategoryChange"); //debug
    }

    render() {
        //debug
        //console.log("SelectArticles Props: ", this.props); //comenting out as this triggers on every keystroke

        return (
            <div>
                <h1 className="text-center">Select Your Sources!</h1>
                <div className="md-multi-ctrl-field text-center">
                    <input name="articleCategory" id="business" type="radio" value="business" onClick={this.handleNewsCategoryChange} />
                    <label htmlFor="businessArticleRadio">Business</label>
                    <input name="articleCategory" id="technology" type="radio" value="technology" onClick={this.handleNewsCategoryChange} />
                    <label htmlFor="technologyArticlesRadio">Technology</label>
                    <input name="articleCategory" id="science" type="radio" value="science" onClick={this.handleNewsCategoryChange} />
                    <label htmlFor="scienceArticlesRadio">Science</label>
                    <input name="articleCategory" id="health" type="radio" value="health" onClick={this.handleNewsCategoryChange} />
                    <label htmlFor="scienceArticlesRadio">Health</label>
                </div>
                <div className="card padding-medium">
                    {this.state.showWaitSpinner ?
                        <div className="text-center">
                            <h3>Loading Article Categories</h3>
                            <WaitSpinner />
                            <h4>Please be patient</h4>
                        </div>
                        :
                        this.state.errorText.trim() !== "" ?
                            <div>
                                <h3 className="text-center errorEncountered">Article Category Data Not Found :(</h3>
                            </div>
                        :
                        this.props.categorizedArticles.length === 0 ?
                        <div className="text-center">
                            <h3>Select an article category from above to get articles.</h3>
                        </div>
                        :
                        <div>
                            <table className="table scrollable">
                                <tbody style={{height: "500px"}}>
                                    { this.props.categorizedArticles.map(this.mapMyCategorizedArticles) }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        

        ); //end return

    } //end render

} //end SelectArticles

const mapStateToProps = (state) => {
    return {
        categorizedArticles: state.categorizedHeadlinesList,
        selectedArticleCategory: state.selectedArticleCategory
    };
  };
  
const mapDispatchToProps = (dispatch) => {
      return {
                retrieveCategoryArticles: (articleCategory, waitCallback, errorCallBack) => {
                    dispatch(getCategorizedListOfArticles(articleCategory, waitCallback, errorCallBack))
            },
                setSelectedCategory: (selectedCategory) => {
                    dispatch(setSelectedCategory (selectedCategory))
            },
                getSubscribedArticlesList: (waitCallback, errorCallBack) => {
                    dispatch(getSubscribedArticlesList(waitCallback, errorCallBack));
            }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SelectArticles);
