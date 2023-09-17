const initialVal={status:false};

const LoginStatus=(state=initialVal,action)=>{

    switch(action.type){
        case "isLoggedin":
            return{ ...state,
                 status:action.payload};
        default:
            return ({...state});
    }

}
export default LoginStatus; 