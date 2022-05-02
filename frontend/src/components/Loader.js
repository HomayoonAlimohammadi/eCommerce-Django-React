import {Spinner} from 'react-bootstrap'
import React from 'react'


function Loader() {
    return (
        <Spinner
        animation='border'
        role='status'
        style={{
            width: '50px',
            height: '50px',
            display: 'block',
            margin: 'auto',
            marginTop: '100px'
        }}
        >
            <span className='visually-hidden'>Loading...</span>
        </Spinner>
    )
    
}

export default Loader