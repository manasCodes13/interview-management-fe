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


