import React from 'react'
import { Row, Col } from 'antd'
import SearchInput from '../searchBox/SearchInput'
import { SearchOutlined} from '@ant-design/icons'
import './style.css'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'


const TopBar = ({ buttons, gridIcons }) =>  {
    const [fullWidth, setFullWidth] = useState(false)

    const isLaptop = useMediaQuery({ maxWidth: 1230 });

    const isTablet = useMediaQuery({ maxWidth: 800 });

    const handleWidth = () => {
        setFullWidth(true)
    }

  return (
    <>
        <div className='topBar'>
        <Row>
            <Col span={isTablet ? 18 : 6} className="inner">
            {/* width50 */}
                <div className={ fullWidth ? 'searchBox' : 'searchBox'} onClick={handleWidth}>
                    <SearchInput 
                        style={{
                            backgroundColor: "#F4F4F4",
                            border: "1px solid #1A5669",
                            height: "30px"
                        }}
                        onChange={(e) => console.log('hello')}
                        onBlur={() => setFullWidth(false)}
                        icon={<SearchOutlined />}
                        placeholder="Search"
                        
                    />
                </div>
            </Col>
            {
                isTablet ? 
                <Col span={6} className="gridIconColumn" style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <div className='gridIcons'>
                        {gridIcons}
                    </div>
                </Col>
                    : ""
            }
            <Col span={isTablet ? 24 : 18} className="inner2">
                <Row className={isTablet ? "forMobile" : "btnRow"} >
                    <Col span={isTablet ? 24 : 17}>
                        <div className='icons'>
                            {buttons}
                        </div>
                    </Col>
                    {
                        isTablet ? "" :
                            <Col span={7} className="gridInner" style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <div className='gridIcons'>
                                    {gridIcons}
                                </div>
                            </Col>
                    }
                </Row>
            </Col>
        </Row>
        </div>
    </>
  )
}

export default TopBar