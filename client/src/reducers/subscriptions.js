const sections = (state = [], action) => {
  switch(action.type) {
    case 'GET_SUBS':
      return action.subs;
      case 'CLEAR_SUBS':
        return action.subs;
    case 'ADD_SUB':
      return [action.sub, ...state]
    case 'DELETE_SUB':
      return state.filter( sub => sub.id !== action.sub.id )
    default:
      return state;
  }
}

export default sections;
