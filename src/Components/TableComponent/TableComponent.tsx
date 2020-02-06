import React, {useEffect, useState} from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination} from "@material-ui/core";
import './TableComponent.css';
import {RepositoryDataModel} from "./repository-data-model";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {type} from "os";
type Order = 'asc' | 'desc';
interface Header {
    
}
export const TableComponent = (props: {repoData: RepositoryDataModel[]}) => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    // const [sortColumn, setSortColumn] = useState();
    // const [sortDirection, setSortDirection] = useState('desc');
    // const invertDirection = {
    //     asc: 'desc',
    //     desc: 'asc'
    // };
    useEffect(() => {

    }, [orderBy]);
    const tableHeaders = [{id: 'ID'}, {id: 'Repo Title'}, {id: 'Owner'}, {id: 'Stars'}, {id: 'Created at'}];
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void | undefined => {
        setRowsPerPage(parseInt(event.target.value));
    };

    const handleChangePage = (event: React.MouseEvent<HTMLTableHeaderCellElement> | null, newPage: number): void => {
        setPage(newPage)
    };

    // const handleSort: void = (columnName: string) => {
    //     setSortColumn(columnName);
    //     sortColumn === columnName ? setSortDirection(invertDirection[sortColumn]) : setSortDirection('asc');
    // }

    const handleHeaderChange = (event: React.MouseEvent<HTMLTableHeaderCellElement>): void => {
        // debugger;
        const headerMap: {[key: string]: string} = {
            'ID': 'id',
            'Repo Title': 'name',
            'Owner': 'owner',
            'Stars': 'stargazers_count',
            'Created at': 'created_at'
        };

        // setOrderBy(event.nativeEvent.toElement.innerText);
        const target = event.target as HTMLTextAreaElement;

        // if (target.innerHTML === )
        setOrderBy(headerMap[target.innerText]);
    };

    const sortBy = (a: RepositoryDataModel, b: RepositoryDataModel): number => {

        debugger;
        if (
            // @ts-ignore
            typeof (a[orderBy]) !== 'string') {
            // @ts-ignore
            return a[orderBy] - b[orderBy];

            // return a[orderBy].localCompare(b[orderBy]);
        } else {
            // @ts-ignore
            const firstHeader: string = a[orderBy];
            // @ts-ignore
            const secondHeader: string = b[orderBy];

            return firstHeader.localeCompare(secondHeader);
        }
    };

    const sortByAsc = (a: RepositoryDataModel, b: RepositoryDataModel): number => {
        if (
            // @ts-ignore
            typeof (a[orderBy]) !== 'string') {
            // @ts-ignore
            return a[orderBy] - b[orderBy];

            // return a[orderBy].localCompare(b[orderBy]);
        } else {
            // @ts-ignore
            const firstHeader: string = a[orderBy];
            // @ts-ignore
            const secondHeader: string = b[orderBy];

            return firstHeader.localeCompare(secondHeader);
        }
    };

    const sortByDesc = (a: RepositoryDataModel, b: RepositoryDataModel): number => {
        if (
            // @ts-ignore
            typeof (a[orderBy]) !== 'string') {
            // @ts-ignore
            return b[orderBy] - a[orderBy];

            // return a[orderBy].localCompare(b[orderBy]);
        } else {
            // @ts-ignore
            const firstHeader: string = a[orderBy];
            // @ts-ignore
            const secondHeader: string = b[orderBy];

            return secondHeader.localeCompare(firstHeader);
        }
    };
    // const TableHeadWithSorting = () => {
    //     return (
    //         <TableHead>
    //             <TableRow>
    //                 {tableHeaders.map(header => (
    //                     <TableCell
    //                         sortDirection={orderBy === header.id ? order : 'asc'}
    //                         >
    //                         <TableSortLabel
    //                             active={orderBy === header.id}
    //                             direction={orderBy === header.id ? order : 'asc'}
    //                             ></TableSortLabel>
    //                         {header.id}</TableCell>
    //                 ))}
    //             </TableRow>
    //         </TableHead>
    //     )
    // };

    // @ts-ignore
    // @ts-ignore
    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        {tableHeaders.map(header => {
                            return (
                                <th key={header.id}
                                onClick={handleHeaderChange}>{header.id}</th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {[...props.repoData]
                        .sort(sortBy)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(row => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.owner.login}</td>
                                <td>{row.stargazers_count}</td>
                                <td>{row.created_at.slice(0, 10)}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20]}
                component="div"
                count={props.repoData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                // @ts-ignore
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )

    // return (
    //     <div>
    //         <Paper className='paper'>
    //             <TableContainer>
    //                 <Table className='table'>
    //                         <TableHeadWithSorting/>
    //                     <TableBody>
    //                         {props.repoData
    //                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //                         .map(row => (
    //                             <TableRow key={row.id}>
    //                                 <TableCell>{row.id}</TableCell>
    //                                 <TableCell>{row.name}</TableCell>
    //                                 <TableCell>{row.owner.login}</TableCell>
    //                                 <TableCell>{row.stargazers_count}</TableCell>
    //                                 <TableCell>{row.created_at.slice(0, 10)}</TableCell>
    //                             </TableRow>
    //                         ))}
    //                     </TableBody>
    //                 </Table>
    //             </TableContainer>
    //             <TablePagination
    //                 rowsPerPageOptions={[5, 10, 15, 20]}
    //                 component="div"
    //                 count={props.repoData.length}
    //                 rowsPerPage={rowsPerPage}
    //                 page={page}
    //                 onChangePage={handleChangePage}
    //                 onChangeRowsPerPage={handleChangeRowsPerPage}
    //             />
    //         </Paper>
    //     </div>
    // )
};
