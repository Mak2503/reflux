// Action type
interface Action<T = any> {
  type: string;
  payload?: T;
}

// Reducer type
type Reducer<S, A extends Action> = (state: S | undefined, action: A) => S;

// CreateStore function
export function createStore<S, A extends Action>(reducer: Reducer<S, A>) {
  // Initialization
  let storeState: S = reducer(undefined, { type: undefined } as unknown as A);

  let subscribeModel = {
    subscribed: false,
    callback: () => {},
  };

  const store = {
    // For dispatching actions
    dispatch: (action: A) => {
      storeState = reducer(storeState, action);

      // Call the subscription callback if subscribed
      if (subscribeModel.subscribed) subscribeModel.callback();
    },

    // To get the current state
    getState: (): S => {
      return storeState;
    },

    // Subscribing to state changes
    subscribe: (callback: () => void) => {
      subscribeModel.subscribed = true;
      subscribeModel.callback = callback;

      // Unsubscribing
      const unsubscribe = () => {
        subscribeModel.subscribed = false;
        subscribeModel.callback = () => {};
      };
      return unsubscribe;
    },
  };

  return store;
}
