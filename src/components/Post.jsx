import PropTypes from 'prop-types'
import { User } from './User.jsx'

import { Link } from 'react-router-dom'

// Post component =============================================================
export function Post({ title, contents, author, _id, fullPost = false }) {
  return (
    <article>
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/posts/${_id}`}>
          <h3>{title}</h3>
        </Link>
      )}
      {fullPost && <div>{contents}</div>}
      {author && (
        <em>
          {fullPost && <br />}
          <b>
            Written by: &nbsp; &nbsp; <User id={author} />{' '}
          </b>
        </em>
      )}
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  _id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
}
