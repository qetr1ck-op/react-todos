const ROOT_STATE = 'ROOT_STATE'

export const loadState = (): any => {
  try {
    const serializedState = localStorage.getItem(ROOT_STATE)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (stateName: object) => {
  try {
    const serializedState = JSON.stringify(stateName)
    localStorage.setItem(ROOT_STATE, serializedState)
  } catch (err) {
    // Ignore write errors.
  }
}
