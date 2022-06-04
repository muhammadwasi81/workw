import React, {useContext} from 'react';
import {STRINGS} from "../../../utils/base";
import {dictionaryList} from "../../../utils/localization/languages";
import {LanguageChangeContext} from "../../../utils/localization/localContext/LocalContext";
import {ContainerHeader} from "../../SharedComponent/AppComponents/MainHeader";
import HeaderNavLink from "../../SharedComponent/AppComponents/MainHeader/HeaderNavLink";
import {HeaderMenuContainer} from "../../SharedComponent/AppComponents/MainFlexContainer";
const Header = () => {
    const urlParam = `${new URL(window.location.href).searchParams.get("f")}`;
    const {userLanguage} = useContext(LanguageChangeContext);
    const label = dictionaryList[userLanguage];
return(
    <ContainerHeader>
    {/****** Menu items ******/}
    <HeaderMenuContainer>
        <HeaderNavLink urlParam={urlParam} activeName={"posts"}
                       isDefault={urlParam === "null"}
                       to={`${STRINGS.ROUTES.ROOT}?f=posts`}
                       linkName={label.appHeader.newsFeed.posts}/>
        <HeaderNavLink urlParam={urlParam} activeName={"photos"}
                       to={`${STRINGS.ROUTES.ROOT}?f=photos`}
                       linkName={label.appHeader.newsFeed.photos}/>
        <HeaderNavLink urlParam={urlParam} activeName={"videos"}
                       to={`${STRINGS.ROUTES.ROOT}?f=videos`}
                       linkName={label.appHeader.newsFeed.videos}/>
        <HeaderNavLink urlParam={urlParam} activeName={"polls"}
                       to={`${STRINGS.ROUTES.ROOT}?f=polls`}
                       linkName={label.appHeader.newsFeed.polls}/>
        <HeaderNavLink urlParam={urlParam} activeName={"docs"}
                       to={`${STRINGS.ROUTES.ROOT}?f=docs`}
                       linkName={label.appHeader.newsFeed.docs}/>
        <HeaderNavLink urlParam={urlParam} activeName={"tagged"}
                       to={`${STRINGS.ROUTES.ROOT}?f=tagged`}
                       linkName={label.appHeader.newsFeed.tagged}/>
    </HeaderMenuContainer>
    {/*<div className="right-menu">*/}
    {/*    <div className="btn-hld">*/}
    {/*        <button className="btn">*/}
    {/*            Create Group*/}
    {/*        </button>*/}
    {/*    </div>*/}
    {/*</div>*/}
</ContainerHeader>
)
}
export default Header