import PropTypes from 'prop-types'
import { User } from './User.jsx'

// Post component =============================================================
export function Post({ title, contents, author: userId }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>
        <pre>{contents}</pre>
      </div>
      {userId && (
        <em>
          <br />
          Written by:{' '}
          <strong>
            <User id={userId} />
          </strong>
        </em>
      )}
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
}
