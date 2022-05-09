import React from 'react'
import { Row, Col } from 'antd'
import SearchInput from '../searchBox/SearchInput'
import { SearchOutlined} from '@ant-design/icons'
import './style.css'
import { useState } from 'react'


const TopBar = ({ icons, gridIcons }) =>  {
    const [fullWidth, setFullWidth] = useState(false)

    const handleWidth = () => {
        setFullWidth(true)
    }

  return (
    <>
        <div className='topBar'>
        <Row style={{justifyContent: 'flex-end'}}>
            <Col span={24} className="inner">
                <div className={ fullWidth ? 'searchBox' : 'width50'} onClick={handleWidth}>
                    <SearchInput 
                        style={{
                            backgroundColor: "#F4F4F4",
                            border: "1px solid #1A5669",
                            height: "35px"
                        }}
                        onChange={(e) => console.log('hello')}
                        onBlur={() => setFullWidth(false)}
                        icon={<SearchOutlined />}
                        placeholder="Search"
                        
                    />
                </div>
                <div className='icons'>
                    <div className='allIcons'>
                        {icons}
                    </div>
                    <div className='gridIcons'>
                        {gridIcons}
                    </div>
                </div>
            </Col>
        </Row>
        </div>
    </>
  )
}

export default TopBar