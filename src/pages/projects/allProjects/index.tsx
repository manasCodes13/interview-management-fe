import { breadcrumbStore } from '@/store/global'
import { Button, Typography } from 'antd'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'

const { Title } = Typography;


const Projects = () => {
  const [_, setBreadcrumb] = useAtom(breadcrumbStore)

  useEffect(() => {
    setBreadcrumb(["Projects", "All Projects"])
  }, [])

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full flex justify-between'>
        <Title level={3}>ALL PROJECTS</Title>
        <Button className='h-10 text-white text-lg'>New Project</Button>
      </div>

    </div>
  )
}

export default Projects
