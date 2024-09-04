'use client';

import { useState, Suspense, lazy, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const VehicleData = lazy(() => import('../../components/VehicleData'));

export default function Home() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Enable button when both type and year are selected
  useEffect(() => {
    if (selectedType && selectedYear) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [selectedType, selectedYear]);

  return (
    <>
      <Head>
        <title>Car Dealer App</title>
        <meta
          name='description'
          content='Filter vehicles by type and model year'
        />
      </Head>

      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold text-center mb-4'>
          Car Dealer Application
        </h1>

        <div className='flex flex-col items-center'>
          <Suspense fallback={<div>Loading vehicle data...</div>}>
            <VehicleData
              setVehicleTypes={setVehicleTypes}
              setYears={setYears}
            />
          </Suspense>

          <label className='mb-2'>
            Vehicle Type:
            <select
              className='ml-2 p-2 border rounded text-black'
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              required
            >
              <option value=''>Select a type</option>
              {vehicleTypes?.map((type) => (
                <option key={type.makeId} value={type.makeId}>
                  {type?.makeName}
                </option>
              ))}
            </select>
          </label>

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

          <Link href={`/result/${selectedType}/${selectedYear}`}>
            <button
              className={`p-2 bg-blue-500 text-white rounded ${
                isButtonEnabled
                  ? 'opacity-100'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!isButtonEnabled}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
