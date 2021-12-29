import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import AsyncApp from './AsyncApp'

const Root = () => {
  return (
    <Provider {...{ store }}>
      <AsyncApp />
    </Provider>
  )
}

export default Root;
