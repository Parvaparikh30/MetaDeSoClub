import React, { useState } from "react";
import { createContext } from "react";
export const CCContext = createContext("")



export function CCProvider({ children }) {
    const [address, setAddress] = useState('');
    function addCreator(add) {
        setAddress(add)
    }
    function getCreator() {
        return address
    }
    return (
        <CCContext.Provider value={{ address, addCreator, getCreator }}>
            {children}
        </CCContext.Provider>
    )
}