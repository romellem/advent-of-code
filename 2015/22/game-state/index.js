const { createStore } = require('redux');
const player = require('./player');
const boss = require('./player');
const overall = require('./overall'); // `round`, `turn`, and `status`
const effects = require('./effects');

const initialState = require('./initial-state');

const rootReducer = combineReducers({

});

module.exports = createStore(rootReducer, initialState);