const sections = (state = [], action) => {
  let channel = []
  let filteredState = []
  switch(action.type) {
    case 'GET_CHANNELS':
      return action.channels;
    case 'CLEAR_CHANNELS':
      return action.channels;
    case 'ADD_CHANNEL':
      return [action.channel, ...state];
    case 'DELETE_CHANNEL':
      return state.filter( channel => channel.id !== action.channel.id )
    case 'GET_STATS':
      channel = state.filter( c => c.id === action.id )
      filteredState = state.filter( c => c.id !== action.id )
      return [ ...filteredState, { ...channel[0], stats: action.stats } ];
    case 'GET_VIDEO':
      channel = state.filter( c => c.id === action.id )
      filteredState = state.filter( c => c.id !== action.id )
      return [ ...filteredState, { ...channel[0], video: action.video } ];
    default:
      return state;
  }
}

export default sections;
