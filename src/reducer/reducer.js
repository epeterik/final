//app imports
import { UPDATE_TOP_HEADLINES,
         UPDATE_SUBSCRIBED_HEADLINES,
         UPDATE_CATEGORIZED_HEADLINES,
         SET_SELECTED_ARTICLE_CATEGORY } from '../actions/types';

export const reducer = (state, action) => {

    console.log("Entering Reducer");

    switch (action.type) {
        case UPDATE_TOP_HEADLINES: 
            console.log("reducer - UPDATE_TOP_HEADLINES");
            state = {...state, 
                     topHeadlinesList: action.payload};
            return state; 
        case UPDATE_SUBSCRIBED_HEADLINES: 
            console.log("reducer - UPDATE_SUBSCRIBED_HEADLINES");
            state = {...state, 
                     subscribedArticlesList: action.payload};
            return state; 
        case UPDATE_CATEGORIZED_HEADLINES: 
            console.log("reducer - UPDATE_CATEGORIZED_HEADLINES");
            state = {...state, 
                     categorizedHeadlinesList: action.payload};
            return state; 
        case SET_SELECTED_ARTICLE_CATEGORY: 
            console.log("reducer - SET_SELECTED_ARTICLE_CATEGORY");
            state = {...state, 
                     selectedArticleCategory: action.payload};
            return state;   
        default: //if no case is caught, return the current unmodified state
            console.log("reducer - default");
            return state; 

    } //end switch

} //end of reducer

//only exporting one element as the default element
export default reducer;