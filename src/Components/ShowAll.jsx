import React from "react";
import { Card, Col, CardHeader } from "reactstrap";
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import { matchSorter } from 'match-sorter'
import { Context } from "../Context";
import { Link } from "react-router-dom";


class ShowAll extends React.Component {
    static contextType = Context
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            headers: [],
            data: [],
            selectedValue: [],
            dropdownData: [
                { id: "true", name: "available" },
                { id: "false", name: "not available" }
            ],
            selected: [],
            headers: ['id', 'crypto', 'name', 'address', 'avaliable', 'city', 'country', 'priceInEur', 'createdAt'],
            showReservations: [],
        };
    }

    componentDidMount() {
        const showReservations = this.context.accommodations.filter(el => el.selected === true)
        this.setState({
            showReservations: showReservations,
            allReservations: this.context.accommodations
        })
        //could add each column.. 
        // const getSymbols = this.context.data.map(el => { return el.symbol })
        // const addSymbols = getSymbols.concat(this.state.headers)
        // this.setState({
        //     headers: addSymbols
        // })
    }

    saveAccommodations = () => {
        this.context.setAccommodations(this.state.allReservations)
    }

    render() {
        const { headers, showReservations } = this.state
        return (
            <Card>
                <Col md="12">
                    <CardHeader>
                        <div className="pt-5"></div>
                        <Col md="4" >
                            <ReactTable
                                sortable={true}
                                showPagination={true}
                                filterable
                                defaultFilterMethod={(filter, row) =>
                                    String(row[filter.id]) === filter.value}
                                className="-striped -highlight "
                                minRows={0}
                                key={"table"}
                                defaultPageSize={11}
                                data={showReservations}
                                columns={headers.map((el, index) => {
                                    if (el === "id") {
                                        return {
                                            Header: "id",
                                            accessor: el,
                                            width: 120,
                                            Cell: (el) => {
                                                return <span>{el.original.id}</span>;
                                            },
                                        };
                                    }
                                    else if (el === "crypto") {
                                        return {
                                            Header: this.context.data.symbol,
                                            accessor: el,
                                            width: 270,
                                            Cell: (el) => {
                                                return <span>{
                                                    <div>
                                                        {el.original.price.map(function (d, idx) {
                                                            return (<li key={idx}>{d.symbol + ":" + Math.round(d.priceInCurrency)}</li>)
                                                        })}
                                                    </div>
                                                }</span>;
                                            },
                                        };
                                    }
                                    else if (el === "name") {
                                        return {
                                            className: "p-0",
                                            Header: "name",
                                            id: "name",
                                            accessor: d => d.name,
                                            filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["name"] }),
                                            filterAll: true,
                                            width: 400,
                                            Cell: (el) => {
                                                return <span>{el.original.name}</span>;
                                            },
                                        };
                                    }
                                    else if (el === "address") {
                                        return {
                                            Header: "address",
                                            accessor: el,
                                            id: "address",
                                            accessor: d => d.address,
                                            filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["address"] }),
                                            filterAll: true,
                                            width: 270,
                                            Cell: (el) => {
                                                return <span>{el.original.address}</span>;
                                            },
                                        };
                                    }
                                    else if (el === "city") {
                                        return {
                                            Header: "city",
                                            accessor: el,
                                            id: "city",
                                            accessor: d => d.city,
                                            filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["city"] }),
                                            filterAll: true,
                                            width: 270,
                                            Cell: (el) => {
                                                return <span>{el.original.city}</span>;
                                            },
                                        };
                                    }
                                    else if (el === "country") {
                                        return {
                                            Header: "country",
                                            accessor: el,
                                            id: "country",
                                            accessor: d => d.country,
                                            filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["country"] }),
                                            filterAll: true,
                                            width: 270,
                                            Cell: (el) => {
                                                return <span>{el.original.country}</span>;
                                            },
                                        };
                                    }
                                    else if (el === "priceInEur") {
                                        return {
                                            Header: "priceInEur",
                                            accessor: el,
                                            id: "priceInEur",
                                            filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["priceInEur"] }),
                                            filterAll: true,
                                            width: 270,
                                            Cell: (el) => {
                                                return <span>{el.original.priceInEur}</span>;
                                            },
                                        };
                                    }
                                    else if (el === "createdAt") {
                                        return {
                                            Header: "createdAt",
                                            accessor: el,
                                            width: 270,
                                            Cell: (el) => {
                                                return <span>{el.original.createdAt}</span>;
                                            },
                                        };
                                    }
                                    else if (el === "avaliable") {
                                        return {
                                            Header: "avaliable",
                                            accessor: el,
                                            width: 270,
                                            Cell: ({ value }) => (value === true ? "Yes" : "No"),
                                            filterMethod: (filter, row) => {
                                                if (filter.value === "all") {
                                                    return true;
                                                }
                                                if (filter.value === "true") {
                                                    return row[filter.id] === true;
                                                }
                                                return row[filter.id] === false;
                                            },
                                            Filter: ({ filter, onChange }) =>
                                                <select
                                                    onChange={event => onChange(event.target.value)}
                                                    style={{ width: "100%" }}
                                                    value={filter ? filter.value : "all"}
                                                >
                                                    <option value="all">Show All</option>
                                                    <option value="true">True</option>
                                                    <option value="false">False</option>
                                                </select>
                                        }
                                    }
                                    else {
                                        return {
                                            Header: el,
                                            accessor: el,
                                            id: Math.random(),
                                            className: "",
                                            className: "d-flex justify-content-center",
                                            Cell: (el) => {
                                                return <span>{el.original.id}</span>;
                                            },
                                        }
                                    }
                                })}
                            />

                            <li onClick={() => this.saveAccommodations()}>
                                <Link to="/Accommodations"> Go back accommodations</Link>
                            </li>
                        </Col>
                    </CardHeader>
                </Col >
            </Card >

        )
    }
}



export default ShowAll;
