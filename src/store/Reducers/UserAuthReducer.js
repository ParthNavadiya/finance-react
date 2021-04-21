import { ACTION_TYPE } from "../Actions/UserAuthActions";

const initialState = {
  userInfo: {},
};

const UserAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.ACTION_USER_LOGIN:
      return {
        ...state,
        userInfo: action.userInfo,
        isRoleAdmin: action.userRole,
      };
    default:
      return state;
  }
};

export default UserAuthReducer;
