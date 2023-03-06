import React from 'react'
import ListItem from './ListItem'

function GroupContainer() {
  return (
    <div className='mb-3 mobuleContainer'>
      <h5 className='containerHeading'>Groups</h5>
      <div className='groupContainer'>
        <ListItem />
        <ListItem />
        <ListItem />
    </div>
    </div>
  )
}

export default GroupContainer