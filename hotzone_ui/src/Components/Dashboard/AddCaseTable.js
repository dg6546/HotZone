import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import {TextField} from "@material-ui/core";


function createData(id, name, address, x, y) {
    return {id, name, address, x, y};
}


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {id: 'id', label: 'ID'},
    {id: 'name', label: 'Name'},
    {id: 'Address', label: 'Address'},
    {id: 'x', label: 'X'},
    {id: 'y', label: 'Y'},
];

function EnhancedTableHead(props) {
    const {classes, order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const [,...headCellsToDisplay] = headCells;

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                </TableCell>
                {headCellsToDisplay.map((headCell) => {
                        if (headCell.id !== 'id')
                            return (
                                <TableCell
                                    key={headCell.id}
                                    align={'right'}
                                    padding={'default'}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id ? order : 'asc'}
                                        onClick={createSortHandler(headCell.id)}
                                        className={classes.headerCells}
                                    >
                                        {headCell.label}
                                    </TableSortLabel>
                                </TableCell>
                            )
                        return <></>
                    }
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const {value, handleSearch} = props;
    const classes = useToolbarStyles();
    return (
        <Toolbar className={"border-bottom"}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Locations
            </Typography>
            <TextField  placeholder="Search" onChange={handleSearch} value={value} />
        </Toolbar>
    );
};


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    headerCells: {
        fontWeight: 'bold'
    }
}));

export default function AddCaseTable(props) {
    const {onSelect, data} = props;
    const [rows, setRows] = React.useState([]);
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchValue, setSearchValue]=React.useState('');
    const [filteredData, setFilteredData] = React.useState([]);

    const handleSearch = event => {
        let filteredData = [];
        filteredData = rows.filter(e => {
            let items = Object.values(e);
            let retVal = false;
            items.forEach(e => {
                const regex = new RegExp(event.target.value, 'gi');
                let ret = e.toString().match(regex);
                if (ret) retVal=true;
            })
            return retVal;
        })
        setFilteredData(filteredData);
        setSearchValue(event.target.value);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (_, id) => {
        if (selected === id) {
            setSelected(null);
            onSelect(null);
        } else {
            setSelected(id);
            onSelect(id);
        }
    };

    const handleChangePage = (event, newPage) => {
        console.log("changing page to ", newPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected === id;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

    useEffect(() => {
        console.log("new data incoming")
        let temp = [];
        for (let i = 0; i < data.length; i++) {
            temp.push(createData(i, data[i]['nameEN'], data[i]['addressEN'], data[i]['x'], data[i]['y']))
        }
        setRows(temp);
        setFilteredData(temp);
    }, [data])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar value={searchValue} handleSearch={handleSearch}/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(filteredData, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </TableCell>
                                            {/*<TableCell component="th" id={labelId} scope="row" padding="none" align="right">*/}
                                            {/*    {row.id}*/}
                                            {/*</TableCell>*/}
                                            <TableCell align="right">{row.name}</TableCell>
                                            <TableCell align="right">{row.address}</TableCell>
                                            <TableCell align="right">{row.x}</TableCell>
                                            <TableCell align="right">{row.y}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: (53) * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}