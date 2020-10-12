const INITIAL_STATE = {
    dataContact:{}
}

const contactReducer = (state = INITIAL_STATE, action)=>{
    // console.log("di redux ",action.payLoad.dataContact);
    switch(action.type){
        case'SET_CURRENT_CONTACT':
        return{
            ...state,
            dataContact:action.payLoad.dataContact
        }
        default:
            return state;
    }
    
}

export default contactReducer;