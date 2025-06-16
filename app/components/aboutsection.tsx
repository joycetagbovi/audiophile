const AboutSection = () => {
  return (
    <section className='py-10 '>
      <div className='container-fluid'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div className='order-2 lg:order-1 w-full md:w-[573px] md:mx-auto md:text-center'>
            <h2 className='text-[28px] md:text-[40px] font-bold mb-6 leading-tight uppercase text-black  lg:w-[445px] text-center  lg:text-left'>
              BRINGING YOU THE
              <span className='text-primary'> BEST</span> AUDIO GEAR
            </h2>
            <p className='text-black/50 text-[15px] leading-relaxed mb-4 w-full lg:w-[445px] text-center lg:text-left'>
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio
              accessories. We have a large showroom and luxury demonstration
              rooms available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic
              people who make Audiophile the best place to buy your portable
              audio equipment.
            </p>
          </div>
          <div className='order-1 lg:order-2'>
            <div className='flex items-center justify-center'>
              <img
                src='/assets/home/desktop/aboutimage.png'
                alt='man with headset'
                className='rounded-[8px]  max-w-full w-[540px]  h-[588px] hidden lg:block'
              />
              <img
                src='/assets/home/tablet/aboutimagetablet.png'
                alt='man with headset'
                className='rounded-[8px]  max-w-full w-full  h-[300pz] hidden md:block lg:hidden'
              />
              <img
                src='/assets/home/mobile/aboutimagemobile.png'
                alt='man with headset'
                className='rounded-[8px] object-cover  max-w-full w-full  h-[300px] block md:hidden'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
