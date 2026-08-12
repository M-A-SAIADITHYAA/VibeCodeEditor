import {useSession} from "next-auth/react"

export const useCurrentUser = async () => {
    const session = await useSession()
    return session?.data?.user
    } 