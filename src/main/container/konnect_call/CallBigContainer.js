import React from 'react';
import "./call.css"
import {MainContainer, MainSection} from "./KonnectCall.style";
import {MainCallContainer} from "./MainCallContainer";
import {BottomContainer} from "./BottomContainer";
import {useSelector} from "react-redux";

export function CallBigContainer() {
    const {acceptCallPending} = useSelector(({call}) => call);
    return (
        <MainContainer>
            <MainSection>
                {acceptCallPending ? <div>Loading...</div> : (
                    <>
                        <MainCallContainer/>
                        <BottomContainer/>
                    </>
                )}
            </MainSection>
        </MainContainer>
    )
}