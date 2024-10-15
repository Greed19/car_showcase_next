"use client"
import { CustomFilterProps } from '@/types'
import {Fragment, useState} from 'react'
import { useRouter } from 'next/navigation';
import { Listbox, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import Image from 'next/image';
import { updateSearchParams } from '@/utils';

const CustomFilter = ({title,options}: CustomFilterProps) => {
  const [selected, setSelected] = useState(options[0]);
  const router = useRouter();
  
  const handleUpdateSearchParams = (e: {title:string, value:string}) => {
    const getNewPath = updateSearchParams(title,e.value.toLowerCase())
    router.push(getNewPath,{scroll:false})
  }


  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e)
          handleUpdateSearchParams(e)
        }}
        >
        <div className='relative w-fit z-10'>
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{title}</span>
            <Image src='/chevron-up-down.svg' alt='arrow up down' width={20} height={20} className='ml-4 object-contain' />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            >
              <Listbox.Options className="custom-filter__options">
                {options.map((opt) => (
                  <Listbox.Option
                    key={opt.title}
                    value={opt}
                    className={({active}) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-blue text-white': 'text-gray-900'}`}
                  >
                    {({selected}) => (
                         <span className={`block truncate ${selected ? 'font-medium': 'font-normal'}`}>{opt.title}</span>
                    )
                    }
                  </Listbox.Option>
                ))}
              </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter