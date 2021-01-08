import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { LinkContainer } from 'react-router-bootstrap';
import { Paths } from '../constants'; 

export default function Home() {
  return (
    <Container>
      <Row className='min-vh-100 align-items-center'>
        <Col>
          <Row className='justify-content-center text-center'>
            <h1>Welcome to Dice Game!</h1>
          </Row>
          <Row className='justify-content-center'>
            <LinkContainer to={Paths.NewGame}>
              <Button>Create new game</Button>
            </LinkContainer>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}