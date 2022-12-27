import React from 'react';
import {MailContentBody} from "../style/mail.style";
import SearchMailBox from "./searchBox";
import {useSelector} from "react-redux";
import MobileHeader from "../Header/headerMob";
import MainBody from "./mainBody";
import MobileDrawer from "../Drawer/mobileDrawer";
import {useMediaQuery} from "react-responsive";
import MobileMailComposer from "../Composer/MobileMailComposer";
import EventDetail from '../../schedule/view/eventDetail';

const Index = () => {
    const isTablet = useMediaQuery({maxWidth: 768});
    const {mailMobComposerStatus} = useSelector(state => state.mailSlice);
    return (
        <MailContentBody>

            {!mailMobComposerStatus && isTablet && <MobileHeader/>} {/***mail responsive header above searchbar ***/}

            {/***mail responsive search and main body ***/}
            {!mailMobComposerStatus &&
            <>
                <SearchMailBox/>
                <MainBody/>
            </>}
            {/***mail responsive search and main body ***/}


            {isTablet && mailMobComposerStatus && <MobileMailComposer/>} {/***mobile mail composer ***/}

           {isTablet && <MobileDrawer/>} {/*** Folder Drawer  ****/}
        </MailContentBody>
    );
}

export default Index;