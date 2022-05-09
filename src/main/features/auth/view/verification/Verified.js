import React, { useEffect, useState } from 'react'
// import loader from "../../../content/AuthContent/Bars-1.9s-413px.gif"
import "../styles/style.css"
// import { Random ,Wave} from 'react-animated-text';
import { useDispatch } from 'react-redux';
import verification from '../../store/slice'
// import Spinner from '../../../content/spinner/spinner';
function Verified() {


    const [setId] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        dispatch(verification(token)).then(x=>console.log(x,"VERIFYRESPONSE",token))

        setId(token)
    },[dispatch, setId])

    return (
        <div className="loader-div">
            {/* <h1>Verifiying Your Account !!!</h1> */}
            {/* <Wave
      text="Verifiying Your Account ..."
      effect="jump"
      effectChange={2.0}
      effectDuration={0.6}
    /> */}
                {/* <Spinner/> */}
            {/* <img src={loader} alt="" /> */}
        </div>
    )
}

export default Verified
