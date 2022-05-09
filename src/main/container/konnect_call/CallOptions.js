import React from 'react';
import "./call.css"
import {IoChatbubblesOutline, IoMicOutline, IoVideocamOutline} from "react-icons/io5";
import {MdCallEnd} from "react-icons/md";
import {RiLayoutMasonryLine, RiShareForwardBoxFill} from "react-icons/ri";
import {BsInfoCircle} from "react-icons/bs";
import {FiUsers} from "react-icons/fi";
import {CgPoll} from "react-icons/cg";

export function CallMainOptions() {
    return (
        <div className="call-options callmainopt">
            <div className="call-opt-btn">
                <div className="btnview" style={{background: "#1A5669"}}>
                    <IoVideocamOutline size="24px"/>
                </div>
                <p className="label">Cam</p>
            </div>
            <span className="space"/>
            <div className="call-opt-btn">
                <div className="btnview" style={{background: "#FFFFFF"}}>
                    <IoMicOutline size="24px" color="#1A5669"/>
                </div>
                <p className="label">Mic</p>
            </div>
            <span className="space"/>
            <div className="call-opt-btn">
                <div className="btnview" style={{background: "#EA4335"}}>
                    <MdCallEnd size="24px"/>
                </div>
                <p className="label">End Call</p>
            </div>
        </div>
    )
}

export function CallOtherOptions() {
    return (
        <div className="callotheropt">
            <div className="call-opt-btn">
                <div className="btnview" style={{background: "rgba(229,229,229,0.5)"}}>
                    <RiLayoutMasonryLine size="24px" color="white"/>
                </div>
            </div>
            <span className="space"/>
            <div className="call-opt-btn">
                <div className="btnview" style={{background: "rgba(229,229,229,0.5)"}}>
                    <BsInfoCircle size="24px" color="white"/>
                </div>
            </div>
            <span className="space"/>
            <div className="call-opt-btn">
                <div className="btnview" style={{background: "rgba(229,229,229,0.5)"}}>
                    <FiUsers size="24px" color="white"/>
                </div>
            </div>
            <span className="space"/>
            <div className="call-opt-btn">
                <div className="btnview" style={{background: "rgba(229,229,229,0.5)"}}>
                    <IoChatbubblesOutline size="24px" color="white"/>
                </div>
            </div>
            <span className="space"/>
            <div className="call-opt-btn">
                <div className="btnview" style={{background: "rgba(229,229,229,0.5)"}}>
                    <RiShareForwardBoxFill size="24px" color="white"/>
                </div>
            </div>
            <span className="space"/>
            <div className="call-opt-btn">
                <div className="btnview" style={{background: "rgba(229,229,229,0.5)"}}>
                    <CgPoll size="24px" color="white"/>
                </div>
            </div>
            <span className="space"/>
        </div>
    )
}