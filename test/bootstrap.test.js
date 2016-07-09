import test from 'tape'
import {BOOT} from 'redux-boot'
import request from 'supertest'
import boilerplateModule, { HTTP_AFTER_BOOT } from '../src'

test('Web server bootstrap', assert => {
  const getState = () => {
    return {
      variables: { port: 3020 }
    }
  }

  const dispatch = (action) => {
    console.log('TESTTTTA')

    if (action.type === HTTP_AFTER_BOOT) {
      const { httpServer } = action.payload

      console.log('TESTTTT')

      console.log(httpServer)

      request(httpServer)
        .get('/')
        .expect(404)
        .end((error, response) => {
          if (error) throw error

          assert.ok(!error, 'Ok')
          console.log(response)
          //assert.equal(response.body, 'Hello World!')
          assert.end()

          httpServer.close()
        })
    }

    return Promise.resolve()
  }

  const next = action => action
  const action = { type: BOOT }

  boilerplateModule.middleware[BOOT]({getState, dispatch})(next)(action)
})
