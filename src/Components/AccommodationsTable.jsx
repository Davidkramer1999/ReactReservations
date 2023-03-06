import React, { useContext } from 'react'
import ReactTable from 'react-table-v6'
import { matchSorter } from 'match-sorter'
import { Context } from '../Context'

import 'react-table-v6/react-table.css'

export default function AccommodationsTable({ headers, selectedAccommodations }) {

    const { accommodations, setAccommodations } = useContext(Context)

    const getSelected = (item, value) => {
        item.selected = value
        let i = accommodations.indexOf(item);
        accommodations[i] = item
        setAccommodations(accommodations)
    }
    return (
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
            data={typeof selectedAccommodations === "undefined" ? accommodations : selectedAccommodations}
            columns={headers.map((el, index) => {
                if (el === "id") {
                    return {
                        Header: "No.",
                        accessor: el,
                        width: 50,
                        Cell: (el) => {
                            return <span>{el.original.id}</span>;
                        },
                    };
                } else if (el === "name") {
                    return {
                        className: "p-0",
                        Header: "Name",
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
                else if (el === "crypto") {
                    return {
                        Header: "",
                        accessor: el,
                        width: 270,
                        Cell: (el) => {
                            return <span>{
                                <div>
                                    {el.original.price.map((el, index) => {
                                        return (<li key={index}>{el.symbol + ":" + Math.round(el.priceInCurrency)}</li>)
                                    })}
                                </div>
                            }</span>;
                        },
                    };
                }
                else if (el === "address") {
                    return {
                        Header: "address",
                        id: "Address",
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
                        Header: "City",
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
                        Header: "Country",
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
                        Header: "Price in eur",
                        accessor: el,
                        id: "priceInEur",
                        filterMethod: (filter, rows) =>
                            matchSorter(rows, filter.value, { keys: ["priceInEur"] }),
                        filterAll: true,
                        width: 270,
                        Cell: (el) => {
                            return <span>{`${Math.round(el.original.priceInEur)} €`}</span>;
                        },
                    };
                }
                else if (el === "createdAt") {
                    return {
                        Header: "Created",
                        accessor: el,
                        width: 270,
                        Cell: (el) => {
                            return <span>{el.original.createdAt}</span>;
                        },
                    };
                }
                else if (el === "available") {
                    return {
                        Header: "Available",
                        accessor: el,
                        width: 170,
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
                                style={{ width: 70 }}
                                value={filter ? filter.value : "all"}
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                    }
                }
                else if (el === "checkbox") {
                    return {
                        Header: "#",
                        width: 40,
                        className: "d-flex justify-content-center",
                        Cell: (el) => {
                            return <div className="form-check">
                                <input
                                    type="checkbox"
                                    onChange={(e) => getSelected(el.original, e.target.checked)}
                                    checked={el.original.selected} />
                            </div>
                        },
                    };
                }
                else {
                    return {
                        accessor: el,
                        className: "d-flex justify-content-center",
                        Cell: (el) => {
                            return <div>{el.original.id}</div>
                        },
                    }
                }
            })}
        />
    )
}

