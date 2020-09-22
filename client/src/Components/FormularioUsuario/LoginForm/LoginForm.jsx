import React, {useState, useRef} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {allActions} from '../../../Redux/Actions/actions';
import {openEye, closedEye, success, failure, googleIcon} from '../../../multimedia/SVGs';
import 'bootstrap/dist/css/bootstrap.css';
import '../UserForm.css';
import axios from 'axios';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

export default function LoginForm() {
	// Redux
	const orderlines = useSelector(state => state.cart.currentCart.orderlines);
	const dispatch = useDispatch();

	// React Hooks
	const [hidePassword, setHidePassword] = useState(true);
	const [error, setError] = useState('');
	const [loggedIn, setLoggedIn] = useState('');
	const [inputValues, setInputValues] = useState({
		email: null,
		password: null
	});
	const [redirect, setRedirect] = useState(false);
	const [google, setGoogle] = useState('');

	const formulario = useRef(0);

	// ------------ Functionality ---------

	const onEnterKey = e => {
		if (e.key === 'Enter') handleLogin(e);
	};

	const revealPassword = () => setHidePassword(!hidePassword);

	const handleInputChange = event => {
		if (error) setError('');
		if (loggedIn) setLoggedIn('');
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	const handleLogin = async event => {
		event.preventDefault();

		if (!inputValues.email || !inputValues.password) {
			return setError('Debes completar todos los campos');
		}

		try {
			// Inicia sesión
			const user = await axios.post(`${urlBack}/auth/login`, inputValues);

			dispatch(allActions.userActions.login(user.data));
			setLoggedIn('Iniciaste sesión con éxito!');
		} catch (error) {
			setError('Email o contraseña incorrectos');
		}
	};

	return (
		<form className="form" onSubmit={handleLogin} ref={formulario}>
			<a href={`${urlBack}/auth/google`}>{googleIcon} Inicia sesión con Google</a>
			{redirect && <Redirect to={`${google}`} />}
			<h3 className="titulo">Iniciar sesión</h3>
			<br />

			<label htmlFor="Email" className="">
				Email:
			</label>
			<input
				className="form-control"
				type="text"
				name="email"
				value={inputValues.email}
				placeholder="Email"
				onChange={handleInputChange}
				onKeyPress={onEnterKey}
			/>
			<br />

			<label htmlFor="nombre">Contraseña:</label>
			<div className="password-wrapper">
				<input
					className="form-control"
					type={hidePassword ? 'password' : 'text'}
					name="password"
					placeholder="Contraseña"
					value={inputValues.password}
					onChange={handleInputChange}
					onKeyPress={onEnterKey}
				/>
				{hidePassword && <i onClick={revealPassword}>{openEye}</i>}
				{!hidePassword && <i onClick={revealPassword}>{closedEye}</i>}
			</div>

			<button type="submit" className="addBtn" value="Enviar" onClick={handleLogin}>
				Iniciar sesión
			</button>
			<br />
			<br />

			{error && (
				<div className="error">
					{failure} {error} <br />
				</div>
			)}
			{loggedIn && (
				<div className="success">
					{success} {loggedIn} <br />
				</div>
			)}
		</form>
	);
}
