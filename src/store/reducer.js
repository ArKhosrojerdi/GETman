import * as actionTypes from "./actions";

const initialState = {
  indent: 4,
  theme: "light"
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_SETTINGS:
      return {
        indent: action.payload.indent,
        theme: action.payload.theme
      }
    default:
      return state;
  }
}

export default reducer;