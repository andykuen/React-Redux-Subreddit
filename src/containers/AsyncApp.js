import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../redux/actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

const AsyncApp = () => {

  const dispatch = useDispatch();

  const handleChange = (nextSubreddit) => {
    dispatch(selectSubreddit(nextSubreddit))
  }

  const handleRefreshClick = (e) => {
    e.preventDefault()

    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  const { selectedSubreddit, postsBySubreddit } = useSelector(state => state);
  const {
    isFetching,
    lastUpdated,
    didInvalidate,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    didInvalidate: false,
    items: []
  }

  useEffect(() => {
    if (!didInvalidate) {
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  })

  return (
    <div>
      <Picker value={selectedSubreddit} onChange={handleChange} options={['reactjs', 'frontend', 'emptyTest']}></Picker>
      <div>
        {
          lastUpdated && <span>Last update at {new Date(lastUpdated).toLocaleTimeString()}.{' '}</span>
        }
        {
          !isFetching && <button onClick={handleRefreshClick}>Refresh</button>
        }
      </div>
      <span>
        {
          isFetching && posts.length === 0 && <h2>Loading...</h2>
        }
        {
          !isFetching && posts.length === 0 && <h2>Empty.</h2>
        }
        {
          posts.length > 0 && <div><Posts {...{ posts }}></Posts></div>
        }
      </span>
    </div>
  )
}

AsyncApp.propTypes = {}

export default AsyncApp