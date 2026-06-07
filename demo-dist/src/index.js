"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = createStore;
// CreateStore function
function createStore(reducer) {
    // Initialization
    var storeState = reducer(undefined, { type: undefined });
    var subscribeModel = {
        subscribed: false,
        callback: function () { },
    };
    var store = {
        // For dispatching actions
        dispatch: function (action) {
            storeState = reducer(storeState, action);
            // Call the subscription callback if subscribed
            if (subscribeModel.subscribed)
                subscribeModel.callback();
        },
        // To get the current state
        getState: function () {
            return storeState;
        },
        // Subscribing to state changes
        subscribe: function (callback) {
            subscribeModel.subscribed = true;
            subscribeModel.callback = callback;
            // Unsubscribing
            var unsubscribe = function () {
                subscribeModel.subscribed = false;
                subscribeModel.callback = function () { };
            };
            return unsubscribe;
        },
    };
    return store;
}
