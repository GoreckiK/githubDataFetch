import React from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import './TableComponent.css';
import {RepositoryDataModel} from "./repository-data-model";

export const TableComponent = (props: {repoData: RepositoryDataModel[]}) => {
    return (
        <TableContainer component={Paper}>
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
                    {props.repoData.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.owner.login}</TableCell>
                            <TableCell>{row.stargazers_count}</TableCell>
                            <TableCell>{row.created_at}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};
