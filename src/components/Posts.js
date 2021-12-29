import React from "react";
import PropTypes from 'prop-types';

const Posts = ({ posts }) => {
  return (
    <ul>
      {posts.map((post, i) =>
        <li key={i}>{post.title}</li>
      )}
    </ul>
  )
}

Posts.prototype = {
  posts: PropTypes.array.isRequired
}

export default Posts