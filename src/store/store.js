import { configureStore } from "@reduxjs/toolkit";
import apidataReducer from "../reducer/apidatareducer";
import musicListReducer from "../reducer/musiclist";
import loginReducer from "../reducer/LoginStatus";

const combineReducer={
  apidata :apidataReducer,
  albumID:musicListReducer,
  isLogged:loginReducer
}


const store = configureStore({
  reducer: combineReducer,
});
// store.subscribe(()=>console.log("hello success",store.getState()));
  
  export default store;