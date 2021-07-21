import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';


const AllAuthors = (props) => {
    const { id } = props;
	const [ author, setAuthors ] = useState([]);

    useEffect(() => {
		axios.get("http://localhost:8000/api/authors")
			.then((res) => {
				console.log(res);
				setAuthors(res.data);   // this is the same as the body that is returned in postman
			})
			.catch((err) => {
				console.log(err);
			});

		// always remember the dependencies array - empty is fine!
	}, []);

    const handleDelete = authorID => {
        axios
            .delete(`http://localhost:8000/api/authors/${authorID}`)
            .then(res => {
                const filteredAuthors = author.filter(author => {
                    return author._id !== authorID
                })
                setAuthors(filteredAuthors)
            })
            .catch(err => {
                console.error(err)
            })
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     navigate("/authors/" + author._id);
    // }

	// remove the author object from our array AFTER it is
	//		successfully deleted from the backend server / mongo DB
	const updateAfterDelete = (deletedAuthorId) => {
		let filteredAuthorArray = author.filter((authorObj) => {
			// if we return TRUE, then that object becomes a part of the new array
			// if we return FALSE, then that object is skipped in the new array
			return authorObj._id !== deletedAuthorId;
		});

		setAuthors(filteredAuthorArray);
	}

	return (
		<div>
            <Link to="/authors/new">Add an Author</Link>
			<table>
                <thead>
                    <th>Author</th>
                    <th>Available Actions</th>
                </thead>
                {author.map((author, i) => {
                    return (
                        <tbody key={i} className="authorlist__body">
                            <tr>
                                <td>{author.name}</td>
                                <td>
                                <button onClick={(e) => navigate(`/authors/${id}/edit`)} className="editBtn">Edit</button>
                                    <button
                                        className="authorlist__delete"
                                        onClick={e => handleDelete(author._id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    )
                })}
			</table>
		</div>
	)
}

export default AllAuthors;
