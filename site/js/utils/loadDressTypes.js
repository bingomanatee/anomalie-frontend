import axios from 'axios';
import { API_ROOT } from '../constants';

export default () => axios.get(`${API_ROOT}dress_types/`)
  .then(({ data }) => data);
