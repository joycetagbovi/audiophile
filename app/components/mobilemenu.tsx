import { Link } from 'react-router';

const MobileMenuGrid = () => {
  const products = [
    {
      title: 'HEADPHONES',
      subtitle: '/headphones',
      icon: '/assets/shared/desktop/image-category-thumbnail-headphones.png',
    },
    {
      title: 'SPEAKERS',
      subtitle: '/speaker',
      icon: '/assets/shared/desktop/image-category-thumbnail-speakers.png',
    },
    {
      title: 'EARPHONES',
      subtitle: '/earphones',
      icon: '/assets/shared/desktop/image-category-thumbnail-earphones.png',
    },
  ];

  return (
    <section className='bg-white !rounded-b-[8px] '>
      <div className='container-fluid '>
        <div className='grid md:grid-cols-3 gap-4'>
          {products.map((product, index) => (
            <div key={index} className=' p-8 text-center group relative'>
              <div className='flex justify-center  mb-6 relative z-10'>
                <img
                  src={product.icon}
                  alt={product.title}
                  className='h-[104px] w-[122.95px] max-w-full object-cover'
                />
              </div>
              <div className='bg-light-gray rounded-[8px] w-full h-[165px] gap-3 p-5 flex flex-col items-center justify-end absolute left-1/2 top-16 transform -translate-x-1/2 py-10'>
                <h3 className='text-[18px] text-black font-bold mb-2 tracking-wider'>
                  {product.title}
                </h3>
                <Link
                  to={`${product.subtitle}`}
                  className='text-black/50 flex items-center gap-2 font-medium text-sm group-hover:text-primary transition-colors'
                >
                  SHOP{' '}
                  <svg width='8' height='12' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M1.322 1l5 5-5 5'
                      stroke='#D87D4A'
                      stroke-width='2'
                      fill='none'
                      fill-rule='evenodd'
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileMenuGrid;
