import React, { useState } from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination} from "@material-ui/core";
import './TableComponent.css';
import {RepositoryDataModel} from "./repository-data-model";
type Order = 'asc' | 'desc';
interface Header {
    
}
export const TableComponent = (props: {repoData: RepositoryDataModel[]}) => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');  
    // const [sortColumn, setSortColumn] = useState();
    // const [sortDirection, setSortDirection] = useState('desc');
    // const invertDirection = {
    //     asc: 'desc',
    //     desc: 'asc'
    // };
    const tableHeaders = [{id: 'ID'}, {id: 'Repo Title'}, {id: 'Owner'}, {id: 'Stars'}, {id: 'Created at'}];
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void | undefined => {
        setRowsPerPage(parseInt(event.target.value));
    } 

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number): void => {
        setPage(newPage)
    }

    // const handleSort: void = (columnName: string) => {
    //     setSortColumn(columnName);
    //     sortColumn === columnName ? setSortDirection(invertDirection[sortColumn]) : setSortDirection('asc');
    // }

    const TableHeadWithSorting = () => {
        return (
            <TableHead>
                <TableRow>

                </TableRow>
            </TableHead>
        )
    }

    return (
        <div>
            <Paper className='paper'>
                <TableContainer>
                    <Table className='table'>
                        <TableHead>
                            <TableRow>
                                {tableHeaders.map(header => (
                                <TableCell 
                                    sortDirection={orderBy === header.id ? order : 'asc'}>
                                    {header.id}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.repoData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.owner.login}</TableCell>
                                    <TableCell>{row.stargazers_count}</TableCell>
                                    <TableCell>{row.created_at.slice(0, 10)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    component="div"
                    count={props.repoData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
};
