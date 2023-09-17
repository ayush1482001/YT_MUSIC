const intialdata={
    fp_routeVal:'',
}

const mainRouteReducer=(state=intialdata,action)=>{

    switch(action.type){
        case "fp_routeVal":
            return{ ...state,
                 fp_routeVal:action.payload};
        default:
            return ({...state});
    }

}
export default mainRouteReducer; 