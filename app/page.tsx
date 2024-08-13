'use client'

import { DefaultUserForm } from '../components/forms/DefaultUserForm'
import { CustomBarChart } from '../components/charts/barChart'

export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-bold">Hello, FuelUp is a demo!</h1>
      <div className='flex gap-2'>
        <DefaultUserForm/>
        <CustomBarChart/>
      </div>
    </>
  )
}
