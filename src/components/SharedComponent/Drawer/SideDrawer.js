import React, { useContext, useEffect, useState } from 'react'
import { Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { LanguageChangeContext } from '../../../utils/localization/localContext/LocalContext';
import { dictionaryList } from '../../../utils/localization/languages';
import {useMediaQuery} from "react-responsive";
import SharedButton from "../button";

function SideDrawer({title, buttonText, children, ...props}) {


  const {userLanguage} = useContext(LanguageChangeContext);
  const {Direction} = dictionaryList[userLanguage];
  const [state, setstate] = useState({visible:false})
  const isTablet = useMediaQuery({maxWidth: 650});

  useEffect(() => {
    console.log(isTablet,"WIDTH")
  }, [isTablet])

 const showDrawer = () => {
   setstate({...state,visible:true})
  };

 const onClose = () => {
   setstate({...state,visible:false})
    
  };
    return (
        <>
            <SharedButton
                type="primary"
                onClick={showDrawer}
                shape="square"
                title={buttonText}
                antIcon={<PlusOutlined />}
                style={{backgroundColor: "#1b5669", borderRadius: "8px"}}
            />
        <Drawer
          title={title}
          placement={Direction==="rtl"?"left":"right"}
          width={isTablet ? "100%" : 768}
          onClose={onClose}
          visible={state.visible} 
          bodyStyle={{ paddingBottom: 80 }}
        >
          {children}
        </Drawer>
      </>
    )
}

export default SideDrawer
