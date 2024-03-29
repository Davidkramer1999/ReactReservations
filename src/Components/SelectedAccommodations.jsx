import React, { useEffect, useState, useContext } from 'react'

import { Context } from "../Context";
import AccommodationsTable from "./AccommodationsTable";

export default function SelectedAccommodations() {

    const [showReservations, setShowReservations] = useState([])
    const { accommodations } = useContext(Context)
    const headers = ['id', 'crypto', 'name', 'address', 'available', 'city', 'country', 'createdAt']

    useEffect(() => {
        const showReservations = accommodations.filter(el => el.selected === true)
        setShowReservations(showReservations)
    },[accommodations])

    return (
        <AccommodationsTable
            headers={headers}
            selectedAccommodations={showReservations}
        />
    )
}