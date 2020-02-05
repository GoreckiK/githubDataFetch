import React, {FormEvent} from "react";
import {TableComponent} from "../TableComponent/TableComponent";
import './GitDataContainerComponent.css';
import {RepositoryDataModel} from "../TableComponent/repository-data-model";
import {TextField} from "@material-ui/core";
import {getRepositoriesByName} from "../../API";
import { debounce } from 'lodash';

export class GitDataContainerComponent extends React.Component<{}, {gitHubData: RepositoryDataModel[], latestSearch: string}> {
    constructor(props: any) {
        super(props);
        this.state = {
            gitHubData: [],
            latestSearch: ''
        };
        this.onChange = debounce(this.onChange.bind(this), 350);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        const query = localStorage.getItem('latestSearch') || '';
        const latestSearchData = localStorage.getItem(query);
        if (query) this.setState({
            gitHubData: typeof(latestSearchData) === 'string' ? JSON.parse(latestSearchData) : []
        })
    }

    onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    };

    onChange = (value: string): void => {
        if (value && !localStorage.getItem(value)) {
            getRepositoriesByName(value)
                .then(res => {
                    // @ts-ignore
                    localStorage.setItem(value, JSON.stringify(res.data.items));
                    localStorage.setItem('latestSearch', value);
                    this.setState({
                        gitHubData: res.data.items,
                        latestSearch: value
                    });
                })
                .catch(err => console.error(err));
        } else {
            // @ts-ignore
            const localStorageData = JSON.parse(localStorage.getItem(value));
            localStorage.setItem('latestSearch', value);
            this.setState({
                gitHubData: localStorageData,
                latestSearch: value
            });
        }
    };

    render() {
        return (
            <div className="git-table">
                <form className="search-form" onSubmit={this.onFormSubmit}>
                    <TextField id="repo-search" variant="filled" size="small" onChange={({target: {value}}) => this.onChange(value)}/>
                </form>
                <TableComponent repoData={this.state.gitHubData}/>
            </div>
        )
    }
}
