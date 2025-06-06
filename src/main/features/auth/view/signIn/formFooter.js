import React from "react";
import { NavLink } from "react-router-dom";
// import { STRINGS } from "../../../../../utils/base";
import { ROUTES } from "../../../../../utils/routes";

function FormFooter() {
  return (
    <>
      <div className="fg">
        <NavLink className="lf" to={ROUTES.AUTH.SIGN_UP}>
          &nbsp;Register
        </NavLink>
        <NavLink to={ROUTES.AUTH.FORGOT_PASS}>Forgot Password?</NavLink>
      </div>
      {/* <div className="fg">
				<NavLink className="lf" to={STRINGS.ROUTES.AUTH.INDIVIDUAL_SIGN_IN}>
            Register as an <strong>individual</strong>&nbsp;
          </NavLink>
				<NavLink className="lf" to="#">
					Register as an <strong>individual</strong>&nbsp;
				</NavLink>
			</div> */}
    </>
  );
}

export default FormFooter;
