import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/cart';
import { Navbar } from '../components/navbar';
import { PrimaryButton, SecondaryButton } from '../components/ui/button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: 'e-money' | 'cash';
  eMoneyNumber?: string;
  eMoneyPin?: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, removeFromCart } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    paymentMethod: 'e-money',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const shippingCost = 50;
  const vat = totalPrice * 0.2;
  const grandTotal = totalPrice + shippingCost + vat;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const requiredFields: (keyof FormData)[] = [
      'name',
      'email',
      'phone',
      'address',
      'zipCode',
      'city',
      'country',
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // E-money validation
    if (formData.paymentMethod === 'e-money') {
      if (!formData.eMoneyNumber) {
        newErrors.eMoneyNumber = 'E-money number is required';
      } else if (!/^\d{9}$/.test(formData.eMoneyNumber)) {
        newErrors.eMoneyNumber = 'E-money number must be 9 digits';
      }
      if (!formData.eMoneyPin) {
        newErrors.eMoneyPin = 'E-money PIN is required';
      } else if (!/^\d{4}$/.test(formData.eMoneyPin)) {
        newErrors.eMoneyPin = 'PIN must be 4 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleButtonClick = () => {
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleConfirmation = () => {
    setShowConfirmation(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      zipCode: '',
      city: '',
      country: '',
      paymentMethod: 'e-money',
    });
    items.forEach((item) => removeFromCart(item.product.id));
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <section className='pt-24'>
          <div className='container-fluid  text-center'>
            <h1 className='text-2xl font-bold mb-4'>Your cart is empty</h1>
            <SecondaryButton onClick={() => navigate('/')}>
              Return to Home
            </SecondaryButton>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className='bg-light-gray'>
        <section className='pt-24 '>
          <div className='container-fluid !pb-0'>
            <button
              onClick={() => navigate(-1)}
              className='text-black/50 hover:text-primary '
            >
              Go Back
            </button>
          </div>
        </section>

        <section>
          <div className='container-fluid '>
            <div className='grid grid-cols-1  lg:grid-cols-3 gap-8'>
              {/* Checkout Form */}
              <div className='bg-white rounded-lg p-8 lg:col-span-2'>
                <h1 className='text-[32px] font-bold mb-8 uppercase text-black'>
                  Checkout
                </h1>

                <form onSubmit={handleButtonClick} className='space-y-8'>
                  {/* Billing Details */}
                  <div>
                    <h2 className='text-primary text-sm font-bold uppercase mb-4'>
                      Billing Details
                    </h2>
                    <div className='grid md:grid-cols-2 gap-4'>
                      <div>
                        <label htmlFor='name' className='form-label'>
                          Name
                          {errors.name && (
                            <span className='text-red-500 ml-2'>
                              {errors.name}
                            </span>
                          )}
                        </label>
                        <input
                          type='text'
                          id='name'
                          name='name'
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`form-control ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder='Alexei Ward'
                        />
                      </div>
                      <div>
                        <label htmlFor='email' className='form-label'>
                          Email Address
                          {errors.email && (
                            <span className='text-red-500 ml-2'>
                              {errors.email}
                            </span>
                          )}
                        </label>
                        <input
                          type='email'
                          id='email'
                          name='email'
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`form-control ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder='alexei@example.com'
                        />
                      </div>
                      <div>
                        <label htmlFor='phone' className='form-label'>
                          Phone Number
                          {errors.phone && (
                            <span className='text-red-500 ml-2'>
                              {errors.phone}
                            </span>
                          )}
                        </label>
                        <input
                          type='tel'
                          id='phone'
                          name='phone'
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`form-control ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder='+1 202-555-0136'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div>
                    <h2 className='text-primary text-sm font-bold uppercase mb-4'>
                      Shipping Info
                    </h2>
                    <div className='grid md:grid-cols-2 gap-4'>
                      <div className='md:col-span-2'>
                        <label htmlFor='address' className='form-label'>
                          Address
                          {errors.address && (
                            <span className='text-red-500 ml-2'>
                              {errors.address}
                            </span>
                          )}
                        </label>
                        <input
                          type='text'
                          id='address'
                          name='address'
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`form-control ${
                            errors.address
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          placeholder='1137 Williams Avenue'
                        />
                      </div>
                      <div>
                        <label htmlFor='zipCode' className='form-label'>
                          ZIP Code
                          {errors.zipCode && (
                            <span className='text-red-500 ml-2'>
                              {errors.zipCode}
                            </span>
                          )}
                        </label>
                        <input
                          type='text'
                          id='zipCode'
                          name='zipCode'
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className={`form-control ${
                            errors.zipCode
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          placeholder='10001'
                        />
                      </div>
                      <div>
                        <label htmlFor='city' className='form-label'>
                          City
                          {errors.city && (
                            <span className='text-red-500 ml-2'>
                              {errors.city}
                            </span>
                          )}
                        </label>
                        <input
                          type='text'
                          id='city'
                          name='city'
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`form-control ${
                            errors.city ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder='New York'
                        />
                      </div>
                      <div>
                        <label htmlFor='country' className='form-label'>
                          Country
                          {errors.country && (
                            <span className='text-red-500 ml-2'>
                              {errors.country}
                            </span>
                          )}
                        </label>
                        <input
                          type='text'
                          id='country'
                          name='country'
                          value={formData.country}
                          onChange={handleInputChange}
                          className={`form-control ${
                            errors.country
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          placeholder='United States'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div>
                    <h2 className='text-primary text-sm font-bold uppercase mb-4'>
                      Payment Details
                    </h2>
                    <div className='grid md:grid-cols-2 gap-4'>
                      <label className='form-label'>Payment Method</label>
                      <div className='space-y-4'>
                        <div className='flex items-center ps-4 border border-gray-300 rounded-lg'>
                          <label className='flex items-center p-4 cursor-pointer w-full'>
                            <input
                              type='radio'
                              name='paymentMethod'
                              value='e-money'
                              checked={formData.paymentMethod === 'e-money'}
                              onChange={handleInputChange}
                              className='mr-4'
                            />
                            <span className='text-black font-bold text-[14px]'>
                              e-Money
                            </span>
                          </label>
                        </div>
                        <div className='flex items-center ps-4 border border-gray-300 rounded-lg'>
                          <label className='flex items-center p-4 cursor-pointer w-full'>
                            <input
                              type='radio'
                              name='paymentMethod'
                              value='cash'
                              checked={formData.paymentMethod === 'cash'}
                              onChange={handleInputChange}
                              className='mr-4'
                            />
                            <span className='text-black font-bold text-[14px]'>
                              Cash on Delivery
                            </span>
                          </label>
                        </div>
                      </div>

                      {formData.paymentMethod === 'e-money' && (
                        <>
                          <div>
                            <label
                              htmlFor='eMoneyNumber'
                              className='form-label'
                            >
                              e-Money Number
                              {errors.eMoneyNumber && (
                                <span className='text-red-500 ml-2'>
                                  {errors.eMoneyNumber}
                                </span>
                              )}
                            </label>
                            <input
                              type='text'
                              id='eMoneyNumber'
                              name='eMoneyNumber'
                              value={formData.eMoneyNumber || ''}
                              onChange={handleInputChange}
                              className={`form-control ${
                                errors.eMoneyNumber
                                  ? 'border-red-500'
                                  : 'border-gray-300'
                              }`}
                              placeholder='238521993'
                            />
                          </div>
                          <div>
                            <label htmlFor='eMoneyPin' className='form-label'>
                              e-Money PIN
                              {errors.eMoneyPin && (
                                <span className='text-red-500 ml-2'>
                                  {errors.eMoneyPin}
                                </span>
                              )}
                            </label>
                            <input
                              type='text'
                              id='eMoneyPin'
                              name='eMoneyPin'
                              value={formData.eMoneyPin || ''}
                              onChange={handleInputChange}
                              className={`form-control ${
                                errors.eMoneyPin
                                  ? 'border-red-500'
                                  : 'border-gray-300'
                              }`}
                              placeholder='6891'
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div className='bg-white rounded-lg p-8 h-fit'>
                <h2 className='text-[18px] font-bold uppercase mb-8'>
                  Summary
                </h2>
                <div className='space-y-6'>
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
                        <h3 className='font-bold'>{item.product.name}</h3>
                        <p className='text-black/50'>
                          ${item.product.price.toLocaleString()}
                        </p>
                      </div>
                      <div className='text-black/50'>x{item.quantity}</div>
                    </div>
                  ))}
                  <div className='space-y-2 pt-4 border-t'>
                    <div className='flex justify-between'>
                      <span className='text-black/50 uppercase'>Total</span>
                      <span className='font-bold text-black'>
                        ${totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-black/50 uppercase'>Shipping</span>
                      <span className='font-bold text-black'>
                        ${shippingCost.toLocaleString()}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-black/50 uppercase'>
                        VAT (Included)
                      </span>
                      <span className='font-bold text-black'>
                        ${vat.toLocaleString()}
                      </span>
                    </div>
                    <div className='flex justify-between pt-4 border-t'>
                      <span className='text-black/50 uppercase'>
                        Grand Total
                      </span>
                      <span className='font-bold text-primary'>
                        ${grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <SecondaryButton
                    onClick={handleButtonClick}
                    className='w-full'
                  >
                    Continue & Pay
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Order Confirmation Modal */}
        {showConfirmation && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
            <div className='bg-white rounded-lg p-8 max-w-[540px] w-full'>
              <div className='mb-6'>
                <img
                  src='/public/assets/checkout/icon-order-confirmation.svg'
                  alt='confirmation'
                />
              </div>
              <h2 className='text-[32px] font-bold uppercase mb-4 text-black leading-none'>
                Thank you <br />
                for your order
              </h2>
              <p className='text-black/50 mb-8'>
                You will receive an email confirmation shortly.
              </p>
              <div className='bg-light-gray rounded-[8px]  mb-8 grid grid-cols-3'>
                <div className='space-y-4 p-6 col-span-2'>
                  {items.length > 0 && (
                    <div className='flex items-center gap-4'>
                      <img
                        src={items[0].product.image.desktop}
                        alt={items[0].product.name}
                        className='w-16 h-16 rounded-lg'
                      />
                      <div className='flex-1'>
                        <h4 className='font-bold text-black'>
                          {items[0].product.name}
                        </h4>
                        <p className='text-black/50'>
                          ${items[0].product.price.toLocaleString()}
                        </p>
                      </div>
                      <div className='text-black/50'>x{items[0].quantity}</div>
                    </div>
                  )}

                  {items.length > 1 && (
                    <>
                      <hr />
                      <p className='text-black/50 font-bold'>
                        and {items.length - 1} other item(s)
                      </p>
                    </>
                  )}
                </div>
                <div className='flex justify-between items-center p-6 bg-black rounded-r-[8px]'>
                  <div className=''>
                    <h4 className='text-white/50 font-normal text-[15px] mb-2'>
                      GRAND TOTAL
                    </h4>
                    <p className='font-bold text-white'>
                      ${grandTotal.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <SecondaryButton onClick={handleConfirmation} className='w-full'>
                Back to Home
              </SecondaryButton>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
