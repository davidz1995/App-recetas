import React from 'react';
import { useState, useEffect } from 'react';
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

function Products() {

    const [products, setProducts] = useState(null);
    const [product, setProduct] = useState(null);

    const [initialProducts, setInitialProducts] = useState(true);
    const [showProducts, setShowProducts] = useState(false);
    const [showProductByIdFormulary, setshowProductByIdFormulary] = useState(false);
    const [showCreateFormulary, setShowCreateFormulary] = useState(false);
    const [showEditFormulary, setShowEditFormulary] = useState(false);

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const [id, setId] = useState(null);

    const [ingredients, setIngredients] = useState(null)
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [selected, setSelected] = useState([])

    const [value, setValue] = useState('')

    useEffect(() => {
        GET_PRODUCTS()
      },[]);

    const GET_PRODUCTS = () => {
    fetch('http://localhost:4000/products')
    .then(response => {
    let data = response.json()
    return data
    })
    .then((data) => {
        setProducts(data)
        //console.log(data)
    })
    .catch(() => console.log('Error')); 
    }   

    const GET_PRODUCTS_BY_ID = () => {
        fetch(`http://localhost:4000/products/${id}`)
        .then(response => {
        let product = response.json()
        return product
        })
        .then((data) => {
            setProduct(data)
        })
        .catch(() => console.log('Product not found')); 
        } 

    const POST_PRODUCTS = () => {
        fetch('http://localhost:4000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, image, countInStock, description, price, category }) ,
            })
            .then(response => {
                return response.text();
            })
            .then(data => {
                console.log(data);
            })
            .catch(() => console.log('Error'));
    }

    const PUT_PRODUCTS = () => {
        fetch(`http://localhost:4000/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name:name, image, countInStock, description, price, category }) ,
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
        fetch(`http://localhost:4000/products/${id}`, 
        { method: 'DELETE' })
        .then(response => {
            return response.text();
        });
    }

    const GET_INGREDIENTS = () => {
        fetch('http://localhost:4000/ingredients')
        .then(response => {
        let data = response.json()
        return data
        })
        .then((data) => {
            setIngredients(data)
            //console.log(data)
        })
        .catch(() => console.log('Error')); 
        }   

  const handleGetClick = () => {
    GET_PRODUCTS();
    setShowProducts(true);
    setShowCreateFormulary(false);
    setshowProductByIdFormulary(false);
    setShowEditFormulary(false);
    setInitialProducts(false)
  }

  const handleCreateClick = () => {
    GET_INGREDIENTS()
    setShowCreateFormulary(true);
    setShowProducts(false);
    setshowProductByIdFormulary(false);
    setShowEditFormulary(false);
    setInitialProducts(false);
  }

  const handleUpdateClick = () => {
    GET_INGREDIENTS()
    setshowProductByIdFormulary(true);
    setShowProducts(false);
    setShowCreateFormulary(false);
    setShowEditFormulary(false);
    setInitialProducts(false)
  }

  const handlePostClick = () => {
    POST_PRODUCTS();
    setName(null);
    setImage(null);
    setCountInStock(null);
    setDescription(null);
    setPrice(null);
    setCategory(null);
  }

  const handleFindById = () => {
    GET_PRODUCTS_BY_ID();
  }

  const handleEditClick = () => {
    setshowProductByIdFormulary(false)
    setShowEditFormulary(true)
  }

  const handleUpdateProduct = () => {
    PUT_PRODUCTS();
    setName(null);
    setImage(null);
    setCountInStock(null);
    setDescription(null);
    setPrice(null);
    setCategory(null);
    alert('Product edited')
    window.location.reload();
    setProduct(null)
  }

  const handleDelete = () => {
    DELETE_By_ID();
    alert('Product deleted')
    window.location.reload();
  }

  const handleSelectIngredient = (e) => {
    setValue(e.target.value)
    if(!selectedIngredients.some((el) => e.target.value === el)) selectedIngredients.push(e.target.value)
    setSelected(selectedIngredients)
    console.log(selected)
  }

    const handleDeleteIngredient = (e) => {
        setValue(e.target.value)
        selected.splice(e.target.value, 1)
    }

    return (
        <div>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/panel">Recetas App</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link onClick={handleGetClick}>View all products</Nav.Link>
            <Nav.Link onClick={handleCreateClick}>Create new product</Nav.Link>
            <Nav.Link onClick={handleUpdateClick}>Update product</Nav.Link>
            </Nav>
            </Container>
        </Navbar>

        {initialProducts?
            <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                {products && products.length?products.map((e, index) => {
                    return (
                        <tr key={index}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.description}</td>
                            <td>{e.countInStock}</td>
                            <td>{e.price}</td>
                            <td>{e.category}</td>
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

                    <Form.Group as={Col} controlId="formGridPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e) => setDescription(e.target.value)} style={{height:'5em'}} placeholder="Write a description" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Select onChange={handleSelectIngredient} value={value}>
                        <option value=''>Choose...</option>
                        {ingredients && ingredients.length?
                        ingredients.map((e, index) => {
                            return(
                                <option key={index} value={e.name}>{e.name}</option>
                            )
                        })
                        :null}
                    </Form.Select>
                </Form.Group>

                {selected.length?
                    <Form.Group as={Col}>
                        <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', marginTop:'1em'}}>
                            {selected.map((e, index) => {return(
                                <Button onClick={handleDeleteIngredient} value={index} variant="outline-secondary" key={index} style={{
                                    marginRight:'1em',
                                    marginBottom:'1em'
                                }}>{e}</Button>
                            )}
                            )}
                        </div>
                    </Form.Group>:null
                }

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formStock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control onChange={(e) => setCountInStock(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCategory">
                    <Form.Label>Image</Form.Label>
                    <Form.Control onChange={(e) => setImage(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Category</Form.Label>
                    <Form.Select onChange={(e) => setCategory(e.target.value)} defaultValue="Choose...">
                        <option>Choose...</option>
                        <option value='617c5330eaed4c553771d421'>Comida</option>
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
            
        {showProducts?
            <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                {products && products.length?products.map(e => {
                    return (
                        <tr>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.description}</td>
                            <td>{e.countInStock}</td>
                            <td>{e.price}</td>
                            <td>{e.category}</td>
                        </tr>
                )}):
                null
                }
                </tbody>
            </Table>
            </div>
            :null
        }

        {showProductByIdFormulary? 
        <div style={{paddingBottom:'5em'}}>
            <Form style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'3em', marginBottom:'3em'}}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" onChange={(e) => setId(e.target.value)} placeholder="Enter Product's id" />
                </Form.Group>
            
                <Button variant="primary" style={{height:'2.35em'}} onClick={handleFindById}>
                    Search
                </Button>
            </Form>

            {product?
                <div style={{textAlign:'-webkit-center'}}>
                <Card style={{ width: '18rem', borderRadius:'15px' }}>
                    <Card.Img variant="top" style={{backgroundColor:'black',minHeight:'10em', maxHeight:'10em', minWidth:'17.9em', maxWidth:'17.9em', color:'white', borderTopLeftRadius:'15px', borderTopRightRadius:'15px'}} src={product.image} alt='Imagen del producto'/>
                    <Card.Body>
                        <Card.Title style={{textTransform:'capitalize'}}>{product.name}</Card.Title>
                        <Card.Text>
                        {product.description}.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem style={{textAlign:'left'}}>Price: {product.price}</ListGroupItem>
                        <ListGroupItem style={{textAlign:'left'}}>Stock: {product.countInStock}</ListGroupItem>
                        <ListGroupItem style={{textAlign:'left'}}>Id: {product.id}</ListGroupItem>
                        <ListGroupItem style={{textAlign:'left'}}>Category: {product.category.name}</ListGroupItem>
                    </ListGroup>
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
                    <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder={product.name} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" onChange={(e) => setPrice(e.target.value)} placeholder={product.price} />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e) => setDescription(e.target.value)} style={{height:'5em'}} placeholder={product.description} />
                </Form.Group>

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formStock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control onChange={(e) => setCountInStock(e.target.value)} placeholder={product.countInStock}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCategory">
                    <Form.Label>Image</Form.Label>
                    <Form.Control onChange={(e) => setImage(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Category</Form.Label>
                    <Form.Select onChange={(e) => setCategory(e.target.value)} defaultValue="Choose...">
                        <option>Choose...</option>
                        <option value='617c5330eaed4c553771d421'>617c5330eaed4c553771d421</option>
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

export default Products
