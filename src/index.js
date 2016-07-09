import {createAction} from 'redux-actions'
import {BOOT} from 'redux-boot'

import {
  HELLO_WORLD
} from './constants'

export default {

  reducer: {
    [HELLO_WORLD]: (state, action) => ({say: 'Hello World!'})
  },

  middleware: {
    [HELLO_WORLD]: store => next => action => {

      // @TODO: Dispatch a side-effect.

      return next(action)
    }
  }

}