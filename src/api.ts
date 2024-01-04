import axios from 'axios';

import {API_TOKEN} from '@env';

const api = axios.create({headers: {Authorization: `Bearer ${API_TOKEN}`}});

export default api;
