import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [mdp, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async(e) =>{
        e.preventDefault() //prevent refresh
        
        await login(email, mdp)
    }
    
    
    return ( 
        <form className='login' onSubmit={handleSubmit}>
            <h3>Login form</h3>

            <label>Email: </label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>

            <label>Password: </label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={mdp}/>
            <a href="/" style={{marginTop:'-15px', marginBottom:'20px'}}>Forgot password</a>

            <button disabled={isLoading}>Log in</button>
            {error && <div className="error">{error}</div> }

        </form>
     );
}
 
export default Login;