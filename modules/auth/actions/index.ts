"use server"

//Usually you put it at the top of a file containing functions that 
// should be
//  callable from the client but execute on the server:

import {auth} from "@/auth"
import {db} from "@/lib/db"

export const getUserById = async (id:string)=>{
    try{
        const user = await db.user.findUnique({
            where :{
                id: id
            },

            include:{
                accounts:true
            }
        })

        return user
    }
    catch(error){
        console.log("Error fetching user by id:", error)
        throw new Error("Error fetching user by id")
    }
}

export const getAccountByUserId = async (userId:string)=>{
    try{
        const account = await db.account.findFirst({
            where:{
                userId: userId
            }

            
        })

    }
    catch(error){
        console.log("Error fetching account by user id:", error)
        throw new Error("Error fetching account by user id")
    }
}

export const currentUser = async ()=>{
    const user = await auth()
    return user?.user
}