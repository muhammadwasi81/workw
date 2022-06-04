// import React from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// // import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// // import DialogContent from '@material-ui/core/DialogContent';
// // import DialogTitle from '@material-ui/core/DialogTitle';
// import $ from 'jquery';
// import Modal from "@material-ui/core/Modal";
// import {makeStyles} from "@material-ui/core/styles";

// // const Transition = React.forwardRef(function Transition(props, ref) {
// //     return <Slide direction="down" ref={ref} {...props} />;
// // });

// function getModalStyle() {
//     const top = 50;
//     const left = 50;

//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

// const useStyles = makeStyles((theme) => ({
//     paper: {
//         position: "absolute",
//         // width: 400,
//         backgroundColor: theme.palette.background.paper,
//         border: "2px solid #fff",
//         boxShadow: theme.shadows[5],
//         // padding: theme.spacing(2, 4, 3),
//         padding: 15,
//         borderRadius: 10,
//     },
//     privacy_image: {height: '14px', width: '14px'},
//     errorMessage: {display: 'flex', color: 'red', width: '100%', justifyContent: 'center'},
//     pd_b: {paddingBottom: '10px'},
//     text_container: {display: 'flex', alignItems: 'center'},
//     m_r: {marginLeft: '8px'},
//     m_t: {marginTop: '13px'}

// }));
// export default function ApprovalRemarksDialog(props) {
//     const [text, settext] = React.useState("");
//     const classes = useStyles();
//     const [modalStyle] = React.useState(getModalStyle);
//     const [isEmptyField, setIsEmpty] = React.useState("");
//     const handleClose = () => {
//         props.cancel();
//         settext("");
//     };

//     const handleAccept = () => {
//         if(text !== '') {
//             let obj = {
//                 remark:text,
//                 approval:props.approval,
//                 action:props.action,
//                 isOpen:true
//             };
//             props.handleAddComment(obj);
//             settext("");
//             props.cancel();
//         }else {
//             setIsEmpty("Remark Required.")
//         }
//     };

//     const handleOnChange = event => {
//         settext(event.target.value);
//         setIsEmpty('')
//     };

//     $('#name').keyup((e)=>{
//         if(e.keyCode === 13){
//             $('.addComment').click();
//             e.preventDefault();
//         }
//     });

//     const body=(
//         <div style={modalStyle} className={classes.paper + " modalWidth"}>
//             <div id="simple-modal-description"/>
//             <p id="simple-modal-description"> Remarks</p>
//            {/* <Dialog
//                 open={props.isDialogOpen}
//                 // onClose={handleClose}
//                 aria-labelledby="form-dialog-title"
//                 Transitionelement={Transition} >
//                 <DialogTitle id="form-dialog-title">
//                     Remarks
//                 </DialogTitle>*/}
//                {/* {isEmptyField && (<div style={{display:'flex',color:'red',width: '100%',
//                     justifyContent: 'center'}}>{isEmptyField}</div>)}*/}
//                 {isEmptyField && (<div className={classes.errorMessage}>
//                     {isEmptyField}</div>)}
//             <div className={`"row" ${classes.pd_b}`}>

//                     {/* <DialogContentText>Enter your remarks.</DialogContentText> */}
//                 <div className={classes.text_container}>
//                        <TextField
//                            autoFocus
//                            margin="dense"
//                            id="name"
//                            // label="Remark"
//                            type="text"
//                            onKeyUp={(e)=> {
//                                if(e.keyCode === 13){handleAccept()}
//                            }}
//                            onKeyDown={(e)=>{if(e.keyCode === 13 && !e.shiftKey){e.preventDefault()}}}
//                            placeholder="Type your remarks"
//                            fullWidth
//                            onChange={handleOnChange}
//                            value={text}
//                            multiline={false}
//                        />
//                    </div>
//                 </div>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">Cancel</Button>
//                     <Button onClick={handleAccept} className="addComment" color="primary"  >Done</Button>
//                 </DialogActions>
//             {/*</Dialog>*/}
//         </div>
//     )

//     return (
//         // <div>
//         //     <Dialog
//         //         open={props.isDialogOpen}
//         //         // onClose={handleClose}
//         //         aria-labelledby="form-dialog-title"
//         //         Transitionelement={Transition} >
//         //         <DialogTitle id="form-dialog-title">
//         //             Remarks
//         //         </DialogTitle>
//         //         {isEmptyField && (<div style={{display:'flex',color:'red',width: '100%',
//         //             justifyContent: 'center'}}>{isEmptyField}</div>)}
//         //         <DialogContent>
//         //             {/* <DialogContentText>Enter your remarks.</DialogContentText> */}
//         //             <TextField
//         //                 autoFocus
//         //                 margin="dense"
//         //                 id="name"
//         //                 // label="Remark"
//         //                 type="text"
//         //                 onKeyUp={(e)=> {
//         //                     if(e.keyCode === 13){
//         //                         handleAccept()
//         //                     }
//         //
//         //                 } }
//         //                 onKeyDown={(e)=>{
//         //                     if(e.keyCode === 13 && !e.shiftKey){
//         //                         e.preventDefault()
//         //                     }
//         //                 }}
//         //                 placeholder="Type your remarks"
//         //                 fullWidth
//         //                 onChange={handleOnChange}
//         //                 value={text}
//         //                 multiline={false}
//         //             />
//         //         </DialogContent>
//         //         <DialogActions>
//         //             <Index onClick={handleClose} color="primary">
//         //                 Cancel
//         //             </Index>
//         //             <Index onClick={handleAccept} className="addComment" color="primary"  >
//         //                 Done
//         //             </Index>
//         //         </DialogActions>
//         //     </Dialog>
//         // </div>
//         <div>
//             <div>
//                 <Modal
//                     open={props.isDialogOpen ? props.isDialogOpen: false}
//                     onClose={handleClose}
//                     aria-labelledby="simple-modal-title"
//                     aria-describedby="simple-modal-description">
//                     {body}
//                 </Modal>
//             </div>
//         </div>
//     );
// }
