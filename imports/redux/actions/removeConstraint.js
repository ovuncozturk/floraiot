
export default function removeConstraint(indexOfConstraint) {
  return {
    type: 'REMOVE_CONSTRAINT',
    indexOfConstraint
  }
}
