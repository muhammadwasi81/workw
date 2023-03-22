import { Skeleton } from 'antd'
import React from 'react'
import "./style.css"

function ThumbnailSkeleton({count}) {

  return (
    count.map(() => {
        return  <div className="thumbnailSkeleton">
                  <Skeleton.Image className='Image' active  />
                  <Skeleton active />
              </div>
      })
  )
}

export default ThumbnailSkeleton