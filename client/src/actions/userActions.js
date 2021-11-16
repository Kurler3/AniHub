import * as api from "../api/";
import { SUB_UNSUB_COMMUNITIES } from "../utils/action_constants";


export const subUnSubCommunity = (userId, communityTitle, isUnSub) => async (dispatch) => {
    try {
        const {data} = await api.subUnSubCommunity(userId, communityTitle, isUnSub);

        // data is new subscribed community array 
        dispatch({type:SUB_UNSUB_COMMUNITIES, payload:data});
    } catch (error) {
        console.log(error);
    }
}

// export const getUserInfo = (id) => async (dispatch) => {
//     try {
        
//         const {data} = await api.getUserInfo(id);

//         console.log(data);
        
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }

