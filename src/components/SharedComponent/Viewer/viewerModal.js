// import React, {Component} from 'react';
// import {Dialog, IconButton} from '@material-ui/core';
// import CancelIcon from '@material-ui/icons/Cancel';
// import Viewer from './index';

// class ViewerModal extends Component {

//     constructor(props) {
//         super(props);
//         this.state={open:true}
//     }

//     handleClose = ()=>{
//         this.props.closeViewerModal()
//         this.setState({open:false})
//     }

//     render() {

//         const {path}=this.props;

//         return (
//             <Dialog
//             open={this.state.open}
//                 fullWidth={true}
//                 maxWidth={"xl"}
//                 aria-describedby="alert-dialog-description"
//                 aria-labelledby="max-width-dialog-title"
//                 onClose={this.handleClose}
//                 contentStyle={{width: "100%", maxWidth: "none", overFlowY: 'hidden' }}
//                 >
//                     <div style={{display:"flex",flexDirection:"column"}}>
//                         <div className="" style={{display:"flex",justifyContent:"flex-end",alignItem:"flex-end",width:"100%"}}>
//                             <IconButton onClick={()=> this.props.closeViewerModal() }>
//                                 <CancelIcon style={{color:"black"}}/>
//                             </IconButton>
//                         </div>
//                         <div style={{height:'100vh',width:'100%'}}>
//                             <Viewer path={path} />

//                         </div>
//                     </div>

//             </Dialog>

//         );
//     }
// }

// export default ViewerModal;
