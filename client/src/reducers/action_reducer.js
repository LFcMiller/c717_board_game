import types from '../actions/types';

const DEFAULT_STATE = { user: null, message: 'Yo' };

export default function(state = DEFAULT_STATE, action){
  switch(action.type){
    case types.EXAMPLE_ACTION:
      return {...state, message: action.payload.answer}
    default:
      return state;
  }
}