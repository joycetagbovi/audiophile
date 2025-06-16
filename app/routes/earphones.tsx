import { Navbar } from '../components/navbar';
import ProductCard from '../components/productcard';
import data from '../data.json';
import type { Product } from '../types/index';

export default function Earphones() {
  const earphones = (data as Product[]).filter(
    (product) => product.category === 'earphones'
  );

  return (
    <>
      <Navbar />
      <main>
        <section className='relative bg-black py-10'>
          <div className='container-fluid'>
            <div className='pt-10'>
              <h1 className='uppercase font-bold text-white text-center lg:text-[40px] tracking-[1.43px]'>
                EARPHONES
              </h1>
            </div>
          </div>
        </section>

        <section className='py-24'>
          <div className='container-fluid'>
            <div className='space-y-32'>
              {earphones.slice().reverse().map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
