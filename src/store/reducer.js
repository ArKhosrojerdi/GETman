import * as actionTypes from "./actions";

const initialState = {
  indent: 4,
  theme: "dark"
}

const reducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case actionTypes.SAVE_SETTINGS:
      return {
        indent: action.payload.indent,
        theme: action.payload.theme
      }
  }

  return state;
}

export default reducer;