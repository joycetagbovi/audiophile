import { Link, useParams, useNavigate } from 'react-router';
import { Navbar } from '../components/navbar';
import data from '../data.json';
import type { Product } from '../types';
import { SecondaryButton } from '~/components/ui/button';
import Footer from '~/components/footer';
import AboutSection from '~/components/aboutsection';
import ProductGrid from '~/components/productgrid';
import { useCart } from '../context/cart';
import { useState } from 'react';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const product = (data as Product[]).find((p) => p.slug === id);

  if (!product) {
    return (
      <div className='container-fluid py-24 text-center'>
        <h1 className='text-2xl font-bold mb-4'>Product not found</h1>
        <Link to='/' className='text-primary hover:underline'>
          Return to Home
        </Link>
      </div>
    );
  }

  const {
    name,
    description,
    price,
    features,
    includes,
    gallery,
    others,
    new: isNew,
    image,
  } = product;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  return (
    <>
      <Navbar />
      <main className='overflow-hidden'>
        <section className='pt-24'>
          <div className='container-fluid !pb-0'>
            <a
              href='#'
              className='text-[15px] text-black/50 font-normal'
              onClick={() => navigate(-1)}
            >
              Go Back
            </a>
          </div>
        </section>
        {/* product overview */}
        <section>
          <div className='container-fluid '>
            <div className='grid lg:grid-cols-2 gap-24 '>
              <div className='relative'>
                <img
                  src={image.desktop}
                  alt={name}
                  className='w-full h-[560px] object-cover rounded-lg hidden lg:block'
                />
                <img
                  src={image.tablet}
                  alt={name}
                  className='w-full h-[480px] object-cover rounded-lg hidden md:block lg:hidden'
                />
                <img
                  src={image.mobile}
                  alt={name}
                  className='w-full h-[327px] object-cover rounded-lg block md:hidden'
                />
              </div>

              <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
                {isNew && (
                  <span className='text-primary uppercase tracking-[10px] text-sm mb-4'>
                    New Product
                  </span>
                )}
                <h1 className='text-[28px] text-black md:text-[40px] font-bold mb-6 tracking-[1.43px] uppercase'>
                  {name}
                </h1>
                <p className='text-black/50 text-[15px] leading-relaxed mb-8 max-w-[445px]'>
                  {description}
                </p>
                <p className='text-[18px] font-bold mb-8 text-black'>
                  ${price.toLocaleString()}
                </p>
                <div className='flex gap-4'>
                  <div className='flex items-center bg-light-gray px-4'>
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className='text-black/50 hover:text-primary text-xl'
                    >
                      -
                    </button>
                    <span className='mx-4 font-bold text-black'>{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className='text-black/50 hover:text-primary text-xl'
                    >
                      +
                    </button>
                  </div>
                  <SecondaryButton
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className=''>
          <div className='container-fluid '>
            <div className='grid lg:grid-cols-2 gap-24 '>
              <div>
                <h2 className='text-[32px] font-bold mb-8 uppercase text-black'>
                  Features
                </h2>
                <div className='text-black/50 text-[15px] leading-relaxed space-y-4'>
                  {features.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div>
                <h2 className='text-[32px] font-bold mb-8 uppercase text-black'>
                  In the Box
                </h2>
                <ul className='space-y-2'>
                  {includes.map((item, index) => (
                    <li key={index} className='flex items-center'>
                      <span className='text-primary font-bold mr-4'>
                        {item.quantity}x
                      </span>
                      <span className='text-black/50'>{item.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className=''>
          <div className='container-fluid '>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='space-y-8'>
                <img
                  src={gallery.first.desktop}
                  alt='Gallery 1'
                  className='w-full h-[280px] object-cover rounded-lg hidden lg:block'
                />
                <img
                  src={gallery.first.tablet}
                  alt='Gallery 1'
                  className='w-full h-[174px] object-cover rounded-lg hidden md:block lg:hidden'
                />
                <img
                  src={gallery.first.mobile}
                  alt='Gallery 1'
                  className='w-full h-[174px] object-cover rounded-lg block md:hidden'
                />
                <img
                  src={gallery.second.desktop}
                  alt='Gallery 2'
                  className='w-full h-[280px] object-cover rounded-lg hidden lg:block'
                />
                <img
                  src={gallery.second.tablet}
                  alt='Gallery 2'
                  className='w-full h-[174px] object-cover rounded-lg hidden md:block lg:hidden'
                />
                <img
                  src={gallery.second.mobile}
                  alt='Gallery 2'
                  className='w-full h-[174px] object-cover rounded-lg block md:hidden'
                />
              </div>
              <div>
                <img
                  src={gallery.third.desktop}
                  alt='Gallery 3'
                  className='w-full h-[592px] object-cover rounded-lg hidden lg:block'
                />
                <img
                  src={gallery.third.tablet}
                  alt='Gallery 3'
                  className='w-full h-[368px] object-cover rounded-lg hidden md:block lg:hidden'
                />
                <img
                  src={gallery.third.mobile}
                  alt='Gallery 3'
                  className='w-full h-[368px] object-cover rounded-lg block md:hidden'
                />
              </div>
            </div>
          </div>
        </section>

        {/* You May Also Like */}
        <section className=''>
          <div className='container-fluid '>
            <div className=''>
              <h2 className='text-[32px] font-bold mb-12 text-center uppercase text-black'>
                You May Also Like
              </h2>
              <div className='grid md:grid-cols-3 gap-8'>
                {others.map((item) => (
                  <div key={item.slug} className='text-center'>
                    <img
                      src={item.image.desktop}
                      alt={item.name}
                      className='w-full h-[318px] object-cover rounded-lg mb-8 hidden lg:block'
                    />
                    <img
                      src={item.image.tablet}
                      alt={item.name}
                      className='w-full h-[318px] object-cover rounded-lg mb-8 hidden md:block lg:hidden'
                    />
                    <img
                      src={item.image.mobile}
                      alt={item.name}
                      className='w-full h-[120px] object-cover rounded-lg mb-8 block md:hidden'
                    />
                    <h3 className='text-[24px] font-bold mb-8 text-black'>
                      {item.name}
                    </h3>
                    <SecondaryButton
                      onClick={() => navigate(`/product/${item.slug}`)}
                    >
                      See Product
                    </SecondaryButton>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <ProductGrid />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
