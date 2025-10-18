import PropTypes from 'prop-types'

// Get the use information ====================================================
export function User({ username }) {
  return <b> {username} </b>
}

User.propTypes = {
  username: PropTypes.string.isRequired,
}
