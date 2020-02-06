import React, {useEffect, useState} from 'react'
import {TablePagination} from "@material-ui/core";
import './TableComponent.css';
import {RepositoryDataModel} from "./repository-data-model";
type Order = 'asc' | 'desc';

export const TableComponent = (props: {repoData: RepositoryDataModel[]}) => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    
    useEffect(() => {

    }, [orderBy]);
    const tableHeaders = [{id: 'ID'}, {id: 'Repo Title'}, {id: 'Owner'}, {id: 'Stars'}, {id: 'Created at'}];
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void | undefined => {
        setRowsPerPage(parseInt(event.target.value));
    };

    const orderMap: {[key: string]: Order} = {
        'asc' : 'desc',
        'desc' : 'asc'
    };

    const handleChangePage = (event: React.MouseEvent<HTMLTableHeaderCellElement> | null, newPage: number): void => {
        setPage(newPage)
    };

    const handleHeaderChange = (event: React.MouseEvent<HTMLTableHeaderCellElement>): void => {
        const headerMap: {[key: string]: string} = {
            'ID': 'id',
            'Repo Title': 'name',
            'Owner': 'ownerName',
            'Stars': 'stargazers_count',
            'Created at': 'created_at'
        };

        const target = event.target as HTMLTextAreaElement;
        if (orderBy === headerMap[target.innerText]) setOrder(orderMap[order])
        setOrderBy(headerMap[target.innerText]);
    };

    const sortBy = (a: RepositoryDataModel, b: RepositoryDataModel): number => {
        if(order === 'asc') return sortByAsc(a,b);
        else return sortByDesc(a,b);
    };

    const sortByAsc = (a: RepositoryDataModel, b: RepositoryDataModel): number => {
        if (
            // @ts-ignore
            typeof (a[orderBy]) !== 'string') {
            // @ts-ignore
            return a[orderBy] - b[orderBy];

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
                                <td>{row.ownerName}</td>
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
};
