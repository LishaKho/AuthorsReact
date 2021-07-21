import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';

const Details = (props) => {
	const { id } = props;
	const [ author, setAuthor ] = useState({});

	useEffect(() => {
		axios.get("http://localhost:8000/api/authors/" + id)
			.then((res) => {
				console.log(res);
				setAuthor(res.data);
			})
			.catch((err) => {
				console.log(err)
			});
	}, []);


	return (
		<div>
			<h2>Author Details</h2>
			<table>
				<tbody>
					<tr>
						<td>Author Name:</td>
						<td>{author.name}</td>
					</tr>
				</tbody>
			</table>
			<button onClick={(e) => navigate(`/authors/${id}/edit`)} className="editBtn">Edit</button>
		</div>
	)
}

export default Details;
