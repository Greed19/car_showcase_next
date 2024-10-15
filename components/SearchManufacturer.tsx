'use client';
import { SearchManufacturerProps } from '@/types'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image';
import React, { useState, Fragment } from 'react';
import { manufacturers } from '@/constants';

const SearchManufacturer = ({manufacturer, setManufacturer}:SearchManufacturerProps) => {
  const [query,setQuery] = useState<string>('')
  const searchReg = /\s+/g;
  const filtered = query === '' ? manufacturers : manufacturers.filter((item) => (
    item.toLowerCase()
    .replace(searchReg,'')
    .includes(query.toLowerCase().replace(searchReg,''))
  ))
  return (
    <section className='search-manufacturer'>
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className='relative w-full'>
          <Combobox.Button className="absolute top-[14px]">
            <Image src="/car-logo.svg" alt='Car logo' width={20} height={20} className='ml-4' />
          </Combobox.Button>
          <Combobox.Input className="search-manufacturer__input" placeholder='Enter Car Manufacturer' 
            displayValue={(manufacturer:string) => manufacturer}
             onChange={e => setQuery(prev => e.target.value)} 
             />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery(prev => '')}
          >
            <Combobox.Options>
              {
                  filtered.map((item) => (
                    <Combobox.Option key={item} value={item} className={({active}) => 
                    `relative search-manufacturer__option 
                    ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}` }
                    >
                      {({selected, active}) => (
                        <>      
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {item}
                        </span>
                          {
                            selected ? (
                              <span 
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white':'text-teal-600'}`}
                                />
                            ) : null
                          }
                        </>
                      )}
                    </Combobox.Option>
                  ))
              }
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </section>
  )
}

export default SearchManufacturer