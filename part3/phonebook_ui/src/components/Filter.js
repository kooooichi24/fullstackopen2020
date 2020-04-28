import React from 'react';

const Filter = ({ filterText, onChange }) => {
  return (
    <div>
      filter shown with <input value={filterText} onChange={onChange} />
    </div>
  )
}

export default Filter