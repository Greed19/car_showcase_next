'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchManufacturer } from "./";
import Image from "next/image";

const SearchBtn = ({otherClasses}:{otherClasses:string}) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image src='/magnifying-glass.svg' alt='search_icon' width={40} height={40} className='object-contain' />
  </button>
)

const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState<string>('')
    const [model, setModel] = useState<string>('')
    const router = useRouter()
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(!model && !manufacturer){
        return alert('Please fill in the search bar')
      }
      updateSearchParams(model.toLowerCase(),manufacturer.toLowerCase())
    }
    const updateSearchParams = (model: string,manufacturer: string) => {
      const searchParams = new URLSearchParams(window.location.search);

      if(model){
        searchParams.set('model',model)
      }else {
        searchParams.delete('model')
      }

      if(manufacturer){
        searchParams.set('manufacturer',manufacturer)
      }else {
        searchParams.delete('manufacturer')
      }

      const newPathname = `${window.location.pathname}?${searchParams.toString()}`
      router.push(newPathname,{scroll:false})
    }

  return (
    <form className="searchbar" onSubmit={handleSearch}>
        <div className="searchbar__item">
            <SearchManufacturer
                manufacturer={manufacturer}
                setManufacturer={setManufacturer}
            />
        <SearchBtn otherClasses="sm:hidden" />
        </div>
        <div className="searchbar__item">
          <Image src='/model-icon.png' alt='car_model' width={25} height={25} className="absolute w-[20px] h-[20px] ml-4" />
          <input 
            type="text"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Enter car Model"
            className="searchbar__input"
            />
            <SearchBtn otherClasses="sm:hidden" />
        </div>
        <SearchBtn otherClasses="max-sm:hidden" />
    </form>
  )
}

export default SearchBar