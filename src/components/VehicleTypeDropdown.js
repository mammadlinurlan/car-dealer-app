import React from 'react';

const VehicleTypeDropdown = ({
  vehicleTypes,
  selectedType,
  setSelectedType,
}) => {
  return (
    <label className='mb-2'>
      Vehicle Type:
      <select
        className='ml-2 p-2 border rounded text-black'
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        required
        disabled={!vehicleTypes.length > 0}
      >
        <option value=''>Select a type</option>
        {vehicleTypes?.map((type) => (
          <option key={type.makeId} value={type.makeId}>
            {type?.makeName}
          </option>
        ))}
      </select>
    </label>
  );
};

export default VehicleTypeDropdown;
