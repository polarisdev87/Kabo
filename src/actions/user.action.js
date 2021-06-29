import { userConstants } from "../constants";

const getAccountData = () => ({ type: userConstants.ACCOUNT_DATA_REQUESTED });

const getRecipeData = () => ({ type: userConstants.RECIPE_DATA_REQUESTED });

const getSubscriptionData = () => ({
  type: userConstants.SUBSCRIPTION_DATA_REQUESTED,
});

const getBreedData = () => ({ type: userConstants.BREED_DATA_REQUESTED });
const getOrderData = (data) => ({
  type: userConstants.ORDER_DATA_LOADED,
  payload: data,
});

const pauseSubscription = (data) => ({
  type: userConstants.PAUSE_SUBSCRIPTION_REQUESTED,
  payload: data,
});

const cancelSubscription = (userID) => ({
  type: userConstants.CANCEL_SUBSCRIPTION_REQUESTED,
  payload: userID,
});

const updateDeliveryAddress = (data) => ({
  type: userConstants.DELIVERY_UPDATE_REQUESTED,
  payload: data,
});

const updatePwd = (data) => ({
  type: userConstants.UPDATE_PWD_REQUESTED,
  payload: data,
});

const clearPwdUpdateAlert = () => ({
  type: userConstants.UPDATE_PWD_ALERT_CLEAR,
});

export const userActions = {
  getAccountData,
  pauseSubscription,
  cancelSubscription,
  getRecipeData,
  getSubscriptionData,
  getBreedData,
  getOrderData,
  updateDeliveryAddress,
  updatePwd,
  clearPwdUpdateAlert,
};
