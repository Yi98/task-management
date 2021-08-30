import { createContext, useState, useEffect, useReducer } from "react";

const CategoryContext = createContext({
  dispatchCategory: (option) => {},
  categoryState: {},
});

export const CategoryContextProvider = (props) => {
  const [categoryState, dispatchCategory] = useReducer(
    (state, action) => {
      if (action.type === "INPUT") {
        const selectable = action.val.filter((item) => item._id);
        return {
          original: action.val,
          selectable,
          selected: selectable.length > 0 ? selectable[0]._id : null,
        };
      } else if (action.type == "SELECT_ACTIVE") {
        console.log({
          original: state.original,
          selectable: state.selectable,
          selected: action.val,
        });
        return {
          original: state.original,
          selectable: state.selectable,
          selected: action.val,
        };
      } else if (action.type == "INCREMENT") {
        for (let i = 0; i < state.original.length; i++) {
          if (state.original[i]._id == state.selected) {
            let sum = state.original[i].sum;
            state.original[i].sum = sum + 1;
          }
        }

        return {
          original: state.original,
          selectable: state.selectable,
          selected: state.selected,
        };
      }
    },
    { original: [], selectable: [], selected: null }
  );

  function dispatchCategoryHandler(option) {
    dispatchCategory(option);
  }

  return (
    <CategoryContext.Provider
      value={{
        dispatchCategory: dispatchCategoryHandler,
        categoryState,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
