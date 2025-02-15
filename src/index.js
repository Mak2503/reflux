// createStore for creating redux store
export function createStore(reducer) {
  // initialization
  let storeState = reducer(undefined, { type: undefined });
  
  let subscribeModel = {
    subscribed: false,
    callback: () => {},
  };

  const store = {
    // for dispatching actions
    dispatch: (action) => {
      storeState = reducer(storeState, action);

      // call the subscription callback if subscribed
      if (subscribeModel.subscribed) subscribeModel.callback();
    },

    // to get the current state
    getState: () => {
      return storeState;
    },

    // subscribing to state changes
    subscribe: (callback) => {
      subscribeModel.subscribed = true;
      subscribeModel.callback = callback;

      // unsubscribing
      const unsubscribe = () => {
        subscribeModel.subscribed = false;
        subscribeModel.callback = () => {};
      };
      return unsubscribe;
    },
  };

  return store;
}
