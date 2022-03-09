import { ActionTypes } from "../contants/action-types";

const initialState = {
login:null
};




 export const Authtentication=(state=initialState,action)=>{
  const {type,payload}=action
  console.log(payload,'payload')
  switch (type) {
    case ActionTypes.LOGIN:
      return { ...state,
         token: payload.token,
        isAuthenticated: true,
        user: payload.user,
        status: 'in'
      };
    case ActionTypes.REGISTER:
      return { ...state,
        token: payload.token,
        isAuthenticated: true,
        user: payload.user,
        status: 'in'
      };
  
    default:
      return state;
  }
 }
