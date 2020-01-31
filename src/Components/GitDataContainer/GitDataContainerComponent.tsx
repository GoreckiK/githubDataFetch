import React, {ChangeEvent, FormEvent} from "react";
import {TableComponent} from "../TableComponent/TableComponent";
import './GitDataContainerComponent.css';
import {RepositoryDataModel} from "../TableComponent/repository-data-model";
import {TextField} from "@material-ui/core";
import {getRepositoriesByName} from "../../API";

export class GitDataContainerComponent extends React.Component<{}, {gitHubData: RepositoryDataModel[], searchedName: string}> {
    constructor(props: any) {
        super(props);
        this.state = {
            gitHubData: [],
            searchedName: ''
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (localStorage.getItem('searchedName') !== this.state.searchedName) {
            getRepositoriesByName(this.state.searchedName)
                .then(res => {
                    // @ts-ignore
                    localStorage.setItem('searchedName', this.state.searchedName);
                    this.setState({
                        gitHubData: res.data.items
                    });
                })
                .catch(err => console.error(err));
        }
    };

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchedName: e.target.value
        })
    };

    render() {
        return (
            <div className="git-table">
                <form className="search-form" onSubmit={this.onFormSubmit}>
                    <TextField id="repo-search" variant="filled" size="small" onChange={this.onChange}/>
                </form>
                <TableComponent repoData={this.state.gitHubData}/>
            </div>
        )
    }
}
