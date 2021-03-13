export const updateObject = (oldObject, updatedObj) => {
  return {
    ...oldObject,
    ...updatedObj
  }
}