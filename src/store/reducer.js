import * as actionTypes from "./actions";
import Method from "./Methods";
import {updateObject} from "./utility";

const initialState = {
  URL: "https://jsonplaceholder.typicode.com/posts",
  method: "GET",
  viewResponseOptionTab: "pretty",
  indent: 4,
  theme: "dark",
  isLoading: false,
  response: {
    data: "",
    status: "",
    time: 0
  },
  parameters: [
    {id: 0, key: "salam", value: null, check: false},
    {id: 1, key: "bye", value: "khubam", check: false},
  ],
}

const saveSetting = (state, action) => {
  return updateObject(state, {
    indent: action.payload.indent,
    theme: action.payload.theme
  });
};

const changeURL = (state, action) => {
  return updateObject(state, {URL: action.val});
};

const changeMethod = (state, action) => {
  return updateObject(state, {method: Method[action.val]})
};

const addParameter = (state, action) => {
  const newParameters = [...state.parameters];
  const length = newParameters.length;
  const id = newParameters[length - 1].id + 1;
  const newParameter = {
    id: id,
    key: "",
    value: null,
    check: true
  };

  return updateObject(state, {parameters: state.parameters.concat(newParameter)})
};
const setParameters = (state, action) => {
  return updateObject(state, {parameters: action.payload});
};
const removeParameter = (state, action) => {
  let newParameters = [...state.parameters];
  newParameters = newParameters.filter(param => param.id !== action.id);
  return updateObject(state, {parameters: newParameters});
};
const updateParameters = (state, action) => {
  let newParameters = [...state.parameters];
  for (let i = 0; i < state.parameters.length; i++) {
    if (state.parameters[i].id === action.payload.id) {
      if (action.payload.type === "check") {
        newParameters[i][action.payload.type] = !newParameters[i][action.payload.type];
      } else {
        newParameters[i][action.payload.type] = action.payload.val;
      }
    }
  }
  return updateObject(state, {parameters: newParameters});
};

const updateResponseTab = (state, action) => {
  return updateObject(state, {viewResponseOptionTab: action.val});
};
const updateResponseIsLoading = (state, action) => {
  return updateObject(state, {isLoading: action.val});
};
const updateResponse = (state, action) => {
  return updateObject(state, {
    response: {
      data: action.payload.data,
      status: action.payload.status,
      time: action.payload.time
    }
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_SETTINGS:
      return saveSetting(state, action);

    case actionTypes.CHANGE_URL:
      return changeURL(state, action);

    case actionTypes.CHANGE_METHOD:
      return changeMethod(state, action);

    case actionTypes.ADD_PARAMETER:
      return addParameter(state, action);
    case actionTypes.REMOVE_PARAMETER:
      return removeParameter(state, action);
    case actionTypes.SET_PARAMETERS:
      return setParameters(state, action);
    case actionTypes.UPDATE_PARAMETERS:

      return updateParameters(state, action);
    case actionTypes.UPDATE_RESPONSE:
      return updateResponse(state, action);
    case actionTypes.UPDATE_RESPONSE_TAB:
      return updateResponseTab(state, action);
    case actionTypes.UPDATE_RESPONSE_IS_LOADING:
      return updateResponseIsLoading(state, action);

    default:
      return state;
  }
}

export default reducer;