import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './listItems';
import Avatar from '@material-ui/core/Avatar';
import Table from './Table';
import Modal from '@material-ui/core/Modal';
import AddCaseForm from "./AddCase";
import { DropdownButton } from 'react-bootstrap';
import {Dropdown} from "react-bootstrap";
import {useHistory} from "react-router-dom";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                CHP
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function Index() {
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [select, setSelect] = React.useState();
    const [openModal, setOpenModal] = React.useState(false);


    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSelect = (case_number) =>{
        setSelect(case_number);
    }
    const handleModalOpen = () =>{
        console.log(select);
        setOpenModal(true);
    }

    const handleModalClose = () =>{
        setOpenModal(false);
    }

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        HotZone
                    </Typography>
                    {/*<IconButton color="inherit">*/}
                        <DropdownButton id="dropdown-basic-button" title="Profile">
                            <Dropdown.Item href="#" onClick={()=>{history.push('/change-password')}}>Change Password</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={()=>{history.push('/logout')}}>Log Out</Dropdown.Item>
                        </DropdownButton>
                    {/*</IconButton>*/}

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                {/*<Divider />*/}
                {/*<List>{secondaryListItems}</List>*/}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                        {/* Active Cases */}
                            <Paper>
                                <div>
                                    <Table onSelect={handleSelect}/>
                                </div>
                            </Paper>
                    {
                        select && <button type="submit" className="btn btn-outline-primary" onClick={handleModalOpen}>
                            Add Location Records For Case Number: {select}
                        </button>
                    }

                    <Modal
                        open={openModal}
                        onClose={handleModalClose}
                        className={classes.modal}
                    >
                        <div className={classes.modalPaper}>
                            <AddCaseForm case_number={select} handleModalClose={handleModalClose}/>
                            {/*<h2 id="spring-modal-title">Spring modal</h2>*/}
                            {/*<p id="spring-modal-description">react-spring animates me.</p>*/}
                        </div>
                    </Modal>

                    {/*    /!* Recent Deposits *!/*/}
                    {/*    <Grid item xs={12} md={4} lg={3}>*/}
                    {/*        <Paper className={fixedHeightPaper}>*/}
                    {/*            <Deposits />*/}
                    {/*        </Paper>*/}
                    {/*    </Grid>*/}
                    {/*    /!* Recent Orders *!/*/}
                    {/*    <Grid item xs={12}>*/}
                    {/*        <Paper className={classes.paper}>*/}
                    {/*            <Orders />*/}
                    {/*        </Paper>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                    {/*<Box pt={4}>*/}
                    {/*    <Copyright />*/}
                    {/*</Box>*/}
                </Container>
            </main>
        </div>
    );
}