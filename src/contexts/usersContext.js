import { useReducer, createContext } from "react";

const initialState = {
  users: [],
};

const actions = {
  ADD_USER: "ADD_USER",
  REMOVE_USER: "REMOVE_USER"
};

const usersReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_USER:
      const { payload: user } = action;
      console.log('state', {...state, users: [...state.users, user]});
      return {...state, users: [...state.users, user]};
    case actions.REMOVE_USER:
      const {payload: id} = action;
      const users = state.users.filter(user => user.id !== id);
      console.log('filtered users', users);
      return {...state, users}
    default:
      return state;
  }
};

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const [state, dispatch] = useReducer(usersReducer, initialState);
  
    const value = {
      users: state.users,
      addUser: (user) => {
        dispatch({ type: actions.ADD_USER, payload: user });
      },
      removeUser: (id) => {
        dispatch({ type: actions.REMOVE_USER, payload: id})
      }
    };
  
    return (
      <UsersContext.Provider value={value}>
        {children}
      </UsersContext.Provider>
    );
};
