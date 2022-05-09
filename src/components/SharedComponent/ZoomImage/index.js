import React, { Component} from 'react';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';

import 'react-medium-image-zoom/dist/styles.css'
export default class ZoomImage extends Component{

    constructor(props){
        super(props);
        this.state={
            isZoom:false,
            w:'100%',
            h:'100%'
        }
    }

    /*handleZoom = () =>{
        this.setState({isZoom:true})
    };*/

    handleZoomChange = shouldZoom =>{
        //console.log(shouldZoom)
        this.setState({isZoom:shouldZoom})
    };

    render() {
        let {comp,stl,wp,hp,d} = this.props;
        let {w,h} = this.state;
        return (
            <React.Fragment>
                {
                    comp !== undefined ?
                    <ControlledZoom isZoomed={this.state.isZoom} onZoomChange={this.handleZoomChange.bind(this)}>
                                <img className={`${stl}`} style={{
                                    width:`${wp === undefined ? w : wp}`,
                                    height:`${hp === undefined ? h : hp}`,
                                    justifyContent:'center',
                                    objectFit: 'contain',
                                    display:`${d === undefined ? `inherit` : d}`
                                    }} alt="#" src={comp} />
                    </ControlledZoom> : ''
                }

            </React.Fragment>
        );
    }
}