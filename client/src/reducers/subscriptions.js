const sections = (state = [], action) => {
  switch(action.type) {
    case 'GET_SUBS':
      return action.subs;
    case 'ADD_SUB':
      return [...state, action.sub]
    case 'CLEAR_SUBS':
      return action.subs;
    case 'UPDATE_SUBS':
      return state.map( sub => {
        if(sub.id === action.sub.id)
          return action.sub;
        return sub;
      });
    case 'DELETE_SUB':
      return state.filter( sub => sub.id !== action.sub.id )
    default:
      return state;
  }
}

export default sections;
