import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/cart';
import { PrimaryButton, SecondaryButton } from './ui/button';

export function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='relative p-2 hover:text-primary transition-colors'
        aria-label='Cart'
      >
        <svg width='23' height='20' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z'
            fill='#FFF'
            fill-rule='nonzero'
          />
        </svg>

        {totalItems > 0 && (
          <span className='absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-4 w-[377px] bg-white rounded-lg shadow-lg p-8 z-50'>
          <div className='flex justify-between items-center mb-8'>
            <h3 className='text-[18px] font-bold uppercase text-black'>
              Cart ({totalItems})
            </h3>
            <button
              onClick={() =>
                items.forEach((item) => removeFromCart(item.product.id))
              }
              className='text-primary hover:text-primary underline text-sm'
            >
              Remove all
            </button>
          </div>

          {items.length === 0 ? (
            <p className='text-center text-black/50'>Your cart is empty</p>
          ) : (
            <>
              <div className='space-y-6 mb-8'>
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className='flex items-center gap-4'
                  >
                    <img
                      src={item.product.image.desktop}
                      alt={item.product.name}
                      className='w-16 h-16 rounded-lg'
                    />
                    <div className='flex-1'>
                      <h4 className='font-bold text-black'>
                        {item.product.name}
                      </h4>
                      <p className='text-black/50'>
                        ${item.product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className='flex items-center bg-light-gray px-4'>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className='text-black/50 hover:text-primary text-xl'
                      >
                        -
                      </button>
                      <span className='mx-4 font-bold text-black'>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className='text-black/50 hover:text-primary text-xl'
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className='flex justify-between mb-6'>
                <span className='text-black/50 uppercase text-[15px]'>
                  Total
                </span>
                <span className='font-bold text-black text-[18px]'>
                  ${totalPrice.toLocaleString()}
                </span>
              </div>

              <SecondaryButton onClick={handleCheckout} className='w-full'>
                Checkout
              </SecondaryButton>
            </>
          )}
        </div>
      )}
    </div>
  );
}
