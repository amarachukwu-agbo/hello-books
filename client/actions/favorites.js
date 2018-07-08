import axios from 'axios';
import {
  FETCHING_FAVORITES,
  FAVORITES_SUCCESS,
  FAVORITES_FAILURE,
} from './types';
import checkError from '../helpers/checkError';
import setHeader from '../helpers/setHeader';
import { apiURL } from './signUp';


const fetchingFavorites = () => ({
  type: FETCHING_FAVORITES,
});

const favoritesSuccess = ({ favorites, pagination }) => ({
  type: FAVORITES_SUCCESS,
  favorites,
  pagination,
});

const favoritesFailure = error => ({
  type: FAVORITES_FAILURE,
  error,
});

const getUserFavorites = (userId, page) => (dispatch) => {
  dispatch(fetchingFavorites());
  setHeader();
  return axios.get(`${apiURL}/users/${userId}/favBooks?page=${page}`)
    .then((response) => {
      dispatch(favoritesSuccess(response.data));
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      dispatch(favoritesFailure(errorMessage));
    });
};

export default getUserFavorites;

