export const storeLocal = (state: Object) => {
  window.localStorage.setItem("arthistle", JSON.stringify(state));
};
