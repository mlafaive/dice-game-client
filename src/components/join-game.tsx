import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useGameContext } from './game-provider';

export default function JoinGame() {
  const [playerName, setPlayerName] = useState('');
  const [isCreatingPlayer, setIsCreatingPlayer] = useState(false);
  const [errorText, setErrorText] = useState('');

  const { createPlayer } = useGameContext();

  async function createPlayerHandler() {
    setIsCreatingPlayer(true);

    try {
      await createPlayer(playerName);
    } catch (error) {
      console.error(error);
      setErrorText('Could not create player. Please try again later');
      setIsCreatingPlayer(false);
    }
  }

  return (
    <Container>
      <Row className='min-vh-100 align-items-center'>
        <Col>
          <Row className='justify-content-center'>
            <h1>Create new player</h1>
          </Row>
          <Row className='justify-content-center text-center'>
            <Form>
              <Form.Group controlId='playerName' className='text-left'>
                <Form.Label>Player name</Form.Label>
                <Form.Control
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  disabled={isCreatingPlayer}
                />
              </Form.Group>

              <Form.Group>
                <Button variant='primary' onClick={createPlayerHandler}>
                  {isCreatingPlayer ?
                    <>
                      <Spinner
                        as='span'
                        animation='border'
                        role='status'
                        aria-hidden='true'
                      />
                      <span className='sr-only'>Loading...</span>
                    </>
                    :
                    'Create player'
                  }
                </Button>
                <Form.Control.Feedback type='invalid'>
                  {errorText}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}