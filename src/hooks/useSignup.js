import { useState } from "react"
import {useAuthContext} from "./useAuthContext"

export const useSignup = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (nom,prenom,telephone, email, mdp, role) =>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/Signup', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nom,prenom,telephone, email, mdp, role})
        })
        const json = await response.json()  //email+token

        if (!response.ok){
            setError(json.error)
            setIsLoading(false)
        }
        if (response.ok){
            //save the user to the local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the AuthContext
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        } 
    }
    return {signup, isLoading, error }
}