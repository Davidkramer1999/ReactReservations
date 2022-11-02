
import React from "react";
import { createContext, useState } from "react";

export const Context = createContext();

export const AuthContextProvider = (props) => {
    const [data, setData] = useState([]);
    const [accommodations, setAccommodations] = useState([]);


    return (
        <Context.Provider value={{ data, setData, accommodations, setAccommodations }}>
            {props.children}
        </Context.Provider>
    );
};

