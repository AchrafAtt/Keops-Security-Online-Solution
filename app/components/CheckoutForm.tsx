'use client'

import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import {useState,useEffect} from 'react'
import  formatPrice from "@/util/PriceFormat"
import { useCartStore } from '@/store'

export default function CheckoutForm({clientSecret}:{clientSecret : string}){
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading,setLoading] = useState(false)

  const cartStore = useCartStore()

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!
  },0)
  const formattedPrice = formatPrice(totalPrice)

  useEffect(() => {
    if(!stripe){
      return
    }
    if(!clientSecret){
      return
    }
  },[stripe])

  const  handelSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    if(!stripe || !elements){
      return
    }
    setLoading(true)
    stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    })
    .then((result) =>{
      if (!result.error){
        cartStore.setCheckout('success')
      }
      setLoading(false)
    } )
  }

  return(
    <form   onSubmit={handelSubmit} id='payment-form'>
      <PaymentElement  id='payment-element'options={{ layout:'tabs' }} />

      <h1 className='py-4 text-sm font-bold'>Total:{formattedPrice}</h1>
  <button className={`py-2 mt-4 w-full bg-primary rounded-md text-white`} id='submit' disabled={isLoading || 
  !stripe || !elements}>
    <span id='button-text'>
      {isLoading ? <span>Processing 👀  </span> : <span>Pay now 🔥 </span> }
    </span>
  </button>
    </form>
    
  )
}