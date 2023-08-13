import BillboardForm from '@/components/BillboardForm'
import prismadb from '@/lib/prismadb'
import React from 'react'

const BillboardPage = async({params: {billboardId}}: {params: {billboardId: string}}) => {
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: billboardId
        }
    })

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <BillboardForm initialData={billboard}/>
        </div>
    </div>
  )
}

export default BillboardPage