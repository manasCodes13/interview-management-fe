import { breadcrumbStore } from '@/store/global'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'



const Dashboard = () => {
    const [_, setBreadcrumb] = useAtom(breadcrumbStore)

    useEffect(() => {
        setBreadcrumb(["Dashboard"])
    }, [])


    return (
        <div className='w-full h-full flex justify-center overflow-scroll'>
            Dashobard
        </div>
    )
}

export default Dashboard