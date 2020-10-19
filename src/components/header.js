import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
    <div className={'header'}>
      <h1 style={{ margin: 0, color: '#207D85'}}>
          &lt; MP &gt;
      </h1>
      <div className={'btn'}>Retourner au site</div>
    </div>
)


export default Header
