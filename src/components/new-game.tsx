import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function NewGame() {
  const [gameName, setGameName] = useState('');
  const [playerName, setPlayerName] = useState('');
  return (
    <Container>
      <Row className='min-vh-100 align-items-center'>
        <Col>
          <Row className='justify-content-center'>
            <h1>Create new game</h1>
          </Row>
          <Row className='justify-content-center text-center'>
            <Form>
              <Form.Group controlId='gameName' className='text-left'>
                <Form.Label>Game name</Form.Label>
                <Form.Control value={gameName} onChange={e => setGameName(e.target.value)}/>
              </Form.Group>

              <Form.Group controlId='playerName' className='text-left'>
                <Form.Label>Player name</Form.Label>
                <Form.Control value={playerName} onChange={e => setPlayerName(e.target.value)}/>
              </Form.Group>

              <Button variant="primary" onClick={() => console.log(`creating game ${gameName} with player ${playerName}`)}>
                Create game
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}