import { userConstants, otherConstants } from '../constants';

const initialState = {
  subscriptions: [],
  dogs: [],
  recipes: [],
  orders: [],
  error: false,
  loading: true,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.ACCOUNT_DATA_LOADED:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.RECIPE_DATA_LOADED:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.BREED_DATA_LOADED:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.SUBSCRIPTION_DATA_LOADED:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.ORDER_DATA_LOADED:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.PAUSE_SUBSCRIPTION_REQUESTED:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case userConstants.PAUSE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case otherConstants.REQUEST_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload,
      };
    case userConstants.UPDATE_PWD_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.UPDATE_PWD_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.UPDATE_PWD_ALERT_CLEAR:
      return {
        ...state,
        pwd_update_success: " ",
        pwd_alert: " ",
      };
    default:
      return state;
  }
};
