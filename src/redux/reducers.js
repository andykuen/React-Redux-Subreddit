import { combineReducers } from 'redux';
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  RECEIVE_POSTS,
  REQUEST_POSTS
} from './actions'

const defaultPostsState = {
  isFetching: false,
  didInvalidate: false,
  items: []
}
const posts = (state = defaultPostsState, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, { didInvalidate: true })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receiveAt
      })
    default:
      return state
  }
}

const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

const selectedSubreddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer;