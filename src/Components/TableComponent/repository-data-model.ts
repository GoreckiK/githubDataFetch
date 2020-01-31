export type RepositoryDataModel = {
    id: number,
    name: string,
    owner: {
        login: string
    },
    stargazers_count: number,
    created_at: string
}
