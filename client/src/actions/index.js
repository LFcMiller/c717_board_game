import types from './types';
import axios from 'axios';

export function exampleAction(){

  const request = {answer: 'hi'};  

  return {
    type: types.EXAMPLE_ACTION,
    payload: request
  }
}