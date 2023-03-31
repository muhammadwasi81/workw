import React from 'react'
import { Avatar, Button, List, Skeleton } from 'antd';

const UserContainer = () => {
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
  return (
    <div>
        <h5 className='containerHeading'>Users</h5>
        <div className='SearchMainContainer'>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                    >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                        avatar={<Avatar 
                            src={`https://joesch.moe/api/v1/random?key=${index}`}
                            />}
                        title={<a href="https://ant.design">{"Salman Ahmed"}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div>
                    </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    </div>
  )
}

export default UserContainer