const SingleVehicle = ({ vehicle }) => {
  return (
    <li key={vehicle?.Model_ID} className='mb-2 p-4 bg-white shadow rounded'>
      <p className='text-lg font-semibold text-gray-600'>
        {vehicle?.Make_Name}
      </p>
      <p className='text-sm text-gray-600'>Model: {vehicle?.Model_Name}</p>
    </li>
  );
};

export default SingleVehicle;
