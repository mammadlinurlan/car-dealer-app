import axios from 'axios';
import VehicleList from '@/components/VehicleList';

export default async function ResultsPage({ params }) {
  const { year, make } = params;

  let vehicles = [];
  try {
    const response = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${make}/modelyear/${year}?format=json`,
    );

    vehicles = response.data.Results;
  } catch (error) {
    //  console.log(error.response.data.message);
  }
  return (
    <div className='p-6  bg-gray-100 min-h-screen'>
      <h1 className='text-2xl pl-5 font-bold mb-4 text-black'>
        Results for vehicles with year {year} - makeId {make}
      </h1>
      <VehicleList vehicles={vehicles} />
    </div>
  );
}

export async function generateStaticParams() {
  const makesResponse = await fetch(
    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
  );
  const makesData = await makesResponse.json();
  const makes = makesData.Results;
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const paths = [];
  for (const year of years) {
    for (const make of makes.slice(0, 10)) {
      paths.push({
        year: `${year}`,
        make: make.MakeId,
      });
    }
  }
  return paths.map((path) => ({
    make: `${path.make}`,
    year: path.year,
  }));
}
