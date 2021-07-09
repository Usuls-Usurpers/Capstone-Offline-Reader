import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = () => (
  <div>
    <nav>
      <Link to="/users">users</Link>
      <Link to="/articles">articles</Link>
    </nav>
  </div>
)

export default Navbar
