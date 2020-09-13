import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './userFormLine.css';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export default function UserFormAdmin(props) {
	//React Hooks
	const {
		id,
		name,
		email,
		password,
		rol
	} = props.userInfo;

	const [inputValues, setInputValues] = useState({
		id,
		name,
		email,
		password,
		rol,
	});

	const [stateEdit, setStateEdit] = useState({
		edit: 'editClose',
	});

	//const [selectedId, setSelectedId] = useState(0);

	// ----------- Funcionalidad ----------

	const handleInputChange = event => {
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	const clickHandle = event => {
		event.preventDefault();
		setStateEdit({
			...stateEdit,
			edit: stateEdit.edit === 'editClose' ? 'editOpen' : 'editClose'
		});
	}

	const handleSelectChange = event => {
		setInputValues({...inputValues, status: event.target.value});
	};

	const handleEdit = event => {
		event.preventDefault();

		axios
			.put(`${urlBack}/user/${id}`, inputValues)
			.then(() => alert('Se realizaron los cambios'))
			.catch(err => alert(err.message));
	};

	const handleDelete = event => {
		event.preventDefault();

		axios
			.delete(`${urlBack}/user/${id}`)
			.then(response => {
				alert(response.statusText);
				})
				//Algo para que se actualice
			.catch(error => alert('No se pudo eliminar el usuario: ' + error.message));
	};

	return (
		<div>
		
			<ul className="userFormLine">
				<div className="inputTag" id={name}>{name}</div>
				<div className="inputTag" id={email}>{email}</div>
				<div className="inputTag" id={password}>{password}</div>
				<div className="inputTag" id={rol}>{rol}</div>
				<div calssName="userActionContainer">
					<button type="submit" className="editBtn" value="Edit" onClick={clickHandle}>
						<svg
							width="1em" height="1em" viewBox="0 0 16 16"
							class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
							<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
						</svg>
					</button>
					<button type="submit" className="deleteBtn" value="Delete" onClick={handleDelete}>
						<svg
							width="1em" height="1em" viewBox="0 0 16 16"
							class="bi bi-person-dash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5-.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
						</svg>
					</button>
				</div>
			</ul>
			<form className={stateEdit.edit}>
				<input className="inputTag" type="text" name="name" value={inputValues.name} onChange={handleInputChange}></input>
				<input className="inputTag" type="text" name="email" value={inputValues.email} onChange={handleInputChange}></input>
				<input className="inputTag" type="text" name="password" value={inputValues.password} onChange={handleInputChange}></input>
				<select className="inputTag" defaultValue={rol} onChange={handleSelectChange}>
					<option value="Usuario">Usuario</option>
					<option value="Admin">Admin</option>
				</select>
				<div calssName="userActionContainer">
					<button type="submit" className="editBtn" value="Edit" onClick={handleEdit}>
						Aceptar
					</button>
				</div>
			</form>
		</div>
	);
}
