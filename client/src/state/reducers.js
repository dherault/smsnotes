export default {

  records: (state=[], action) => [...state, Object.assign({ date: new Date().getTime() }, action)],
}
