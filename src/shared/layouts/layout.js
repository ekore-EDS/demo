import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import HeaderLeftBanner from '../../assets/images/headerleftbanner.svg';
import NavbarMenu from './menu/Menu';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';
import './Layout.css';

const StyledMenu = styled((props) => (
    <Menu elevation={0} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}{...props} />))
    (({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': { padding: '4px 0', },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                }, '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        }
    }));

const Layout = () => {
    let navigate = useNavigate();
    const [navbarObj, setShowNavbar] = useState({ enable: false });
    const [menuNewDropdown, setMenuNewDropdown] = React.useState(null);
    const open = Boolean(menuNewDropdown);

    //show and hide navbar
    const handleShowNavbar = () => {
        setShowNavbar(!navbarObj.enable)
    }

    //navigate to invoice
    const newInvoice = () => {
        let path = '/invoice';
        navigate(path);
        handleClose();
    }

    const handleClick = (event) => {
        setMenuNewDropdown(event.currentTarget);
    };

    const handleClose = () => {
        setMenuNewDropdown(null);
    };

    return (<nav className="navbar py-0 bg-black customNavbar">
        <div className="container-fluid ps-0">
            {/* <HeaderLeftBanner className='img-fluid' /> */}
            <img src={HeaderLeftBanner} className='h-100 img-fluid' alt='' />
            <div className="menu-icon" onClick={handleShowNavbar}>
                <img src={HeaderLeftBanner} className='img-fluid' alt='' />
            </div>
            <NavbarMenu menuObjData={navbarObj} />
            <div className='d-flex align-items-center'>
                {/* <Button type="button" className='me-4' fullWidth
                    onClick={newInvoice} variant="contained">New</Button>
                <Avatar src="/broken-image.jpg" /> */}
                <Button id="menuNewBtn" className='me-4 gradientRoseYellowBtn' aria-controls={open ? 'menuNew' : undefined}
                    aria-haspopup="true" size='small' aria-expanded={open ? 'true' : undefined}
                    variant="contained" disableElevation onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
                    Options</Button>
                <StyledMenu id="menuNew" MenuListProps={{ 'aria-labelledby': 'menuNewBtn' }}
                    anchorEl={menuNewDropdown} open={open} onClose={handleClose}>
                    <MenuItem onClick={newInvoice} disableRipple>
                        {/* <EditIcon /> */}
                        Invoice
                    </MenuItem>
                </StyledMenu>
                <Avatar src="/broken-image.jpg" />
            </div>
        </div>
    </nav>)
}

export default Layout;