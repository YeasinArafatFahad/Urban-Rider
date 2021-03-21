import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './../fakedata/data.json'
import Ride from '../RIde/Ride';

const Home = () => {
    const [rides, setRide] = useState([])
    useEffect(() => {
        setRide(data)
    }, [])
    return (
        <div className="container rounded">
            <div className="row d-flex align-items justify-content-center ">
                {
                    rides.map(ride => <Ride ride={ride}></Ride>)
                }
            </div>

        </div>
    );
};

export default Home;