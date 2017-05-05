// Define reducers
export default function constraintReducer(state = {}, action = {} ) {
  switch (action.type) {
    case 'ADD_CONSTRAINT':
      return {constraints : [
        ...state.constraints,
        {
          key : state.countOfConstraints,
          propertyType : action.propertyType,
          propertyName : action.propertyName,
          firstValue : action.firstValue,
          secondValue : action.secondValue
        }
      ], countOfConstraints: state.countOfConstraints + 1};
      break;
    case 'REMOVE_CONSTRAINT':
      return {constraints : state.constraints.slice(0, action.indexOfConstraint)
                                              .concat(state.constraints.slice(action.indexOfConstraint+1))
      , countOfConstraints: state.countOfConstraints};
      break;
    default:
      return state;
  }
}
