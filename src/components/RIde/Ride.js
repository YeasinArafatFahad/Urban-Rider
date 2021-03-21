import React from 'react';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/Card'
import './Ride.css'
const Ride = (props) => {
    const { img } = props.ride
    console.log(img)
    return (
        <div >
            <div className='col-md-4 mb-2'>
                <div className="card card shadow p-3 mb-5 bg-light rounded " style={{ width: '200px', height: '200px' }}>
                    <div className="card-body ">
                        <img style={{ width: '100%', height: '100%' }} class="card-img-top" src={img} alt="Card image cap"></img>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Ride;