import React, { useContext } from 'react'
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import {
    Divider,
    Tabs
} from 'antd';
import ProgressCard from './progressCard';

const TaskDetailRigthCol = () => {

    const { userLanguage } = useContext(LanguageChangeContext);
    const { sharedLabels } = dictionaryList[userLanguage];
    const { TabPane } = Tabs;

    return (
        <div className='task-rigth-inner-tabs' >
            <Tabs
                centered
                tabBarStyle={{ backgroundColor: "white", marginTop: "20px", borderRadius: "5px" }}
                defaultActiveKey="1"
            //   onChange={callback}
            >
                <TabPane tab="My Progress" key="1">
                   <ProgressCard />
                </TabPane>
                <TabPane tab="Comments" key="2">
                    <h1>Second</h1>
                </TabPane>
            </Tabs>
        </div>

    )
}



export default TaskDetailRigthCol