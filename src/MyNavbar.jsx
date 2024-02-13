import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#" className="me-auto">
          <img
            src="/at.svg"
            width="30"
            height="30"
            className="d-inline-block align-top rounded-circle"
            alt="React Bootstrap logo"
          />
          {' '}
          Anmol Trading
        </Navbar.Brand>
        <Nav className="flex-fill d-flex justify-content-center">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#services">Services</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
