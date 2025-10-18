import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'

import slug from 'slug'

// Post component =============================================================
export function Post({ title, contents, author, id, fullPost = false }) {
  return (
    <article>
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/posts/${id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}
      {fullPost && (
        <div>
          <pre>{contents}</pre>
        </div>
      )}
      {author && (
        <em>
          {fullPost && <br />}
          <b>
            Written by: &nbsp; &nbsp; <User {...author} />{' '}
          </b>
        </em>
      )}
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  //author: PropTypes.string,
  author: PropTypes.shape(User.propTypes),
  id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
}
