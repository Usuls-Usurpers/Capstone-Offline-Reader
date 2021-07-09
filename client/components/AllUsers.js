import React from "react"
import { connect } from "react-redux"
import { fetchUsers } from "../store/users"

class AllUsers extends React.Component {
  componentDidMount(){
    this.props.fetchUsers()
  }
  render() {
    return (
      <div>
        {(this.props.users.length) ? (
        <ul className="listAll">
          {this.props.users.map((user) => {
            return (
            <li key={user.id} className="listItem">
                <h3>{user.firstName} {user.lastName}</h3>
            </li>)
          })
          }
        </ul>) : (
          <h1>loading...</h1>
        )}
      </div>)
  }
}

const mapState = (state) => {
  return {
    user: state.users
  }
}

const mapDispatch = (dispatch) => {
  return ({
    fetchUsers: () => dispatch(fetchUsers()),
  })
}

export default connect(mapState, mapDispatch)(AllUsers);
