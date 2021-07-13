import axios from "axios";

//ACTION TYPES

const SET_USERS = "SET_USERS";

//ACTION CREATORS

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

//THUNK CREATORS

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/users");
      dispatch(setUsers(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// STUDENT SUB_REDUCER
export default function userReducer(users = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return users;
  }
}
