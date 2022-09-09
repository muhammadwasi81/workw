import { DatePicker, Select } from 'antd';
import React from 'react';

const CreateVoucherOptions = ({
  handleChange
}) => {

  return (
    <div className='flex justify-between items-center my-2 bg-white px-4 py-2 rounded-md' >
      <div className='flex justify-between'>
        <div className='mr-2  w-[170px]' >
          <div>Select month & year</div>
          <DatePicker picker='month' placeholder='Select month & year' className='w-full' />
        </div>
        <div className='mr-2  w-[170px]' >
          <div>Disperse Date</div>
          <DatePicker picker='month' placeholder='Disperse Date' className='w-full' />
        </div>
        
      </div>
    </div>
  )
}
export default CreateVoucherOptions;