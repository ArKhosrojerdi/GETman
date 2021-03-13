import * as actionTypes from "./actions";

const initialState = {
  URL: "https://jsonplaceholder.typicode.com/posts",
  method: "GET",
  viewResponseOptionTab: "pretty",
  indent: 4,
  theme: "light",
  isLoading: false,
  response: {
    data: "",
    status: "",
    time: 0
  },
  parameters: [
    {id: 0, key: "salam", value: "are", check: true},
    {id: 1, key: "bye", value: "khubam", check: true},
  ],
}

const reducer = (state = initialState, action) => {
  let newParams = [...state.parameters];
  switch (action.type) {
    case actionTypes.SAVE_SETTINGS:
      return {
        ...state,
        indent: action.payload.indent,
        theme: action.payload.theme
      }
    case actionTypes.CHANGE_URL:
      return {
        ...state,
        URL: action.val
      }
    case actionTypes.CHANGE_METHOD:
      return {
        ...state,
        method: action.val
      }
    case actionTypes.ADD_PARAMETER:
      const length = newParams.length;
      const id = newParams[length - 1].id + 1;
      const newParam = {
        id: id,
        key: "",
        value: "",
        check: true
      };

      return {
        ...state,
        parameters: state.parameters.concat(newParam)
      }
    case actionTypes.REMOVE_PARAMETER:
      return {
        ...state,
        parameters: state.parameters.filter(param => param.id !== action.id)
      }
    case actionTypes.CHANGE_PARAMETER_KEY:
      for (let i = 0; i < state.parameters.length; i++) {
        if (state.parameters[i].id === action.payload.id) {
          newParams[i].key = action.payload.val;
        }
      }

      return {
        ...state,
        parameters: newParams
      }
    case actionTypes.CHANGE_PARAMETER_VALUE:
      for (let i = 0; i < state.parameters.length; i++) {
        if (state.parameters[i].id === action.payload.id) {
          newParams[i].value = action.payload.val;
        }
      }

      return {
        ...state,
        parameters: newParams
      }
    case actionTypes.CHANGE_PARAMETER_CHECK:
      for (let i = 0; i < state.parameters.length; i++) {
        if (state.parameters[i].id === action.id) {
          newParams[i].check = !newParams[i].check;
        }
      }

      return {
        ...state,
        parameters: newParams
      }
    case actionTypes.UPDATE_RESPONSE:
      return {
        ...state,
        response: {
          data: action.payload.data,
          status: action.payload.status,
          time: action.payload.time
        }
      }
    case actionTypes.UPDATE_VIEW_RESPONSE_OPTION_TAB:
      return {
        ...state,
        viewResponseOptionTab: action.val
      }
    case actionTypes.UPDATE_RESPONSE_IS_LOADING:
      return {
        ...state,
        isLoading: action.val
      }
    case actionTypes.SET_PARAMS:
      return {
        ...state,
        parameters: action.payload
      }
    default:
      return state;
  }
}

export default reducer;