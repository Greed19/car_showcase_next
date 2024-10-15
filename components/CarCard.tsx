'use client';
import React, { useState } from 'react';
import Image from 'next/image'
import { CarProps } from '@/types';
import CustomButton from './CustomButton';
import { calculateCarRent, fetchCarImage } from '@/utils';
import CarDetails from './CarDetails';

interface IconsType { 
  img: string;
  alt: string;
  name: string;
}

const Icons = ({item}:{item:IconsType}) => {
  const {img, alt , name} = item
return(
  <div className='flex flex-col justify-center items-center gap-2'>
    <Image src={img} alt={alt} width={20} height={20}/>
    <p className='text=[14px]'>{name}</p>
  </div>
)
}

const CarCard = ({car}:CarProps) => {
    const {city_mpg, year, make, model, transmission, drive} = car;
    const carRent = calculateCarRent(city_mpg, year)
    const [isOpen, setIsOpen] = useState(false)
    const iconMap = [
      {
        img: '/steering-wheel.svg',
        alt: 'steering wheel',
        name: transmission === 'a' ? 'Automatic' : 'Manual'
      },
      {
        img: '/tire.svg',
        alt: 'Tire',
        name: drive.toUpperCase()
      },
      {
        img: '/gas.svg',
        alt: 'gas',
        name: `${city_mpg}'MPG'`
      }
    ]
  return (
    <div className='car-card group'>
      <div className='car-card__content'>
        <h2>{make} {model}</h2>
      </div>
      <p className='flex mt-6 text-[32px] font-extrabold'>
        <span className='self-start text-[14px] font-semibold'>$</span>
        {carRent}
        <span className='self-end text-[14px] font-medium'>/day</span>
      </p>
      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={fetchCarImage(car)} alt='car model' fill priority className='object-contain' />
      </div>
      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-gray'>
          {
            iconMap.map((item,index) => (
              <Icons item={item} key={`${item.img}${model}`}/>
            ))
          }
        </div>
        <div className='car-card__btn-container'>
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyle='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      {
        isOpen 
        ? <CarDetails
          isOpen={isOpen}
          handleModal={() => setIsOpen(false)}
          car={car}
          /> 
        : null
      }
    </div>
  )
}

export default CarCard