import React, { useState } from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination} from "@material-ui/core";
import './TableComponent.css';
import {RepositoryDataModel} from "./repository-data-model";

export const TableComponent = (props: {repoData: RepositoryDataModel[]}) => {
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void | undefined => {
        setRowsPerPage(parseInt(event.target.value));
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number): void => {
        setPage(newPage)
    }
    return (
        <div>
            <Paper className='paper'>
                <TableContainer>
                    <Table className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Repo Title</TableCell>
                                <TableCell>Owner</TableCell>
                                <TableCell>Stars</TableCell>
                                <TableCell>Created at</TableCell>
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
