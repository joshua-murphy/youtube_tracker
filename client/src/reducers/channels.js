const sections = (state = [], action) => {
  switch(action.type) {
    case 'GET_CHANNELS':
      return action.channels;
      case 'CLEAR_CHANNELS':
        return action.channels;
    case 'ADD_CHANNEL':
      return [action.channel, ...state];
    case 'DELETE_CHANNEL':
      return state.filter( channel => channel.id !== action.channel.id )
    default:
      return state;
  }
}

export default sections;
