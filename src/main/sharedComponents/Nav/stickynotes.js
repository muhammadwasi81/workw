import React from 'react';
import $ from 'jquery';
// import {closeStickyNotes, openStickyNotes} from "../../redux/notes/actions";
import {useDispatch, useSelector} from "react-redux";
import {closeStickyNotes, openStickyNotes} from "../../../store/appReducer/stickyNotesSlice";

// function StickyNotes() {
//     const dispatch = useDispatch();
//     const {open} = useSelector(state => state.stickyNotesSlice);
//     return (
//         <div className="toggle-menu">
//             <div className="toggle-label no-act" style={{margin: "0px 6px"}} onClick={() => {
//                 $('.toggle-menu').removeClass('on');
//                 $('.nav').css({'z-index': 0});
//                 if (!open) dispatch(openStickyNotes()); else dispatch(closeStickyNotes());
//             }}><i className="ic-notes"/></div>
//         </div>
//     )
// }

// export default StickyNotes;

/*
import React, {Component} from 'react';
import {closeStickyNotes, openStickyNotes} from "../../redux/notes/actions";
import {connect} from "react-redux";
import $ from "jquery";

class StickyNotes extends Component {
    render() {
        const {open, openStickNoteArea, closeStickNoteArea} = this.props;
        return (
            <div className="toggle-menu">
                <div className="toggle-label no-act" onClick={() => {
                    $('.toggle-menu').removeClass('on');
                    $('.nav').css({'z-index': 0});
                    if (!open) openStickNoteArea(); else closeStickNoteArea();
                }}><i className="ic-notes"/></div>
            </div>
        );
    }
}


const mapStateToProps = ({notes}) => ({open: notes.open});

const mapDispatchToProps = dispatch => ({
    openStickNoteArea: () => dispatch(openStickyNotes()),
    closeStickNoteArea: () => dispatch(closeStickyNotes())
});

export default connect(mapStateToProps, mapDispatchToProps)(StickyNotes)*/
