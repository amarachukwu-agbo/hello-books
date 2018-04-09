import axios from 'axios';

const setHeader = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('userToken')}`;
};

export default setHeader;
