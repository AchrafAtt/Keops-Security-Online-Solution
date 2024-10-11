import Stripe from "stripe"
import Product from "./components/Product"
import Hero from "./components/Hero"
import style from "./page.module.css"
import Image from "next/image"
import Camp from "./components/Camps"
import Features from "./components/Feature"
import Guid from "./components/Guid"
const getProducts =async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
    apiVersion:"2022-11-15",
  })
  const products = await stripe.products.list()
//fetch prices bc his return like references not like float


  const prodctWithPrices = await Promise.all(
    products.data.map(async(product)=>{
      const prices = await stripe.prices.list({product:product.id})
      const features = product.metadata.features ||""  //extra desc from strip product 
      return{
        id:product.id,
        name: product.name,
        unit_amount:prices.data[0].unit_amount,
        image:product.images[0],
        currency:prices.data[0].currency,
        description : product.description,
        metadata : {features}
      }
    })
  ) 
  return prodctWithPrices
}

export default async function Home() {
  const products = await getProducts()
 
  return (
<>
    <div>
        <Hero/>
    <Camp/>
    <Features/>
    <Guid/>
    </div>
    <div>
  
    <main className="grid grid-cols-fluid gap-12">
      
      {products.map((product)=> (
       <Product {...product} key={product.id}/>
      ))}
      
     </main>
  </div>
  </>
  )
}
