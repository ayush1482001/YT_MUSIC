const initialdata={
   albumId:''
}


const musicListReducer=(state=initialdata,action)=>{

    switch(action.type){
        case "albumID":
            return{ ...state,
                 albumId:action.payload};
        default:
            return ({...state});
    }

}
export default musicListReducer; 