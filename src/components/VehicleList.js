'use client';

import { Suspense, lazy } from 'react';

const SingleVehicle = lazy(() => import('@/components/SingleVehicle'));

export default function VehicleList({ vehicles }) {
  return (
    <ul className='list-disc pl-5'>
      {vehicles?.length > 0 ? (
        vehicles.map((vehicle) => (
          <Suspense
            fallback={
              <div className='bg-black text-white'>Loading vehicle...</div>
            }
            key={vehicle.Model_Id}
          >
            <SingleVehicle vehicle={vehicle} />
          </Suspense>
        ))
      ) : (
        <p className='text-lg text-gray-700'>No vehicles found.</p>
      )}
    </ul>
  );
}
