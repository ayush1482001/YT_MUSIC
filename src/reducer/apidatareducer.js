const initialdata={
    apiInitialdata:[],
}

const apidataReducer=(state=initialdata,action)=>{

    switch(action.type){
        case "apidata:fulldata":
            return{ ...state,
                 apiInitialdata:action.payload};
        default:
            return ({...state});
    }

}
export default apidataReducer; 