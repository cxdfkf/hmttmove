
export const getItem = (name) => {
  return JSON.parse(window.localStorage.getItem(name))
}

export const setItem = (name, data) => {
  return window.localStorage.getItem(name, data)
}

export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
