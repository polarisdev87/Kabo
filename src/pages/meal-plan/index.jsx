import React, { Component } from "react";
import { connect } from "react-redux";
import {
  formValues,
  formValueSelector,
  getFormValues,
  reduxForm,
  Field,
} from "redux-form";
import { userActions, mealActions } from "../../actions";
import { Button } from "../../stories/Button";
import FreshFood from "../../components/meal-plan/fresh-food";
import KibbleSelect from "../../components/meal-plan/kibble";
import LoadingCircle from "../../components/partials/loading";
import MealPlanSelect from "../../components/meal-plan/meal-plan-select";
import RecipeSelection from "./RecipeSelection";
import DailyDietPortion from "./DailyDietPortion";
import DogSelector from "../../components/account/dog-selector";
import { useParams } from "react-router-dom";

class EditPlan extends Component {
  state = {
    next: false,
    previous: true,
    selectedBox: false,
    cookedRecipes: [],
    kibble: [],
    isKibble: false,
    selectedPortion: false,
    dietPortion: {},
    dog: {},
  };

  componentDidMount() {
    this.props.getAccountData();
    this.props.getRecipeData();
    this.props.getSubscriptionData();
  }

  componentDidUpdate(prevProps, prevState) {
    let index = this.props.match.params.id;
    if (
      prevProps.user.dogs.length > 0 &&
      Object.keys(prevState.dog).length === 0
    ) {
      this.setState({
        dog: prevProps.user.dogs[index],
      });
    }
  }

  selectedDog = (dog) => {
    this.setState({ dog });
    console.log("selected dog", dog);
  };

  toggleKibble = () => {
    this.setState({ isKibble: !this.state.isKibble });
  };

  togglePortion = () => {
    this.setState({ selectedPortion: !this.state.selectedPortion });
  };

  selectedDietPortion = (diet) => {
    this.setState({ dietPortion: diet });
  };

  handleSelectedCookedRecipes = (food) => {
    const { cookedRecipes } = this.state;
    if (cookedRecipes.length > 0 && cookedRecipes.includes(food.recipe)) {
      let recipes = [...cookedRecipes];
      const index = recipes.indexOf(food.recipe);
      recipes.splice(index, 1);
      this.setState({ cookedRecipes: recipes });
      return;
    }
    this.setState({ cookedRecipes: [...cookedRecipes, food.recipe] });
  };

  handleSelectedKibbleRecipe = (food) => {
    const { kibble } = this.state;
    if (kibble.length > 0 && kibble.includes(food.recipe)) {
      let recipes = [...kibble];
      const index = recipes.indexOf(food.recipe);
      recipes.splice(index, 1);
      this.setState({ kibble: recipes });
      return;
    }
    this.setState({ kibble: [...kibble, food.recipe] });
  };

  handleNext = () => {
    this.setState({ next: true, previous: false });
  };
  handlePrevious = () => {
    this.setState({ previous: true, next: false });
  };

  handleMealUpdate = () => {
    const { cookedRecipes, kibble, dietPortion, dog } = this.state;
    const data = {
      dog_id: dog.id,
      cooked_portion: dietPortion.cooked_portion,
      kibble_portion: null,
    };
    if (kibble.length > 0) {
      data.kibble_recipe = kibble[0];
    }
    for (let item of cookedRecipes) {
      data[`${item}_recipe`] = true;
    }
    this.props.updateMealPlan(data);
  };

  render() {
    // console.log(this.props)
    const { user, meal, getDailyDietPortion } = this.props;
    const { cookedRecipes, kibble, dog, dietPortion } = this.state;
    if (dog == {}) return null;
    console.log(dog);
    return (
      <React.Fragment>
        {this.state.next && (
          <DailyDietPortion
            meal={meal}
            dog={dog}
            cookedRecipes={cookedRecipes}
            dietPortion={this.state.dietPortion}
            selectedPortion={this.state.selectedPortion}
            togglePortion={this.togglePortion}
            selectedDietPortion={this.selectedDietPortion}
            getDailyDietPortion={getDailyDietPortion}
          />
        )}
        {this.state.previous && (
          <RecipeSelection
            user={user}
            index={this.props.match.params.id}
            selectedDog={this.selectedDog}
            cookedRecipes={this.state.cookedRecipes}
            handleSelectedCookedRecipes={this.handleSelectedCookedRecipes}
            selectedCookedRecipes={this.state.cookedRecipes}
            handleSelectedKibbleRecipe={this.handleSelectedKibbleRecipe}
            kibble={this.state.kibble}
            toggleKibble={this.toggleKibble}
            isKibble={this.state.isKibble}
          />
        )}

        <div className="w-full flex flex-col py-3 bg-white items-center">
          <div className="inline-flex">
            <button
              onClick={this.handlePrevious}
              className="text-green-600 mr-2 focus:outline-none"
            >
              Previous
            </button>
            {!this.state.next ? (
              <button
                onClick={this.handleNext}
                disabled={cookedRecipes.length === 0 && kibble.length === 0}
                className={
                  cookedRecipes.length === 0 && kibble.length === 0
                    ? "bg-gray-300 focus:outline-none text-white font-bold py-2 px-4 rounded"
                    : "bg-green-600 focus:outline-none text-white font-bold py-2 px-4 rounded"
                }
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => this.handleMealUpdate(e)}
                disabled={Object.keys(dietPortion).length <= 0}
                className={
                  Object.keys(dietPortion).length <= 0
                    ? "bg-gray-300 focus:outline-none text-white font-bold py-2 px-4 rounded"
                    : "bg-green-600 focus:outline-none hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                }
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAccountData: () => dispatch(userActions.getAccountData()),
  getRecipeData: () => dispatch(userActions.getRecipeData()),
  updateMealPlan: (payload) => dispatch(mealActions.updateMealPlan(payload)),
  getDailyDietPortion: (payload) =>
    dispatch(mealActions.getDailyDietPortion(payload)),
  getSubscriptionData: () => dispatch(userActions.getSubscriptionData()),
});

// const mapStateToProps = (state) => {
//   const {
//     user: { subscriptions, dogs },
//     user,
//   } = state;
//   const dog = dogs.length > 0 ? dogs[0] : {};
//   // const {chicken_recipe, beef_recipe, turkey_recipe, lamb_recipe} = dog
//   // console.log(dogs)
//   return {
//     subscriptions,
//     dogs,
//     user,
//     initialValues: {
//       chicken_recipe: dog.chicken_recipe,
//       beef_recipe: dog.beef_recipe,
//       turkey_recipe: dog.turkey_recipe,
//       lamb_recipe: dog.lamb_recipe,
//     },
//   };
// };

const mapStateToProps = (state) => {
  console.log(state.user);
  return {
    user: state.user,
    meal: state.meal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPlan);
