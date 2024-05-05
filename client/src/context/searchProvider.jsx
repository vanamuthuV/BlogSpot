import React from "react";
import { createContext } from "react";
import { useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    
    const [searchOpen, setSearchOpen] = useState();
    console.log(searchOpen);
    return <SearchContext.Provider value={{ searchOpen, setSearchOpen }}>
        {children}
    </SearchContext.Provider>
}

export default SearchContext;