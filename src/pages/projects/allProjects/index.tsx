import { breadcrumbStore } from '@/store/global'
import { Button, ColorPicker, DatePicker, Input, Modal, Select, Switch, Typography } from 'antd'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'

const { Title } = Typography;

const Projects = () => {
  const [_, setBreadcrumb] = useAtom(breadcrumbStore)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setBreadcrumb(["Projects", "All Projects"])
  }, [])

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full flex justify-between'>
        <Title level={3}>ALL PROJECTS</Title>
        <Button className='h-10 text-white text-lg' onClick={showModal}>New Project</Button>
      </div>
      <Modal title="Create Project" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={[
          <Button className='text-white'>
            OK
          </Button>,
          <Button className='text-white'>
            Cancel
          </Button>
        ]}
      >
        <div>
          <label>Name</label>
          <Input size='large' className='mt-1' placeholder='Name' />
        </div>
        <div className='mt-3'>
          <label>Unique Name</label>
          <Input size='large' className='mt-1' placeholder='Unique Name' />
        </div>
        <div className='mt-5 flex flex-col'>
          <label>Color</label>
          <ColorPicker size='large' className='w-5 mt-1' />
        </div>
        <div className='w-full mt-3 flex flex-col'>
          <label>Private</label>
          <Select
            className='mt-1'
            size='large'
            defaultValue="private"
            options={[
              { value: 'public', label: 'Public' },
              { value: 'private', label: 'Private' },
            ]}
          />
        </div>
        <div className='w-full mt-3 flex items-center justify-between'>
          <div className='w-1/2 flex flex-col'>
            <label>Start Date</label>
            <DatePicker />
          </div>
          <div className='w-1/2 flex justify-end'>
            <Switch defaultChecked />
          </div>
        </div>

      </Modal>
    </div>
  )
}

export default Projects
