import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Delete from './Delete';

const Edit = (props) => {
	const { id } = props; // this comes from the route's URL
	
	const [ name, setName ] = useState("");
	const [ errors, setErrors ] = useState({});


	useEffect(() => {
		axios.get("http://localhost:8000/api/authors/" + id)
			.then((res) => {
				console.log(res.data);
				setName(res.data.name);
			})
			.catch((err) => {
				console.log(err)
			});
	}, []);

	const redirectAfterDelete = () => {
		navigate("/authors");
	}

	const handleSubmit = (e) => {
		// whenever a form is submitted we must - if we don't we will lose all of our state!!
		e.preventDefault();

		// this syntax is a matter of preference - see the edit component for alternate syntax
		const tempAuthor = {
			name,    // new ES6 shortcut syntax - if key and value are the same name, just put it once

		};

		axios.put("http://localhost:8000/api/authors/" + id, tempAuthor)
			.then((res) => {
				console.log(res);
				navigate("/authors/" + res.data._id);
			})
			.catch((err) => {
				console.log(err);
				console.log(err.response.data.errors);
				// err.response.data is the body that you get in Postman
				if(err.response.data.errors) {
					// save the errors in state so we can display them
					setErrors(err.response.data.errors);
				}
			})
	}

	return (
		<div>
			<h2>Edit Author</h2>
            <Link to="/authors">Home</Link>
			<form>
				<div>
					<label>Name: </label>
					{
						errors.name ? 
							<span className="error-text">{errors.name.message}</span>
							: null
					}
					<input
						type="text"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						/>
				</div>
			</form>
			<div>
				<button onClick={handleSubmit}>Update Author</button>
				<Delete authorId={id} afterDelete={redirectAfterDelete} />
			</div>
		</div>
	)
}

export default Edit;
