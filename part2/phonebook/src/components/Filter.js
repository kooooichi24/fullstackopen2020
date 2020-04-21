import React from 'react';

const Filter = ({ onChange, filterText }) => {
  return (
    <div>
      filter shown with <input value={filterText} onChange={onChange} />
    </div>
  )
}

export default Filter