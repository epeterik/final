//package imports
import axios from 'axios';

//app imports
import { UPDATE_TOP_HEADLINES,
         UPDATE_SUBSCRIBED_HEADLINES,
         UPDATE_CATEGORIZED_HEADLINES,
         SET_SELECTED_ARTICLE_CATEGORY } from './types';

export function updateTopNewsHeadlines(topNewsHeadlines) {
    return {
        type: UPDATE_TOP_HEADLINES,
        payload: topNewsHeadlines
    }
}

export function updateSubscribedHeadlines(subscribedNewsArticles) {
    return {
        type: UPDATE_SUBSCRIBED_HEADLINES,
        payload: subscribedNewsArticles
    }
}

export function updateCategorizedHeadlines(categorizedNewsArticles) {
    return {
        type: UPDATE_CATEGORIZED_HEADLINES,
        payload: categorizedNewsArticles
    }
}

export function setSelectedCategory(userSelectedCategory) {
    return {
        type: SET_SELECTED_ARTICLE_CATEGORY,
        payload: userSelectedCategory
    }
}

//NewsAPI Calls: 
//-Get Headlines (GET)
//-Get Categorized (GET)

export function getListOfTopHeadlines (waitFlag, errorFunction)
{
    console.log("Entering getListOfTopHeadlines");

    //newsAPI key and endPoint
    //  NewsAPI Top Headlines Documentation: https://newsapi.org/docs/endpoints/top-headlines 
    let newsAPIKey = "8066e706ff884f1f80b9eb8fc5702c7f";
    let newsAPIEndpoint = "https://newsapi.org/v2/top-headlines"; 
    //construct API path with params - using US headlines as assignment doesn't specify
    let newsAPIPath = newsAPIEndpoint + "?country=us&apiKey=" + newsAPIKey;

    console.log("getListOfTopHeadlines Endpoint: " + newsAPIPath); //debug

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //lets get that list of articles!
        axios.get(newsAPIPath)
            .then((response) => {
                //Success!! :)
                console.log("getListOfTopHeadlines - response: ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //Update store with returned data
                dispatch(updateTopNewsHeadlines(response.data.articles));

            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to getListOfTopHeadlines :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error getting list of Top Headlines from NewsAPI , Try Again'));
            })

    } //end return

} //end of getListOfTopHeadlines

export function getCategorizedListOfArticles (category, waitFlag, errorFunction)
{
    console.log("Entering getCategorizedListOfArticles");

    //newsAPI key and endPoint
    //  NewsAPI Top Headlines Documentation: https://newsapi.org/docs/endpoints/top-headlines 
    let newsAPIKey = "8066e706ff884f1f80b9eb8fc5702c7f";
    let newsAPIEndpoint = "https://newsapi.org/v2/top-headlines"; 
    //construct API path with params - using US headlines as assignment doesn't specify
    let newsAPIPath = newsAPIEndpoint + "?country=us&category=" + category + "&apiKey=" + newsAPIKey;

    console.log("getCategorizedListOfArticles Endpoint: " + newsAPIPath); //debug

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //lets get that categorized list of articles!
        axios.get(newsAPIPath)
            .then((response) => {
                //Success!! :)
                console.log("getCategorizedListOfArticles - response: ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //Update store with returned data
                dispatch(updateCategorizedHeadlines(response.data.articles));

            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to getCategorizedListOfArticles :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error getting list of Top Headlines from NewsAPI , Try Again'));
            })

    } //end return

} //end of getCategorizedListOfArticles

//MockAPI calls: 
//- Add (POST) - send entire article object as there does not appear to be a way to get just a specific article
//- Get (GET) - subscribed articles (based on sent articel objects)
 
export function setSubscribedArticle (articleObject, waitFlag, errorFunction)
{
    console.log("Entering setSubscribedArticle");

    //set endpoint: 
    let mockAPIPath = "http://5a871dd1492dc500121b88e1.mockapi.io/subscribedArticles/"

    console.log("setSubscribedArticle Endpoint: " + mockAPIPath); //debug

    //create object to send to MockAPI: 
    let localSubscribeArticleObject = {
        name: articleObject.title,
        articleObject: articleObject
    }

    console.log(localSubscribeArticleObject); //debug

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //send the article data to MockAPI for storage
        axios.post(mockAPIPath, localSubscribeArticleObject)
            .then((response) => {
                //Success!! :)
                console.log("setSubscribedArticle - response: ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //Fetch latest list of subscribed articles after adding
                dispatch(getSubscribedArticlesList (waitFlag, errorFunction));

            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to setSubscribedArticle :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error storing article to subscribe to at MockAPI, Try Again'));
            })

    } //end return

} //end of setSubscribedArticle

export function getSubscribedArticlesList (waitFlag, errorFunction)
{
    console.log("Entering getSubscribedArticlesList");

    //set endpoint: 
    let mockAPIPath = "http://5a871dd1492dc500121b88e1.mockapi.io/subscribedArticles/"

    console.log("getSubscribedArticlesList Endpoint: " + mockAPIPath); //debug

    return (dispatch) => {
        //set state var to turn on the loading/wait spinner
        dispatch(() => waitFlag(true));

        //send the article data to MockAPI for storage
        axios.get(mockAPIPath)
            .then((response) => {
                //Success!! :)
                console.log("getSubscribedArticlesList - response: ", response);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //Update store with returned data
                dispatch(updateSubscribedHeadlines(response.data));

            })
            .catch((error) => {
                //Failure!
                console.log("FAILED to getSubscribedArticlesList :( - error: ", error);

                //set state var to turn off wait spinner
                dispatch(() => waitFlag(false));

                //update state indicating error
                //display encountered error
                dispatch(() => errorFunction('Error getting subscribed article list from MockAPI, Try Again'));
            })

    } //end return

} //end of getSubscribedArticlesList