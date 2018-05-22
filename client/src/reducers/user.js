const user = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user;
    case 'LOGOUT':
      return {};
    case 'CHANGE_THEME':
      return { ...state, dark_theme: action.theme }
    default:
      return state;
  }
};

export default user;
