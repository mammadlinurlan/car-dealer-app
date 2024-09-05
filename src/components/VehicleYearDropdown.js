import React from 'react';

const VehicleYearDropdown = ({ years, selectedYear, setSelectedYear }) => {
  return (
    <label className='mb-4'>
      Model Year:
      <select
        className='ml-2 p-2 border rounded text-black'
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        required
      >
        <option value=''>Select a year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </label>
  );
};

export default VehicleYearDropdown;
