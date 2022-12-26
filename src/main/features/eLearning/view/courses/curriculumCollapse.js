import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;

function CurriculumCollapse({data, index}) {
	return (
        <Collapse defaultActiveKey={0}>
        <Panel
          header={data.name}
          key={index}
        >
          {data.topics.map((item) => {
              return <>
                <ol>
                  <li>
                    {item.name}
                  </li>
                </ol>
              </> 
            })
          }
        </Panel>
      </Collapse>
	);
}

export default CurriculumCollapse;
