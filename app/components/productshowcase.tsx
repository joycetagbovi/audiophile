import { Button } from "./ui/button";

const ProductShowcase = () => {
  return (
    <section className="py-16 ">
      <div className="container-fluid space-y-12">
        {/* ZX9 Speaker */}
        <div className="zx9-speaker px-6 lg:pt-24 py-16  lg:px-24 rounded-[8px] flex flex-col lg:flex-row items-center justify-center text-white overflow-hidden lg:h-[560px] h-full">
          <div className="lg:w-1/2  lg:mb-0  mb-6 ">
            <img src="/public/assets/home/desktop/image-speaker-zx9.png" alt="zx9 speaker" className="w-[410px] h-[493px]  max-w-full hidden lg:block" />
            <img src="/public/assets/home/mobile/image-speaker-zx9.png" alt="zx9 speaker" className="  max-w-full md:hidden block" />
            <img src="/public/assets/home/tablet/image-speaker-zx9.png" alt="zx9 speaker" className="  max-w-full hidden lg:hidden md:block " />
          </div>
          <div className="lg:w-1/2 lg:pl-12 text-center lg:text-left">
            <h2 className="text-[36px] md:text-[56px] font-bold mb-6 tracking-[2px] uppercase leading-none">ZX9<br />SPEAKER</h2>
            <p className="text-white/75 mb-8 text-[15px] font-medium leading-relaxed">
              Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
            </p>
            <Button variant="primary" className="">
              SEE PRODUCT
            </Button>
          </div>
        </div>

        {/* ZX7 Speaker */}
        <div className="zx7-speaker p-12 lg:p-16 flex items-center">
          <div className="w-full">
            <h2 className="text-[28px] text-black tracking-[2px] font-bold mb-6">ZX7 SPEAKER</h2>
            <Button variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
              SEE PRODUCT
            </Button>
          </div>
        </div>

        {/* YX1 Earphones */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="">
            <img src="/public/assets/home/desktop/image-earphones-yx1.jpg" alt="earphone"  className="rounded-[8px] w-full"/>
          </div>
          <div className="bg-light-gray p-10  lg:p-24 rounded-[8px] flex flex-col justify-center items-start">
            <h2 className="text-[28px] text-black font-bold mb-6 tracking-[2px]">YX1 EARPHONES</h2>
            <Button variant="outline" className="">
              SEE PRODUCT
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;