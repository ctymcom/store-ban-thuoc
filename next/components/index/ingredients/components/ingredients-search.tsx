import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

interface IngredientsSearchProps {
  [key: string]: any
  searchText: string
  setSearchText: Function
}

export function IngredientsSearch(props: IngredientsSearchProps) {

    return <>
      <div className="text-center lg:text-left">
        <div className="inline-flex items-center relative">
          <i className="absolute left-4 text-gray-400 text-lg"><HiOutlineSearch/></i>
          <input className="border border-gray-300 rounded h-10 pl-10 pr-3 w-80 hover:border-primary focus:border-primary-dark" placeholder="Tìm kiếm hoạt chất"
          value={props.searchText} onChange={e => props.setSearchText(e.target.value)}/>
        </div>
      </div>
    </>
}