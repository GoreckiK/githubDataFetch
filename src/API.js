import axios from 'axios';

export const getRepositoriesByName = (name) => {
    return axios.get(`https://api.github.com/search/repositories?q=${name}`)
};
