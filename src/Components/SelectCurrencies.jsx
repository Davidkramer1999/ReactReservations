

import React, { useEffect, useState , useContext} from 'react'
import Select from 'react-select';

import { Context } from "../Context";

import "./Css/SelectCurrencies.css"


export default function SelectCurrencies() {

    const [allCurrencies, setAllCurrencies] = useState([])
    const [selectedCurrencies, setSelectedCurrencies] = useState([])
    const { data, setData } = useContext(Context)


    useEffect(() => {
        setSelectedCurrencies(data)
        fetch('https://api.exchangerate-api.com/v4/latest/EUR')
            .then(response => response.json())
            .then(data => structureSymbolRate(data.rates));
    })



    const structureSymbolRate = (values) => {
        let rates = []
        for (const [symbol, rate] of Object.entries(values)) {
            rates.push({
                symbol,
                rate,
            });
        }
        setAllCurrencies(rates)
    }

    const handleSelectedCurrencies = (value) => {
        setData(value)
        setSelectedCurrencies(value)
    }


    return (
        <div>
            <div className="backgroundImg">
                <div >
                    <Select
                        options={allCurrencies}
                        value={selectedCurrencies}
                        isSearchable={false}
                        onChange={data => handleSelectedCurrencies(data)}
                        getOptionLabel={(option) => option.symbol}
                        getOptionValue={(option) => option.rate}
                        isMulti
                        className="multiSelect"
                    />
                </div>
            </div>
        </div>
    )
}