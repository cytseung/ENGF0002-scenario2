import { Typography } from "@mui/material"

import './Navbar.css';

const Navbar = ({ children }) => {
    return (
        <nav className="nav" >
            <Typography variant="h4">{children}</Typography>
        </nav>
    )
}

export default Navbar