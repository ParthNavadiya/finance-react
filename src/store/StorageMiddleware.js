
export default (store) => (next) => (action) => {
    next(action);
    try {
      const fullState = store.getState();
      // localStorage.setItem("state", JSON.stringify(fullState));
    } catch (e) {
      console.error("localStorage set error:", e);
    }
  };
  