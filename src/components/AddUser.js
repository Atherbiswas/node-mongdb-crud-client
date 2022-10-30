import React, { useState } from 'react';

const AddUser = () => {
    const [user, setUser] = useState({});

    const handleUser = (event) => {
        event.preventDefault();
        console.log(user);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
           if(data.acknowledged){
            alert('User added successfully');
            event.target.reset();
           }
        })
    }
    
    const handleBlur = event => {
        const value = event.target.value;
        const field = event.target.name;
        const newUser = {...user};
        newUser[field] = value;
        setUser(newUser);

    }
    return (
        <div>
            <h2>add user page</h2>
            <form onSubmit={handleUser}>
                <input onBlur={handleBlur} type="text" name='name' placeholder='name' required/>
                <br />
                <input onBlur={handleBlur} type="text" name='address' placeholder='address' required/>
                <br />
                <input onBlur={handleBlur} type="email" name="email" id="" placeholder='email'required/>
                <br />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;