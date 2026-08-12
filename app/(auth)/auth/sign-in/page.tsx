//(auth)

// is a route group.

// The parentheses mean:

// "Organize these routes together, but don't put auth in the URL."

import SignInFormClient from '@/modules/auth/components/sign-in-form-clients'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    <>
    <Image src={"/login.svg"} alt='Login-Image' height={300}  width={300} className='m-6 object-cover'/>
    <SignInFormClient/>
    </>
  )
}

export default Page