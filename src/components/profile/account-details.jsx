import React from "react";

import Input from "../global/input.jsx";
import Button from "../global/button.jsx";
import Dropdown from "../global/dropdown.jsx";

import addIcon from "../../assets/images/add_icon.svg";
import LoadingCircle from "../partials/loading.jsx";
import PwdModal from "./pwd-modal";

const AccountDetails = ({ user = null, dogs = null }) => {
  const dog = dogs[0];
  var dogBirthday = parseDogAge(dog);
  const flatBreeds = user.breeds;
  const [showUpdatePwdModal, setShowUpdatePwdModal] = React.useState(false);
  return (
    <div>
      <div className='flex-auto text-2xl font-cooper mb-3 md:mb-6'>
        Account Details
      </div>
      <Input
        inputValue={user.user.email}
        name='EMAIL ADDRESS'
        size='md:w-2/5 w-full mb-2'
        styles='mr-2.5'
      />
      <Input
        inputValue={user.shipping_address && user.shipping_address.phone}
        name='PHONE NUMBER'
        size='w-full md:w-2/5'
      />
      <Button
        text='Update My Password'
        styles='my-6'
        onClick={() => {
          setShowUpdatePwdModal(true);
        }}
      />
      <div className='flex-auto text-lg font-semibold mb-2'>Dog Details</div>
      <div className='flex md:flex-row flex-col'>
        <Input
          name='DOG NAME'
          disabled
          size='w-full md:w-2/5 mb-2'
          styles='md:mr-2.5'
          inputValue={dog.name}
        />
        <Input
          name='DOG TYPE'
          disabled
          styles='w-full md:w-2/5 mb-2'
          inputValue={dog.breed}
        />
      </div>
      <div className='flex-auto text-xs font-semibold '>DATE OF BIRTH</div>
      <Input
        name='MONTH'
        disabled
        styles='w-full md:w-2/5 mr-2.5 mb-2 md:mb-6'
        inputValue={dogBirthday.month}
      />
      <Input
        name='DAY'
        disabled
        styles='md:w-1/5 w-1/2 md:mr-2.5 mb-2 md:mb-6'
        inputValue={dogBirthday.day}
        size='small'
      />
      <Input
        name='YEAR'
        disabled
        styles='md:w-1/5 w-1/2 mb-2 md:mb-6'
        inputValue={dogBirthday.year}
        size='small'
      />
      <Input
        name='GENDER'
        disabled
        styles='md:w-2/5 w-1/2 md:mr-2.5 mb-2 md:mb-6'
        inputValue={capitalizeFirstLetter(dog.gender)}
      />
      <Input
        name='WEIGHT'
        disabled
        styles='md:w-2/5 w-1/2 mb-6'
        inputValue={dog.weight}
      />
      <div className='flex font-semibold md:mt-9 text-primary'>
        <a href='#'>
          <img src={addIcon} className='inline-block mr-2.5' />
          <span>Add another dog</span>
        </a>
      </div>

      <PwdModal
        showModal={showUpdatePwdModal}
        onCloseModal={() => {
          setShowUpdatePwdModal(false);
        }}
      />
    </div>
  );
};

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user,
  };
}

function parseDogAge(dog) {
  var date = new Date();
  date.setMonth(date.getMonth() - dog.age_in_months);
  return {
    year: date.getFullYear(),
    month: date.toLocaleString("default", { month: "long" }),
    day: date.getDay(),
  };
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { AccountDetails };
