
export default function addConstraint(propertyType,propertyName,firstValue,secondValue) {
  return {
    type: 'ADD_CONSTRAINT',
    propertyType,
    propertyName,
    firstValue,
    secondValue
  }
}
