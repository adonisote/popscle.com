import { login, signup } from './actions'
import { Input } from '@/components/ui/input' // to be implemented
import { Button } from '@/components/ui/button' // to be implemented
import { Form } from '@/components/ui/form' // to be implemented

export default function LoginPage() {
  return (
    <>
      <form>
        <label htmlFor="email">Email:</label>
        <input className='text-black' id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input className='text-black' id="password" name="password" type="password" required />
        <button className='border border-white' formAction={login}>Log in</button>
        <button className='border border-white' formAction={signup}>Sign up</button>
      </form>
    </>

  )
}