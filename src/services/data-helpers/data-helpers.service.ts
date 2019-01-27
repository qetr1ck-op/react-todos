export function toDictionary<T>(array: T[], key) {
  return array.reduce((dictionary, item) => {
    return { ...dictionary, [item[key]]: item }
  }, {})
}

export function toList<T, K extends keyof T>(dictionary: T): Array<T[K]> {
  return Object.values(dictionary).map((value) => value)
}
