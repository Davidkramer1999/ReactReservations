import React from "react";
import { Context } from "../Context";

import AccommodationsTable from "./AccommodationsTable";

class Accommodations extends React.Component {
    static contextType = Context
    constructor(props) {
        super(props);
        this.state = {
            headers: ['checkbox', 'id', 'name', 'address', 'available', 'city', 'country', 'priceInEur', 'createdAt'],
        };
    }

    componentDidMount() {
        this.getAccommodations()
    }

    getAccommodations() {
        fetch('https://5ddbbbd5041ac10014de14d7.mockapi.io/accommodations/prices')
            .then(response => response.json())
            .then(accommodations => this.includePricesInEur(accommodations));
    }


    includePricesInEur = (accommodations) => {
        const addPriceInEur = accommodations.map((el) => {
            return {
                ...el, price: this.context.data.map(element => {
                    return {
                        ...element, priceInCurrency: element.rate * el.priceInEur
                    }
                })
            }
        })
        this.setState({
            accommodations: addPriceInEur
        })
        this.context.setAccommodations(addPriceInEur)
    }
    render() {
        const { headers } = this.state
        return (
            <div className="pt-5">
                <AccommodationsTable
                    headers={headers} />
            </div>
        )
    }
}

export default Accommodations;
