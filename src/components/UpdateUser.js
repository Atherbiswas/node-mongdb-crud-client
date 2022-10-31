import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const UpdateUser = () => {
    const storedUser = useLoaderData();
    const [user, setUser] = useState(storedUser);

    const handleUpdateUser = (event) => {
        event.preventDefault();
        // console.log(user);
        fetch(`http://localhost:5000/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)

        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                alert('user updated')
            }
        })
    }
    
    const handleInputChange = event => {
        const value = event.target.value;
        const field = event.target.name;
        const newUser = {...user};
        newUser[field] = value;
        setUser(newUser);
    }
    return (
        <div>
            <h1>User updated:{storedUser.name}</h1>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange} type="text" defaultValue={storedUser.name} name='name' placeholder='name' required/>
                <br />
                <input onChange={handleInputChange} type="text" defaultValue={storedUser.address} name='address' placeholder='address' required/>
                <br />
                <input onChange={handleInputChange} type="email" defaultValue={storedUser.email} name="email" id="" placeholder='email'required/>
                <br />
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default UpdateUser;