'use client'

import { DefaultUserForm } from '../components/forms/DefaultUserForm'
import { CustomBarChart } from '../components/charts/barChart'
import { useState, useEffect } from 'react'


export default function Page() {

  const [data, setData] = useState<any[]>([]);

  const updateData = () => {
    const storedData = localStorage.getItem('userData');
    const jsonArray = storedData ? JSON.parse(storedData) : [];
    setData(jsonArray);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="text-2xl font-semibold bg-gray-100 rounded text-center">
        FuelUp
      </div>
      <div className="flex flex-col gap-2">
        <DefaultUserForm onSave={updateData} />
        <CustomBarChart data={data}/>
      </div>
    </div>
  )
}
