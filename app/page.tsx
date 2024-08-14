'use client'

import { DefaultUserForm } from '../components/forms/DefaultUserForm'
import { CustomBarChart } from '../components/charts/barChart'
import { useState, useEffect } from 'react'
import { getUserData } from '../services/UserService';
import { v4 as uuidv4 } from 'uuid';

export default function Page() {

  const [data, setData] = useState([]);
  const [userId, setUserId] = useState('');

  const updateData = async () => {
    const userId = localStorage.getItem('user-uuid');
    let storedData = await getUserData(userId);
    const jsonArray = (Object.keys(storedData?.userData).length !== 0) ? JSON.parse(JSON.stringify(storedData?.userData)) : [];
    setData(jsonArray);
  };

  const updateUserId = () => {
    const localStorageKey = 'user-uuid';
    let storageUserId = localStorage.getItem(localStorageKey);
    if (!storageUserId) {
      storageUserId = uuidv4();
      localStorage.setItem(localStorageKey, storageUserId);
    }
    setUserId(storageUserId);
  };

  useEffect(() => {
    updateUserId()
    updateData();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="text-2xl font-semibold bg-gray-100 rounded text-center">
        FuelUp
      </div>
      <div className="flex flex-col gap-2">
        <DefaultUserForm onSave={updateData} userData={data} userId={userId}/>
        <CustomBarChart data={data}/>
      </div>
    </div>
  )
}
