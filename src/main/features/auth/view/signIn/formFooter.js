import React from 'react'
import { NavLink } from 'react-router-dom'
import { STRINGS } from '../../../../../utils/base'

function FormFooter() {
  return (
    <>
        <div className="fg">
          <NavLink className="lf" to={STRINGS.ROUTES.AUTH.SIGN_UP}>
            Register as <strong>Organization</strong>&nbsp;
          </NavLink>
          <NavLink to={STRINGS.ROUTES.AUTH.FORGOT_PASSWORD}>
            Forgot Password?
          </NavLink>
        </div>
        <div className="fg">
          {/* <NavLink className="lf" to={STRINGS.ROUTES.AUTH.INDIVIDUAL_SIGN_IN}>
            Register as an <strong>individual</strong>&nbsp;
          </NavLink> */}
          <NavLink className="lf" to="#">
            Register as an <strong>individual</strong>&nbsp;
          </NavLink>
        </div>
    </>
  )
}

export default FormFooter