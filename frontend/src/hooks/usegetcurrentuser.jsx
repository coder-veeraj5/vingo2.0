
import React from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { url } from "../App";
function usegetcurrentuser() {
 useEffect(() => {

   
   const fetchuser=async()=>{
      try {
         const result=await axios.get(`${url}/api/user/currentuser`

         ,{withCredentials:true})
   
console.log(result);
      } catch (error) {
         console.log(error)
      }


}
fetchuser()

  } , [])
}


export default usegetcurrentuser;