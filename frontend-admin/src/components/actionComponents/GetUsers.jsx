import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
//import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";

function GetUsers() {

    /* const { user, isAuthenticated, getAccessTokenSilently } = useAuth0(); */
    const [users, setUsers] = useState(null);
    const [admins, setAdmins] = useState(null);

    const [showClients, setShowClients] = useState(false);
    const [showEditFormulary, setShowEditFormulary] = useState(false);
    const [showAdmins, setShowAdmins] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [adress, setAdress] = useState('');
    const [phone, setPhone] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const [status, setStatus] = useState('');
    const [id, setId] = useState(null);
 
    const GET_USERS = () => {
        fetch('http://localhost:4000/users')
        .then(response => {
        let data = response.json()
        return data
        })
        .then((data) => {
            setUsers(data)
        })
        .catch(() => console.log('Error')); 
    }

    const GET_ADMINS = () => {
        fetch('http://localhost:4000/adminUsers')
        .then(response => {
        let data = response.json()
        return data
        })
        .then((data) => {
            setAdmins(data)
        })
        .catch(() => console.log('Error')); 
    }

    const PUT_PRODUCTS = () => {
        fetch(`http://localhost:4000/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name:name, email, adress, phone, isAdmin, status }) ,
            })
            .then(response => {
                return response.text();
            })
            .then(data => {
                console.log(data);
            })
            .catch(() => console.log('Error'));
        }

    const handleAdminClick = () => {
        GET_ADMINS();
        setShowAdmins(true);
        setShowClients(false);
    }

    const handleClientsClick = () => {
        GET_USERS();
        setShowClients(true);
        setShowAdmins(false);
    }

    /* const handleEditUserClick = () => {
        setShowEditFormulary(true);
    } */

    const handlePutUser = () => {
        PUT_PRODUCTS();
        alert('User edited')
        window.location.reload();
    }

    let selectedUser = users && users.length? users.filter(user => user.id === id) : null;

    return (

        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/panel">Recetas App</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link onClick={handleClientsClick}>Clients</Nav.Link>
                <Nav.Link onClick={handleAdminClick}>Admins</Nav.Link>
                </Nav>
                </Container>
            </Navbar>

            {showClients?
                users && users.length?
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Adress</th>
                        <th>Phone</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map(user => {
                        return (
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.adress}</td>
                                <td>{user.phone}</td>
                                <td>{user.status}</td>
                            </tr>
                    )})
                    }
                    </tbody>
                </Table>
                :null
                :null
            }

            {showEditFormulary?
                <div>
                    <input type='text' onChange={(e) => setName(e.target.value)} placeholder={selectedUser.name}/>
                    <input type='text' onChange={(e) => setEmail(e.target.value)} placeholder={selectedUser.email}/>
                    <input type='text' onChange={(e) => setAdress(e.target.value)} placeholder={selectedUser.adress}/>
                    <input type='text' onChange={(e) => setPhone(e.target.value)} placeholder={selectedUser.phone}/>
                    <input type='text' onChange={(e) => setIsAdmin(e.target.value)} placeholder={selectedUser.isAdmin}/>
                    <input type='text' onChange={(e) => setStatus(e.target.value)} placeholder={selectedUser.status}/>
                    <button onClick={handlePutUser}>Edit</button>
                    <button onClick={() => {setShowEditFormulary(false)}}>x</button>
                </div>
                :null
            }

            {showAdmins?
                admins && admins.length?
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>isAdmin</th>
                        <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {admins.map(admin => {
                        return (
                            <tr>
                                <td>{admin.id}</td>
                                <td>{admin.name}</td>
                                <td>{admin.isAdmin? 'true' : 'false'}</td>
                                <td>{admin.email}</td>
                            </tr>
                    )})
                    }
                    </tbody>
                </Table>
                :null
                :null
            }
        </div>
    )
}

export default GetUsers
