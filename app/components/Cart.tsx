'use client'
import Image from "next/image"
import { useCartStore } from "@/store"
import formatPrice from "@/util/PriceFormat"
import {IoAddCircle, IoRemoveCircle} from 'react-icons/io5'
import panier from '@/public/panier.png'
import {motion,AnimatePresence } from 'framer-motion'
import Checkout from "./Checkout"
import OrderConfirmed from "./OrderConfirmed"


export default function Cart(){
  const cartStore= useCartStore()

  //total price
  const totalPrice = cartStore.cart.reduce((acc,item) => {
    return acc + item.unit_amount!* item.quantity!
  },0)

  return(
    <motion.div  
    initial={{ opacity:0 }}
    animate={{ opacity:1 }}
    exit={{ opacity:0 }}
    onClick={()=> cartStore.toggleCart()} className="fixed w-full h-screen left-0 top-0 bg-black/25">

      {/* Cart */}
      <motion.div
      layout 
      onClick={(e)=> e.stopPropagation() } className="bg-white absolute right-0 top-0  h-screen p-12 overflow-scroll w-full lg:w-2/5">
        {cartStore.onCheckout === 'cart' && (
        <button className="text-sm font-bold pb-12" 
        onClick={()=> cartStore.toggleCart()}
        >Back to store 🏃‍♂️ </button>
        )}
        {cartStore.onCheckout === 'checkout' && (
        <button className="text-sm font-bold pb-12" 
        onClick={()=> cartStore.setCheckout('cart')}
        >Check your cart 🛒   </button>
        )}
{/* cart items */}
      {cartStore.onCheckout === 'cart' && (

       <> 
        {cartStore.cart.map((item) => (
        <motion.div layout key={item.id} className="felx py-4 gap-4">
            <Image 
            className="rounded-md h-24" 
            src={item.image} 
            alt={item.name}  
            width={120} 
            height={129}/>
          
          <div>
          <h2>{item.name}</h2>
          <div className="flex gap-2">
            <h2>
            Qantity: {item.quantity}
            </h2>
            <button onClick={()=> cartStore.addProduct({id:item.id,
              image:item.image,
              unit_amount: item.unit_amount,
              quantity: item.quantity,
              name: item.name})}>
             <IoAddCircle/>
            </button>
            <button onClick={()=> cartStore.removeProduct({id:item.id,
              image:item.image,
              unit_amount: item.unit_amount,
              quantity: item.quantity,
              name: item.name})}>
             <IoRemoveCircle/>
            </button>
          </div>

          <p className="text-sm">{item.unit_amount && formatPrice(item.unit_amount )}</p>

          </div>
        </motion.div>
        ))}
       </> 
        )}

        {/*Checkout and total */}
        {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
        <motion.div layout  >
          <p>Total : {formatPrice(totalPrice)}</p>
          
          <button onClick={() => cartStore.setCheckout("checkout")} className="py-2 mt-4 w-full bg-primary rounded-md text-white">Checkout</button>
          
        </motion.div>
        ): null}
    {/*Checkout Form */}
          {cartStore.onCheckout === 'checkout' && <Checkout/> }
          {cartStore.onCheckout === 'success' && <OrderConfirmed/>}

        <AnimatePresence>
        {!cartStore.cart.length && cartStore.onCheckout === "cart" &&(
          <motion.div
          animate={{scale:1, rotateZ :0, opacity:0.75}}
          initial={{ scale:0.5 , rotateZ: -10, opacity:0 }}
          exit={{ scale:0.5 , rotateZ: -10, opacity:0 }}
          className="flex flex-col items-center gap-12 text-2xl font-medium pt-5  opacity-75 ">
            <h1>It's empty 😢 </h1>
            <Image  src={panier}  alt="empty cart" width={200} height={200}/>

          </motion.div>
        )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )

}