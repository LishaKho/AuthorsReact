import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';

const Create = (props) => {
	const [ name, setName ] = useState("");

	const [ errors, setErrors ] = useState({});


	const handleSubmit = (e) => {
		// whenever a form is submitted we must - if we don't we will lose all of our state!!
		e.preventDefault();

		// this syntax is a matter of preference - see the edit component for alternate syntax
		const newAuthor = {
			name,
		};

		axios.post("http://localhost:8000/api/authors/", newAuthor)
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
			<h2>Create Author</h2>
			{/* 2 different ways of doing the same thing!! */}
			<form onSubmit={ (e) => handleSubmit(e) }>
				<div>
					<label>Name</label>
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
				<div>
					<button type="submit">Add Author</button>
				</div>
			</form>
		</div>
	)
}

export default Create;
