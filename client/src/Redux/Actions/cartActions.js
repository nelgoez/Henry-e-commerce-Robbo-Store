import * as actionTypes from './actionTypes';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export const getUserCart = userId => dispatch => {
	axios
		.get(`${urlBack}/user/${userId}/cart`)
		.then(res => {
			dispatch({
				type: actionTypes.GET_USER_CART,
				payload: res.data
			});
		})
		.catch(() => dispatch(postUserCart(userId)));
};

export const postUserCart = userId => dispatch => {
	axios
		.post(`${urlBack}/user/${userId}/cart`)
		.then(res =>
			dispatch({
				type: actionTypes.POST_USER_CART,
				payload: res.data
			})
		)
		.catch(err => dispatch(onError(err.response.data)));
};

export const emptyCart = () => dispatch => {
	dispatch({type: actionTypes.EMPTY_CART});
};

const onError = errorMessage => {
	return {
		type: actionTypes.CART_ERROR,
		payload: errorMessage
	};
};
