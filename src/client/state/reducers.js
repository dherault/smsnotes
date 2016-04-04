export default {
  
  messages: (state=[], action) => {
    
    switch (action.type) {
      case 'SUCCESS_READ_MESSAGES':
        const sender = action.params.sender;
        return [
          ...state, 
          ...action.payload.map(x => Object.assign({ sender }, x))
        ].sort((a, b) => a.createdAt <= b.createdAt ? 1 : -1);
      
      default:
        return state;
    }
  },
  
  records: (state=[], action) => [...state, Object.assign({ date: new Date().getTime() }, action)],
};
