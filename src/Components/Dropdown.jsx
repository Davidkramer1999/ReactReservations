import React from "react";
import { Card, Col, CardHeader } from "reactstrap";
import Select from 'react-select';
import { Context } from "../Context";
import { Link } from "react-router-dom";
class Dropdown extends React.Component {
    static contextType = Context
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            dropdownData: [],
            selectedValue: []
        };
    }

    componentDidMount() {
        this.getCurrency()
        this.setState({
            selectedValue: this.context.data
        })
    }

    getCurrency() {
        fetch('https://api.exchangerate-api.com/v4/latest/EUR')
            .then(response => response.json())
            .then(data => this.getArrayOfObjects(data.rates));
    }

    getArrayOfObjects = (objects) => {
        let rates = []
        for (const [symbol, rate] of Object.entries(objects)) {
            rates.push({
                symbol,
                rate,
            });
        }
        this.rates = rates
        this.setState({ dropdownData: rates })
    }

    handleSelectLocation = (value) => {
        this.context.setData(value)
        this.setState({ selectedValue: value })
    }


    render() {
        const { dropdownData, selectedValue } = this.state
        return (
            <Card>
                <Col md="12">
                    <CardHeader>
                        <Col md="4" >
                            <Select
                                options={dropdownData}
                                value={selectedValue}
                                isSearchable={false}
                                onChange={data => this.handleSelectLocation(data)}
                                getOptionLabel={(option) => option.symbol}
                                getOptionValue={(option) => option.rate}
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                            <li>
                                <Link to="/Accommodations">Accommodations</Link>
                            </li>
                        </Col>
                    </CardHeader>
                </Col >
            </Card >

        )
    }
}



export default Dropdown;
