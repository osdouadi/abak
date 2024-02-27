import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { categoryListReducer } from './Reducers/CategoryReducers';
import { userLoginReducer } from './Reducers/UserReducers';

const reducer = combineReducers({
  categoryList: categoryListReducer,
  userLogin: userLoginReducer
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
  user: {
    userLogin: { userInfo: userInfoFromLocalStorage },
  },
};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
