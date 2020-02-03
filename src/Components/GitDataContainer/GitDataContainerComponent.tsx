import React, {ChangeEvent, FormEvent} from "react";
import {TableComponent} from "../TableComponent/TableComponent";
import './GitDataContainerComponent.css';
import {RepositoryDataModel} from "../TableComponent/repository-data-model";
import {TextField} from "@material-ui/core";
import {getRepositoriesByName} from "../../API";
import _ from 'lodash';

export class GitDataContainerComponent extends React.Component<{}, {gitHubData: RepositoryDataModel[], searchedName: string}> {
    constructor(props: any) {
        super(props);
        this.state = {
            gitHubData: [],
            searchedName: ''
        };
        this.onFormSubmit = _.debounce(this.onFormSubmit.bind(this), 250);
    }

    onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        // e.preventDefault();
        // if (localStorage.getItem('searchedName') !== this.state.searchedName) {
        //     getRepositoriesByName(this.state.searchedName)
        //         .then(res => {
        //             // @ts-ignore
        //             localStorage.setItem('searchedName', this.state.searchedName);
        //             this.setState({
        //                 gitHubData: res.data.items
        //             });
        //         })
        //         .catch(err => console.error(err));
        // }
    };

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        debugger;
        // this.setState({
        //     searchedName: e.target.value
        // });
        e.preventDefault();
        if (!localStorage.getItem(e.target.value)) {
            getRepositoriesByName(e.target.value)
                .then(res => {
                    // @ts-ignore
                    localStorage.setItem(e.target.value, e.target.value);
                    this.setState({
                        gitHubData: res.data.items
                    });
                })
                .catch(err => console.error(err));
        } else {
                // @ts-ignore
            this.setState({
                gitHubData: localStorage.getItem(e.target.value)
            });
        }
    };

    render() {
        return (
            <div className="git-table">
                <form className="search-form">
                    <TextField id="repo-search" variant="filled" size="small" onChange={this.onChange}/>
                </form>
                <TableComponent repoData={this.state.gitHubData}/>
            </div>
        )
    }
}
