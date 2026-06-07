"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../src/index.js");
// import { createStore as  } from "redux";
var lastId = 0;
function reducer(state, action) {
    if (state === void 0) { state = []; }
    if (action.type === "bugAdded") {
        return __spreadArray(__spreadArray([], state, true), [{
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            }], false);
    }
    else if (action.type === 'bugRemoved') {
        return state.filter(function (bug) { return bug.id !== action.payload.id; });
    }
    return state;
}
var store = (0, index_js_1.createStore)(reducer);
var unsubscribe = store.subscribe(function () {
    console.log("Subscribe...", store.getState());
});
console.log("Initial", store.getState());
store.dispatch({
    type: "bugAdded",
    payload: {
        description: "Bug 1"
    }
});
console.log("After bug added", store.getState());
unsubscribe();
store.dispatch({
    type: "bugRemoved",
    payload: {
        id: 1
    }
});
console.log("After bug removed", store.getState());
