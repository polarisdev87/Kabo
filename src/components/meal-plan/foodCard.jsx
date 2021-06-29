import React, { useState, useEffect } from "react";

const FoodCard = ({
  type,
  dog,
  food,
  icons,
  kibble,
  handleSelectedCookedRecipes,
  selectedCookedRecipes,
  kibbleRecipe,
  recipe,
  keys,
}) => {
  const [kibble_, isKibble] = useState(false);
  const [cooked, isCooked] = useState(false);
  const [selected, isSelected] = useState(false);
  //const [recipe_, setRecipe] = useState("");

  useEffect(() => {
    if (type === "cooked") {
      keys.includes(`${recipe}_recipe`)
        ? isSelected(dog[`${recipe}_recipe`])
        : isSelected(false);
    }
  }, []);

  const selectKibbleRecipe = (food) => {
    isKibble(!kibble_);
    isSelected(!selected);
    kibbleRecipe(food);
  };

  const selectCookedFood = (food) => {
    isCooked(!cooked);
    isSelected(!selected);
    handleSelectedCookedRecipes(food);
  };
  return (
    <div className="rounded-xl h-40 w-96 mb-4 flex overflow-hidden">
      <div
        className={
          type === "kibble"
            ? `bg-kibble-${food.recipe} w-1/2 h-full flex items-center justify-center`
            : `bg-${food.recipe} w-1/2 h-full flex items-center justify-center`
        }
      >
        <img src={icons[food.recipe]} className="h-3/4" />
      </div>
      <div
        className={
          selected
            ? "w-2/3 bg-green-100 focus:bg-green-100 py-5 flex flex-col items-center justify-between"
            : "w-2/3 bg-white focus:bg-green-100 py-5 flex flex-col items-center justify-between"
        }
      >
        <div className="font-cooper text-xl text-black text-center">
          {food.name}
        </div>
        <div className="text-primary font-bold font-messina">More Details</div>
        {type === "kibble" ? (
          <button
            className={
              kibble_ || selected
                ? "bg-green-700 border border-green-700 hover:border-transparent focus:outline-none text-white font-bold py-2 px-10 rounded-full"
                : "bg-transparent border border-green-700 hover:border-transparent focus:outline-none hover:bg-green-700 text-primary hover:text-white font-bold py-2 px-10 rounded-full"
            }
            onClick={() => selectKibbleRecipe(food)}
            value={kibble_}
            disabled={
              (!kibble_ && selectedCookedRecipes.length === 2) ||
              (!kibble_ && kibble.length === 1)
            }
          >
            Add Recipe
          </button>
        ) : (
            <button
              className={
                cooked || selected
                  ? "bg-green-700 border border-green-700 hover:border-transparent focus:outline-none text-white font-bold py-2 px-10 rounded-full"
                  : "bg-transparent border border-green-700 hover:border-transparent focus:outline-none hover:bg-green-700 text-primary hover:text-white font-bold py-2 px-10 rounded-full"
              }
              onClick={() => selectCookedFood(food)}
              value={cooked}
              disabled={
                (!cooked && selectedCookedRecipes.length === 2) ||
                (!cooked &&
                  kibble.length > 0 &&
                  selectedCookedRecipes.length === 1)
              }
            >
              Add Recipe
            </button>
          )}
        {/* <label
          htmlFor={type}
          className="rounded-xl cursor-pointer w-2/3 border border-green text-primary font-bold py-2 flex justify-center items-center"
        >
          {type === "kibble" ? (
            <input
              onChange={() => selectKibbleRecipe(food)}
              name={type}
              checked={kibble_}
              disabled={
                (!kibble_ && selectedCookedRecipes.length === 2) ||
                (!kibble_ && kibble.length === 1)
              }
              className="hiden mr-2"
              type="checkbox"
            />
          ) : (
            <input
              onChange={() => selectCookedFood(food)}
              name={type}
              checked={cooked}
              disabled={
                (!cooked && selectedCookedRecipes.length === 2) ||
                (!cooked &&
                  kibble.length > 0 &&
                  selectedCookedRecipes.length === 1)
              }
              className="hiden mr-2"
              type="checkbox"
            />
          )}
          Add Recipe
        </label> */}
      </div>
    </div>
  );
};

export default FoodCard;