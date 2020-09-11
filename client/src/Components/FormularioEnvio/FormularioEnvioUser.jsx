import React, {useState} from 'react';
import axios from 'axios';
import './FormularioEnvioUser.css';
import 'bootstrap/dist/css/bootstrap.css';

const urlBack = process.env.REACT_APP_API_URL;

export default function FormEnvioUser() {
		
		// const {
		// 	id,
		// 	recipient_name,
		// 	recipient_lastname,
		// 	country,
		// 	city,
		// 	address,
		// 	postal_code,
		// 	phone_number,
		// 	shipping_type,	
		// }

	
	const [inputValues, setInputValues] = useState({
		id: 0,
		recipient_name: "",
		recipient_lastname: "",
		country: "",
		city: "",
		address: "",
		postal_code:0,
		phone_number:0,
		shipping_type:"",
	});

	const handleInputChange = event => {
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	const handleSend = event => {
		event.preventDefault();

		axios
		.put(`${urlBack}/user/:userId/cart`, inputValues)
		.then(() => alert('Sus datos se han registrado correctamente'))
		.catch(err => alert(err.message));
	}

	return (
		<div className="productFormAdmin">
			<div className="productTableTitleContainer">
				<div className="productTableTitle">
				<form className="FormEnvio">
					<h3>Formulario de Envio</h3>
				<label htmlFor="Nombre" className="">
							Nombre:
						</label>
				<input
					className="product"
					type="text"
					name="recipient_name"
					value={inputValues.recipient_name}
					placeholder="Nombre"
					onChange={handleInputChange}
				/>
				<label htmlFor="Apellido" className="">
							Apellido:
				</label>
				<input
					className="product"
					type="text"
					name="recipient_lastname"
					value= {inputValues.recipient_lastname}
					placeholder="Apellido"
					onChange={handleInputChange}
				/>
				<label htmlFor="Pais" className="">
							Pais:
						</label>
				<input
					className="product"
					type="text"
					name="country"
					value={inputValues.country}
					placeholder="Pais"
					onChange={handleInputChange}
				/>
				<label htmlFor="Ciudad" className="">
							Ciudad:
						</label>
				<input
					className="product"
					type="text"
					name="city"
					value={inputValues.city}
					placeholder="Ciudad"
					onChange={handleInputChange}
				/>
				<label htmlFor="Direccion" className="">
							Dirección:
						</label>
				<input
					className="product"
					type="text"
					name="address"
					value={inputValues.address}
					placeholder="Dirección"
					onChange={handleInputChange}
				/>
				<label htmlFor="CodigoPostal" className="">
							Código Postal:
						</label>
				<input
					className="product"
					type="text"
					name="postal_code"
					value={inputValues.postal_code}
					placeholder="Código Postal"
					onChange={handleInputChange}
				/>
				<label htmlFor="Telefono" className="">
							Telefono:
						</label>
				<input
					className="product"
					type="text"
					name="phone_number"
					value={inputValues.phone_number}
					placeholder="Telefono"
					onChange={handleInputChange}
				/>
				<label htmlFor="TipodeEnvio" className="">
							Tipo de Envio:
						</label>
				<input
					className="product"
					type="text"
					name="shipping_type"
					placeholder="Tipo de Envio"
					value={inputValues.shipping_type}
					onChange={handleInputChange}
				/>
				<div className="formActionContainer">
					<button type="submit" className="SendBtn" value="Edit" onClick={handleSend}>
						Aceptar
					</button>
				</div>
			</form>

				</div>
			</div>
			
		</div>
	);
}
