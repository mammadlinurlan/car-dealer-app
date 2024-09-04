import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VehicleData = ({ setVehicleTypes, setYears }) => {
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

  return null; // This component doesn't render anything
};

export default VehicleData;
