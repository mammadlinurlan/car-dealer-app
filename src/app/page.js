'use client';

import { useState, Suspense, lazy, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';

const VehicleTypeDropdown = lazy(
  () => import('@/components/VehicleTypeDropdown'),
);
const VehicleYearDropdown = lazy(
  () => import('@/components/VehicleYearDropdown'),
);

export default function Home() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
      )
      .then((response) => {
        const types = response.data.Results.map((item) => {
          return {
            makeId: item?.MakeId,
            makeName: item?.MakeName,
          };
        });
        setVehicleTypes([...new Set(types)]);
      })
      .catch((error) => {
        console.error('Error fetching vehicle types:', error);
      });

    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let year = 2015; year <= currentYear; year++) {
      yearsList.push(year);
    }
    setYears(yearsList);
  }, [setVehicleTypes, setYears]);
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
          <Suspense fallback={<div>Loading vehicle types...</div>}>
            <VehicleTypeDropdown
              vehicleTypes={vehicleTypes}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </Suspense>

          <Suspense fallback={<div>Loading vehicle types...</div>}>
            <VehicleYearDropdown
              years={years}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          </Suspense>

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
