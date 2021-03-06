import { userConstants } from '../constants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? {
      loggedIn: true,
      user,
      error: false,
      errorMessage: '',
    }
  : {};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        error: false,
        errorMessage: '',
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    case userConstants.LOGOUT:
      localStorage.removeItem('user');
      return {};
    default:
      return state;
  }
};
