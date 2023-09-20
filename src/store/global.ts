import { atom } from 'jotai'
import { create } from 'zustand'

type State = {
    email: string
}

type Action = {
    addAuthEmail: (email: State['email']) => void
}

export const userAuthDetails = create<State & Action>((set) => ({
    email: '',
    addAuthEmail: (email) => set((state) => ({ email: email }))
}))

interface userDetailsProps {
    [key: string]: any;
}


export const authDetails = atom({})
export const userDetail = atom<userDetailsProps>({});
export const accessTokenStore = atom<string>("")
export const reloaduserDetails = atom<boolean>(false)
export const breadcrumbStore = atom<any>([])