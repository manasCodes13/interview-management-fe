import { breadcrumbStore } from '@/store/global'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'

const Chat = () => {
    const [_, setBreadcrumb] = useAtom(breadcrumbStore)

    useEffect(() => {
        setBreadcrumb(["Chat"])
    }, [])

    return (
        <div>Chat</div>
    )
}

export default Chat