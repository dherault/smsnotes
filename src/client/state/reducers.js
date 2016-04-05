export default {
  
  messages: (state=[], action) => {
    
    switch (action.type) {
      // On messages read success, we add it to the state, then sort by creation date
      case 'SUCCESS_READ_MESSAGES':
        const sender = action.params.sender;
        return [
          ...state, 
          ...action.payload.map(x => Object.assign({ sender }, x))
        ].sort((a, b) => a.createdAt <= b.createdAt ? 1 : -1);
      
      // Same here, but for one message only
      case 'ADD_MESSAGE':
        return [...state, action.params].sort((a, b) => a.createdAt <= b.createdAt ? 1 : -1);
      
      default:
        return state;
    }
  },
  
  // Used for side-effects and logging
  records: (state=[], action) => [...state, Object.assign({ date: new Date().getTime() }, action)],
};
