import React, {useState, useEffect} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Table from 'react-bootstrap/Table'

function Ingredients() {

    const [ingredients, setIngredients] = useState(null);
    const [ingredient, setIngredient] = useState(null);

    const [name, setName] = useState('');
    const [group, setGroup] = useState('');

    const [initialIngredients, setInitialIngredients] = useState(true);
    const [showIngredients, setShowIngredients] = useState(false);
    const [showIngredientByIdFormulary, setShowIngredientByIdFormulary] = useState(false);
    const [showCreateFormulary, setShowCreateFormulary] = useState(false);
    const [showEditFormulary, setShowEditFormulary] = useState(false);

    const [id, setId] = useState(null);

    useEffect(() => {
        GET_INGREDIENTS()
      },[]);

    const GET_INGREDIENTS = () => {
        fetch('http://localhost:4000/ingredients')
        .then(response => {
        let data = response.json()
        return data
        })
        .then((data) => {
            setIngredients(data)
            console.log(data)
        })
        .catch(() => console.log('Error')); 
    }

    const GET_INGREDIENTS_BY_ID = () => {
        fetch(`http://localhost:4000/ingredients/${id}`)
        .then(response => {
        let ingredient = response.json()
        return ingredient
        })
        .then((data) => {
            setIngredient(data)
        })
        .catch(() => console.log('Ingredient not found')); 
    } 

    const POST_INGREDIENT = () => {
        fetch('http://localhost:4000/ingredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, group}) ,
            })
            .then(response => {
                return response.text();
            })
            .then(data => {
                console.log(data);
            })
            .catch(() => console.log('Error'));
    }

    const PUT_INGREDIENTS = () => {
        fetch(`http://localhost:4000/ingredients/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name:name, group }) ,
            })
            .then(response => {
                return response.text();
            })
            .then(data => {
                console.log(data);
            })
            .catch(() => console.log('Error'));
    }

    const DELETE_By_ID = () => {
        fetch(`http://localhost:4000/ingredients/${id}`, 
        { method: 'DELETE' })
        .then(response => {
            return response.text();
        });
    }

    const handleGetClick = () => {
        GET_INGREDIENTS();
        setShowIngredients(true);
        setShowCreateFormulary(false);
        setShowIngredientByIdFormulary(false);
        setShowEditFormulary(false);
        setInitialIngredients(false)
      }
    
      const handleCreateClick = () => {
        setShowCreateFormulary(true);
        setShowIngredients(false);
        setShowIngredientByIdFormulary(false);
        setShowEditFormulary(false);
        setInitialIngredients(false)
      }
    
      const handleUpdateClick = () => {
        setShowIngredientByIdFormulary(true);
        setShowIngredients(false);
        setShowCreateFormulary(false);
        setShowEditFormulary(false);
        setInitialIngredients(false)
      }
    
      const handlePostClick = () => {
        POST_INGREDIENT();
        setName(null);
        setGroup(null);
      }
    
      const handleFindById = () => {
        GET_INGREDIENTS_BY_ID();
      }
    
      const handleEditClick = () => {
        setShowIngredientByIdFormulary(false)
        setShowEditFormulary(true)
      }
    
      const handleUpdateProduct = () => {
        PUT_INGREDIENTS();
        setName(null);
        setGroup(null);
        alert('Ingredient edited')
        window.location.reload();
        setIngredient(null)
      }
    
      const handleDelete = () => {
        DELETE_By_ID();
        alert('Product deleted')
        window.location.reload();
      }

    return (
        <div>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/panel">Recetas App</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link onClick={handleGetClick}>View all ingredients</Nav.Link>
            <Nav.Link onClick={handleCreateClick}>Create new ingredient</Nav.Link>
            <Nav.Link onClick={handleUpdateClick}>Update ingredient</Nav.Link>
            </Nav>
            </Container>
        </Navbar>

        {initialIngredients?
            <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Group</th>
                    </tr>
                </thead>
                <tbody>
                {ingredients && ingredients.length?ingredients.map(e => {
                    return (
                        <tr>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.group}</td>
                        </tr>
                )}):
                null
                }
                </tbody>
            </Table>
            </div> 
            :null
        }

        {showCreateFormulary? 
            <div style={{width:'80%', marginLeft:'10%', marginTop:'3em', borderStyle:'solid', borderWidth:'1px' ,borderColor:'black', padding:'2em', borderRadius:'20px', textAlign:'left'}}>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Group</Form.Label>
                    <Form.Select onChange={(e) => setGroup(e.target.value)} defaultValue="Choose...">
                        <option>Choose...</option>
                        <option value='Granos y cerales'>Granos y cereales</option>
                        <option value='Vegetales'>Vegetales</option>
                        <option value='Fruta'>Fruta</option>
                        <option value='Carne, aves de corral, pescado, frijoles secos, huevos, y nueces'>Carne, aves de corral, pescado, frijoles secos, huevos, y nueces</option>
                        <option value='Productos lácteos'>Productos lácteos</option>
                        <option value='Sales minerales'>Sales minerales</option>
                        <option value='Especias'>Especias</option>
                        <option value='Aceites y vinagres'>Aceites y vinagres</option>
                        <option value='Bebidas'>Bebidas</option>
                        <option value='Otros'>Otros</option>
                    </Form.Select>
                    </Form.Group>
                </Row>

                <Button onClick={handlePostClick} variant="primary" type="submit">
                    Create
                </Button>
            </Form>
            </div>
            :null
        }

        {showIngredients?
            <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Group</th>
                    </tr>
                </thead>
                <tbody>
                {ingredients && ingredients.length?ingredients.map(e => {
                    return (
                        <tr>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.group}</td>
                        </tr>
                )}):
                null
                }
                </tbody>
            </Table>
            </div> 
            :null
        }

        {showIngredientByIdFormulary? 
        <div style={{paddingBottom:'5em'}}>
            <Form style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'3em', marginBottom:'3em'}}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" onChange={(e) => setId(e.target.value)} placeholder="Enter Ingredient's id" />
                </Form.Group>
            
                <Button variant="primary" style={{height:'2.35em'}} onClick={handleFindById}>
                    Search
                </Button>
            </Form>

            {ingredient?
                <div style={{textAlign:'-webkit-center'}}>
                <Card style={{ width: '18rem', borderRadius:'15px' }}>
                    <Card.Body>
                        <Card.Title style={{textTransform:'capitalize'}}>{ingredient.name}</Card.Title>
                        <Card.Text>
                        {ingredient.group}.
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Button variant="outline-primary" style={{marginRight:'2em'}} onClick={handleEditClick}>Edit</Button>
                        <Button variant='outline-danger' onClick={handleDelete}>Delete</Button>
                    </Card.Body>
                </Card>
                </div>
                :null
            }
        </div>
        :null
        }

        {showEditFormulary? 

        <div style={{width:'80%', marginLeft:'10%', marginTop:'3em', borderStyle:'solid', borderWidth:'1px' ,borderColor:'black', padding:'2em', borderRadius:'20px', textAlign:'left'}}>
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder={ingredient.name} value={name}/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Category</Form.Label>
                <Form.Select onChange={(e) => setGroup(e.target.value)} defaultValue="Choose...">
                    <option>Choose...</option>
                    <option value='Granos y cerales'>Granos y cereales</option>
                    <option value='Vegetales'>Vegetales</option>
                    <option value='Fruta'>Fruta</option>
                    <option value='Carne, aves de corral, pescado, frijoles secos, huevos, y nueces'>Carne, aves de corral, pescado, frijoles secos, huevos, y nueces</option>
                    <option value='Productos lácteos'>Productos lácteos</option>
                    <option value='Sales minerales'>Sales minerales</option>
                    <option value='Especias'>Especias</option>
                    <option value='Aceites y vinagres'>Aceites y vinagres</option>
                    <option value='Bebidas'>Bebidas</option>
                    <option value='Otros'>Otros</option>
                </Form.Select>
                </Form.Group>
            </Row>

            <Button onClick={handleUpdateProduct} variant="primary" type="submit">
                Edit
            </Button>
        </Form>
        </div>
        :
        null
        }
            
        </div>
    )
}

export default Ingredients
