import React from 'react'
import ListItem from './ListItem'

function GroupContainer() {
  return (
    <div className='SearchMainContainer'>
      <h5 className='containerHeading'>Rewards</h5>
      <div className='groupContainer'>
        <ListItem />
        <ListItem />
        <ListItem />
    </div>
    </div>
  )
}

export default GroupContainer