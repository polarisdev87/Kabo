import { request } from "../utils";
import { endpointConstants } from "../constants";
import { alertActions } from "../actions";
// import { useDispatch } from "react-redux";

const getAccountData = () => {
  const requestOptions = request.options("GET", {}, true, false);

  return fetch(endpointConstants.GET_ACCOUNT_DATA, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const getSubscriptionData = () => {
  const requestOptions = request.options("GET", {}, true, false);

  return fetch(endpointConstants.GET_SUBSCRIPTION_DATA, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const getBreedData = () => {
  const requestOptions = request.options("GET", {}, true, false);

  return fetch(endpointConstants.GET_BREEDS, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const getRecipeData = () => {
  const requestOptions = request.options("GET", {}, true, false);

  return fetch(endpointConstants.GET_RECIPE_DATA, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const getOrderData = () => {
  const requestOptions = request.options("GET", {}, true, false);

  return fetch(endpointConstants.GET_ORDER_DATA, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const pauseSubscription = (data) => {
  const requestOptions = request.options(
    "POST",
    JSON.stringify({ dog_id: data.dogId, pause_until: data.pauseUntil }),
    true,
    true
  );

  return fetch(endpointConstants.PAUSE_SUBSCRIPTION, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const cancelSubscription = (userId) => {
  const requestOptions = request.options(
    "POST",
    JSON.stringify({ id: userId }),
    true,
    false
  );

  return fetch(endpointConstants.CANCEL_SUBSCRIPTION, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const updateDeliveryAddress = (data) => {
  const requestOptions = request.options(
    "PUT",
    JSON.stringify(data),
    true,
    true
  );

  return fetch(endpointConstants.UPDATE_DELIVERY_ADDRESS, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const updatePwd = (data) => {
  const requestOptions = request.options(
    "PUT",
    JSON.stringify({
      password: data.password,
      password_confirmation: data.password_confirmation,
    }),
    true,
    true
  );

  return fetch(endpointConstants.UPDATE_PASSWORD, requestOptions)
    .then(request.handleResponse)
    .then((res) => {
      // login successful if there's a jwt token in the response
      if (res.token) {
        // store user details and jwt token in local storage
        const oldUser = localStorage.getItem("user");
        const newUser = { ...oldUser };
        newUser.token = res.token;
        console.log("ewuser data after update pwd: ", newUser);
        localStorage.setItem("user", JSON.stringify(newUser));

        return {
          pwd_update_success: true,
          pwd_alert: "Successfully updated",
        };
      } else {
        return {
          pwd_update_success: false,
          pwd_alert: "Failed to update password",
        };
      }
    })
    .catch((ex) => {
      console.error(ex);
      return {
        pwd_update_success: false,
        pwd_alert:
          ex.message && ex.message.length > 0
            ? ex.message[0]
            : "Failed to update",
      };
    });
};

export const userService = {
  getAccountData,
  getRecipeData,
  getSubscriptionData,
  getOrderData,
  pauseSubscription,
  cancelSubscription,
  getSubscriptionData,
  getBreedData,
  updateDeliveryAddress,
  updatePwd,
};
