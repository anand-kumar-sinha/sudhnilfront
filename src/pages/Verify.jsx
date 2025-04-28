import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {
  const {navigate , token , setCartItems, backandUrl} = useContext(ShopContext)
  const [searchParams , SetSearchParams] = useSearchParams()

  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const verifyPyment = async (req , res) => {

       try{
        if(!token){
          return null
        }else{
          const responce = await axios.post(backandUrl + '/api/order/verifyStripe' , {success,orderId},{headers:{token}})
          if(responce.data.success){
            setCartItems({})
            navigate('/orders')
          }else{
            navigate('/cart')
          }
        }

       }catch(error){

        console.log(error)
        toast.error(error.message)

       }

  }

  useEffect(() => {

    verifyPyment()

  },[token])
  return (
    <div>

    </div>
  )
}

export default Verify