import { Button, DatePicker, Input, Typography } from 'antd'
import React, { useState } from 'react'
import TextInput from '../../../SharedComponent/Input/TextInput'

function BonusComposer() {
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  return (
    <form className="travel-composer">

      <div className="input-row">
        <Typography level={5} >
          Subject
        </Typography>
        <TextInput placeholder="Enter Group Name..." />
      </div>

      <div className="input-row">
        <Typography level={5}>
          Description
        </Typography>
        <TextArea
          style={{ borderRadius: "5px" }}
          placeholder="Enter Description"
          rows={4}
        />
      </div>

      <Button type="primary" style={{ fontWeight: "bold", marginTop: "10px" }} block>
        Create Bonus
      </Button>

    </form>
  )
}

export default BonusComposer