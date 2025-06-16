import type { Route } from './+types/headphones';
import { Link } from 'react-router';
import { Navbar } from '../components/navbar';
import Footer from '~/components/footer';
import AboutSection from '~/components/aboutsection';
import ProductCard from '../components/productcard';
import data from '../data.json';
import type { Product } from '../types/index';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Headphones - AudioFile E-commerce' },
    {
      name: 'description',
      content:
        'Discover our premium collection of headphones. Find the perfect pair for your audio needs.',
    },
  ];
}

export default function Headphones() {
  const headphones = (data as Product[]).filter(
    (product) => product.category === 'headphones'
  );

  return (
    <>
      <Navbar />
      <main>
        <section className='relative bg-black py-10'>
          <div className='container-fluid'>
            <div className='pt-10'>
              <h1 className='uppercase font-bold text-white text-center lg:text-[40px] tracking-[1.43px]'>
                HEADPHONES
              </h1>
            </div>
          </div>
        </section>

        <section className='py-24'>
          <div className='container-fluid'>
            <div className='space-y-32'>
              {headphones.slice().reverse().map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
