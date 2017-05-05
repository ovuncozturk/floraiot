// Define reducers
export default function unitReducer(state = {}, action = {} ) {
  switch (action.type) {
    case 'CHANGE_UNIT':
      console.log("Birim değişti");
      console.log(action.unitSystem);
      return action.unitSystem;
      break;
    default:
      return state;
  }
}
