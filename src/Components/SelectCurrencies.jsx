import React from "react";
import Select from 'react-select';
import { Context } from "../Context";

import "./Css/SelectCurrencies.css"

class SelectCurrencies extends React.Component {
    static contextType = Context
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            selectedCurrencies: []
        };
    }

    componentDidMount() {
        this.getCurrency()
        this.setState({
            selectedCurrencies: this.context.data
        })
    }

    getCurrency() {
        fetch('https://api.exchangerate-api.com/v4/latest/EUR')
            .then(response => response.json())
            .then(data => this.structureSymbolRate(data.rates));
    }

    structureSymbolRate = (objects) => {
        let rates = []
        for (const [symbol, rate] of Object.entries(objects)) {
            rates.push({
                symbol,
                rate,
            });
        }
        this.rates = rates
        this.setState({ currencies: rates })
    }

    selectedCurrencies = (value) => {
        this.context.setData(value)
        this.setState({ selectedCurrencies: value })
    }


    render() {
        const { currencies, selectedCurrencies } = this.state
        return (
            <div>
                <div className="backgroundImg">         
                <div >
                    <Select
                        options={currencies}
                        value={selectedCurrencies}
                        isSearchable={false}
                        onChange={data => this.selectedCurrencies(data)}
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
}

export default SelectCurrencies;
