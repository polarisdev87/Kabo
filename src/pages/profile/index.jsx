/* eslint-disable semi */
import React from "react";
import { connect } from "react-redux";
import { ReactComponent as Arrow } from "../../assets/images/Vectorarrow.svg";
import LoadingCircle from "../../components/partials/loading.jsx";
import { userActions } from "../../actions";

import { AccountDetails } from "../../components/profile/account-details.jsx";
import { Billing } from "../../components/profile/billing.jsx";
import { DeliveryAddress } from "../../components/profile/delivery-address.jsx";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextExpanded: false,
      mealExpanded: false,
      frequencyExpanded: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal(name) {
    this.setState({
      [name]: !this.state[name],
    });
  }

  componentDidMount() {
    this.props.getAccountData();
    this.props.getSubscriptionData();
    this.props.getBreedData();
  }

  render() {
    if (!this.props.dogs.length || !this.props.user.shipping_address)
      return <LoadingCircle />;
    const { user, subscriptions, dogs } = this.props;

    const detailsCard =
      "container pb-4 mb-4 bg-white shadow-2xl p-4 md:m-6 rounded-xl flex-initial inline-block w-accountdetail-card";
    return (
      <div className="flex flex-wrap py-x">
        <div className={detailsCard}>
          <AccountDetails user={user} dogs={dogs} />
        </div>
        <div className={detailsCard}>
          <Billing />
        </div>
        <div className={detailsCard}>
          <DeliveryAddress
            user={user}
            deliveryAddress={user.shipping_address}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAccountData: () => dispatch(userActions.getAccountData()),
  getSubscriptionData: () => dispatch(userActions.getSubscriptionData()),
  getBreedData: () => dispatch(userActions.getBreedData()),
});

const mapStateToProps = (state) => {
  const { user } = state;
  const { subscriptions, dogs } = state.user;
  return {
    user,
    subscriptions,
    dogs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
