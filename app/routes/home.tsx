import type { Route } from './+types/home';
import { Link } from 'react-router';
import { Navbar } from '../components/navbar';
import AboutSection from '~/components/aboutsection';
import Footer from '~/components/footer';
import ProductShowcase from '~/components/productshowcase';
import ProductGrid from '~/components/productgrid';
import { SecondaryButton } from '~/components/ui/button';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'AudioFile E-commerce - Premium Audio Equipment' },
    {
      name: 'description',
      content:
        'Discover premium headphones, speakers, and earphones for the ultimate audio experience.',
    },
  ];
}

export default function Home() {
  return (
    <>
      <Navbar bgColor='bg-transparent'/>
      <main className=''>
        <section className='hero-section relative py-32 '>
          <div className='container-fluid'>
            <div className='flex flex-col items-center justify-center text-center md:items-center md:justify-center md:text-center lg:items-start lg:justify-end lg:text-left max-w-lg mx-auto lg:mx-0'>
              <h1 className='text-sm font-normal uppercase mb-8 text-white/75 tracking-[10px] leading-normal'>
                NEW PRODUCT
              </h1>
              <h2 className='section-title !mb-8'>XX99 Mark II HeadphoneS</h2>
              <p className='section-description max-w-full md:max-w-[349px] !mb-8'>
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>
             <SecondaryButton>
              see product
             </SecondaryButton>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <ProductGrid />
   <ProductShowcase />
 <AboutSection />
      </main>
      <Footer />
    </>
  );
}
