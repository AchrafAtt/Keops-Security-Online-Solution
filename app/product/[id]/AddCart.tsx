'use client'
import { useCartStore } from '@/store'
import { AddCartType } from '@/type/AddCartType'
import {useState} from 'react'

export default function AddCart({
  name, 
  id,
  image,
  unit_amount,
  quantity }: AddCartType){
    const  cartStore = useCartStore()
    const [added,setAdded] = useState(false)
    
    const handelerAddToCart = ()=>{
      cartStore.addProduct({id,image,unit_amount,quantity, name})
      setAdded(true)
      setTimeout(()=>{
        setAdded(false)
      },500 )

    }
  return (
    <>
    <button onClick={handelerAddToCart} disabled={added}
    className="my-4 btn btn-primary w-full"> {!added && <span>Add to cart</span>}
    {added && <span>Adding to cart ⚙️</span>}

    </button>
    </>
  )
  }