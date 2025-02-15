import { createStore } from "../src/index.js";

let lastId = 0;
function reducer(state = [], action) {
  if (action.type === "bugAdded") {
    return [...state, {
      id: ++lastId,
      description: action.payload.description,
      resolved: false
    }];
  } 
  else if (action.type === 'bugRemoved') {
    return state.filter(bug => bug.id !== action.payload.id)
  }
  return state;
}

const store = createStore(reducer);

const unsubscribe = store.subscribe(() => {
  console.log("Subscribe...", store.getState());  
})

console.log("Initial", store.getState());

store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug 1"
  }
})

console.log("After bug added", store.getState());

unsubscribe()

store.dispatch({
  type: "bugRemoved",
  payload: {
    id: 1
  }
})

console.log("After bug removed", store.getState());