import { createContext, useReducer } from "react";

const CategoryContext = createContext({
  dispatchCategory: (option) => {},
  categoryState: {},
});

export const CategoryContextProvider = (props) => {
  const [categoryState, dispatchCategory] = useReducer(
    (state, action) => {
      if (action.type === "INPUT") {
        let selectable = [];
        if (action.val) {
          selectable = action.val.filter((item) => item._id);
        }

        return {
          original: action.val,
          selectable,
          selected: selectable.length > 0 ? selectable[0]._id : null,
        };
      } else if (action.type == "SELECT_ACTIVE") {
        return {
          original: state.original,
          selectable: state.selectable,
          selected: action.val,
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
