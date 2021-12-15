import React from 'react'
import '../styles/panel.css'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import {useState, useEffect} from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Panel() {

    const [showLogout, setShowLogout] = useState(false)

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0(); 

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/panel">Recetas App</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/products">Products</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
                </Nav>
                <Nav style={{display:'flex', flexDirection:'column'}}>
                    <button style={{backgroundColor:'transparent', borderStyle:'none'}} onClick={() => setShowLogout(!showLogout)}>
                        <ArrowDropDownIcon style={{fill: "white"}}/>
                    </button>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>

            {showLogout?
                <Button style={{marginTop:'.5em'}} variant='outline-danger' className='buttonLogout' href='/'>
                    Logout
                </Button>
                :
                null
            }

            <Container style={{marginTop:'3em', paddingBottom:'5em'}}>
            <Row>
                <Col>
                    <Card style={{ width: '18rem', borderRadius: '20px', marginTop:'2em' }}>
                        <Card.Body>
                            <Card.Title style={{fontSize:'2rem'}}>Products</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Información de productos</Card.Subtitle>
                            <Card.Text>
                            Información de productos para administradores, agrega, edita y elimina productos.
                            </Card.Text>
                            <Button variant="outline-primary" href='/products'>Entrar</Button>{' '}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem', borderRadius: '20px', marginTop:'2em'   }}>
                        <Card.Body>
                            <Card.Title style={{fontSize:'2rem'}}>Usuarios</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Información de usuarios</Card.Subtitle>
                            <Card.Text>
                            Información de usuarios para administradores, agrega, edita y elimina usuarios.
                            </Card.Text>
                            <Button variant="outline-primary" href='/users'>Entrar</Button>{' '}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem', borderRadius: '20px', marginTop:'2em'   }}>
                        <Card.Body>
                            <Card.Title style={{fontSize:'2rem'}}>Ordenes</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Información de ordenes</Card.Subtitle>
                            <Card.Text>
                            Información de ordenes para administradores, agrega, edita y elimina ordenes.
                            </Card.Text>
                            <Button variant="outline-primary" href='/orders'>Entrar</Button>{' '}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem', borderRadius: '20px', marginTop:'2em'   }}>
                        <Card.Body>
                            <Card.Title style={{fontSize:'2rem'}}>Ingredients</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Manejo de ingredientes</Card.Subtitle>
                            <Card.Text>
                            Información de ingredientes para administradores, agrega, edita y elimina ingredientes.
                            </Card.Text>
                            <Button variant="outline-primary" href='/ingredients'>Entrar</Button>{' '}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Container>

        </div>
    )
}

export default Panel
