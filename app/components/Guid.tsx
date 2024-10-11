import Image from 'next/image'

function Guid() {
  return (
    <section className="flexCenter flex-col">
    <div className="padding-container max-container w-full pb-24">
      <Image src="/kts.svg" alt="camp" width={50} height={50} />
      <p className="uppercase regular-18 -mt-1 mb-3 text-blue-300">
        We are here for you
      </p>
      <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]">Our Service</h2>
          
        </div>
      </div>
      
      </section>
  )
}

export default Guid