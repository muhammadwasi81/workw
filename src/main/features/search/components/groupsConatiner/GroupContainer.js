import React from 'react'
import ListItem from './ListItem'

function RewardContainer() {
  return (
    <div className='SearchMainContainer'>
      <h5 className='containerHeading'>Groups</h5>
      <div className='groupContainer'>
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    </div>
  )
}

export default RewardContainer