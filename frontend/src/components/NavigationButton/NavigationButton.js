import React from 'react'
import { Button } from '@mui/material'
import './NavigationButton.css';

const NavigationButton = ({ href, variant, children, onClick }) => {
    return (
        <>
            <Button className="navButton" href={href} variant={variant} onClick={onClick}>{children}</Button>
        </>
    )
}

export default NavigationButton