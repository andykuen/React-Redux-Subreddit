export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

const requestPosts = (subreddit) => {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

const receivePosts = (subreddit, json) => {
  let posts = [];
  if (json) {
    posts = json.data.children.map(child => child.data)
  }
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: posts,
    receiveAt: Date.now()
  }
}

const fetchPosts = (subreddit) => {
  return (dispath) => {
    dispath(requestPosts(subreddit))

    const url = `https://www.reddit.com/r/${subreddit}.json`;
    return fetch(url)
      .then(res => res.ok ? res.json() : '')
      .then(json => dispath(
        receivePosts(subreddit, json)
      ))
  }
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]

  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export const fetchPostsIfNeeded = (subreddit) => {
  return (dispath, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispath(fetchPosts(subreddit))
    } else {
      return Promise.resolve()
    }
  }
}

export const selectSubreddit = (subreddit) => {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export const invalidateSubreddit = (subreddit) => {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}