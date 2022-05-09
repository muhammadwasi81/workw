import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Tabs } from 'antd';
import { ContBody, HeaderMenuContainer, TabbableContainer } from "../../SharedComponent/AppComponents/MainFlexContainer";
import { ContainerHeader } from "../../SharedComponent/AppComponents/MainHeader";
import HeaderNavLink from "../../SharedComponent/AppComponents/MainHeader/HeaderNavLink";
import { STRINGS } from '../../../utils/base';
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import SideDrawer from '../../SharedComponent/Drawer/SideDrawer';
import ShortCard from '../../SharedComponent/ShortCard/ShortCard';
import ResignationDetailCard from './ResignationDetail/resignationDetailCard';
import ResignationComposer from './ResignationComposer/ResignationComposer'

const Resignation = () => {

  const [show, setShow] = useState(false)

 const users = [
    {
      id: 1,
      name: "Salman Ahmed",
      designation: "React JS",
      discription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, quos aut! Cumque minus reprehenderit vero exercitationem repellat quae voluptatibus! Tempore odit minima Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, quos aut! Cumque minus reprehenderit vero exercitationem repellat quae voluptatibus! Tempore odit minima repellat quae voluptatibus! Tempore odit minima Cumque minus reprehenderit vero exercitationem repellat quae voluptatibus! Tempore odit minima repellat quae voluptatibus! Tempore.",
      time: "2 Days",
      reason: "Relocation",
      refrence: "TRA-000085",
    },
    {
      id: 2,
      name: "Shah Fahad",
      designation: "React JS",
      discription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, quos aut! Cumque minus reprehenderit vero exercitationem repellat quae voluptatibus! Tempore odit minima Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, quos aut! Cumque minus reprehenderit vero exercitationem repellat quae voluptatibus! Tempore odit minima repellat quae voluptatibus! Tempore odit minima Cumque minus reprehenderit vero exercitationem repellat quae voluptatibus! Tempore odit minima repellat quae voluptatibus! Tempore.",
      time: "3 Days",
      reason: "Relocation",
      refrence: "TRA-000085",
    },
]

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  const { userLanguage } = useContext(LanguageChangeContext);
  const {resignations, sharedLabels} = dictionaryList[userLanguage]; 

  const [currentTab, setCurrentTab] = useState("list");

  // const { search } = useLocation();
  // let pathName = search.split("=")[1];

  const label = dictionaryList[userLanguage];
  
  const handleChange = (e, user) => {
    setShow(true)
  }

  return (
      <>
        <TabbableContainer>
            <ContainerHeader>
                <HeaderMenuContainer>
                    <HeaderNavLink
                        activeName={"list"}
                        to={`${STRINGS.ROUTES.HR.RESIGNATIONS.DEFAULT}?f=list`}
                        isDefault={false}
                        linkName={resignations.resignation}
                        urlParam={currentTab}
                    />
                </HeaderMenuContainer>
                <div className="right-menu" style={{ paddingRight: "10px" }}>
                    <div className="btn-hld">
                        <SideDrawer title={resignations.createresignation} buttonText={resignations.createresignation}>
                            <ResignationComposer />
                        </SideDrawer>
                    </div>
                </div>
                <span className="ln" />
            </ContainerHeader>
            <ContBody>
              <Row className='CustomRow' gutter={[10, 6]}>
                <Col md={8} lg={8} xs={24} sm={24}>
                  <Tabs
                    centered
                    tabBarStyle={{backgroundColor:"white",marginTop:"20px",borderRadius:"5px"}}
                      defaultActiveKey="1"
                      onChange={callback}
                    >
                      <TabPane tab={resignations.forapproval} key="1">
                        <h3 style={{color: 'black'}}>Approvals List</h3>
                      </TabPane>
                      <TabPane tab={resignations.resignation} key="2">
                        {users.map((user) => (
                          <div onClick={((e) => handleChange(e, user))}>
                            <ShortCard 
                              key={user.id}
                              name={user.name}
                              designation={user.designation} 
                              time={user.time}
                              reason={user.reason} 
                              refrence={user.refrence}
                            />
                          </div>
                        ))}
                      </TabPane>
                    </Tabs>                  
                </Col>
                <Col md={16} lg={16} xs={24} sm={24} >
                  { show && <ResignationDetailCard name="Salman Ahmed" />  }
                </Col>
              </Row>
            </ContBody>

        </TabbableContainer>
      </>
  )
}

export default Resignation;
