import { createContext, useEffect, useReducer } from 'react';

// Initial state of user data
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Save data to local storage
  useEffect(() => {
    try {
      localStorage.setItem(
        'user',
        // Converting object into string
        JSON.stringify(state.user)
      );
    } catch (error) {
      // Handle the error, e.g., log it or show a user-friendly message
      console.error('Error saving user to local storage:', error);
    }
  }, [state.user]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {' '}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
