import { Link, useNavigate } from 'react-router';
import type { Product } from '../types/index';
import { SecondaryButton } from './ui/button';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const navigate = useNavigate();
  const {
    name,
    description,
    categoryImage,
    new: isNew,
    slug,
    category,
  } = product;

  // Reverse on second row (index 2 and 3)
  const isReversed = index %2 !==0;

  const handleClick = () => {
    navigate(`/product/${slug}`);
  };

  return (
    <div
      className={`grid lg:grid-cols-2 gap-24 items-center ${
        isReversed ? 'lg:[direction:rtl]' : ''
      }`}
    >
      <div className='relative bg-light-gray rounded-[8px]'>
        <img
          src={categoryImage.desktop}
          alt={name}
          className='w-full h-[560px] object-cover rounded-[8px] hidden lg:block'
        />
        <img
          src={categoryImage.tablet}
          alt={name}
          className='w-full h-[352px] object-cover rounded-[8px] hidden md:block lg:hidden'
        />
        <img
          src={categoryImage.mobile}
          alt={name}
          className='w-full h-[352px] object-cover rounded-[8px] block md:hidden'
        />
      </div>

      <div className={`flex flex-col items-center lg:items-start text-center lg:text-left ${isReversed ?'lg:[direction:ltr]' : '' }`}>
        {isNew && (
          <span className='text-primary uppercase tracking-[10px] text-sm mb-4'>
            New Product
          </span>
        )}
        <h2 className='text-[28px] md:text-[40px] text-black font-bold mb-6 tracking-[1.43px] uppercase max-w-[455px]'>
          {name}
        </h2>
        <p className='text-black/50 text-[15px] leading-relaxed mb-8 max-w-[445px]'>
          {description}
        </p>
        <SecondaryButton onClick={handleClick}>See Product</SecondaryButton>
      </div>
    </div>
  );
};

export default ProductCard;
