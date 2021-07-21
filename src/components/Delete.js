import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';

const Delete = (props) => {
	const { authorId, afterDelete } = props;

	const deleteHandler = () => {
		console.log("Delete id: " + authorId);

		axios.delete("http://localhost:8000/api/authors/" + authorId)
			.then((res) => {  // successful delete
				console.log("restaurant delete:")
				console.log(res.data);
				// run the specific code for after the delete is successful
				afterDelete(authorId);
			})
			.catch((err) => {
				console.log(err);
			})
	}

	return (
		<button className="deleteBtn" onClick={(e) => deleteHandler()}>
			Delete Author
		</button>
	)
}

export default Delete;
