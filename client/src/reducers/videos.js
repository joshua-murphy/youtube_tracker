const videos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_VIDEO':
      return [action.video, ...state]
    case 'CLEAR_VIDEOS':
        return action.videos;
    default:
      return state;
  }
}

export default videos;