import React, { ChangeEvent, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { createGame } from '../services/api';
import { useHistory } from 'react-router-dom';

export default function NewGame() {
  const [gameName, setGameName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [errorText, setErrorText] = useState('');
  const history = useHistory();

  async function createGameHandler() {
    setIsCreatingGame(true);

    try {
      const { _id } = await createGame(gameName, playerName);
      history.push(`/games/${_id}`);
    } catch (error) {
      console.error(error);
      setIsCreatingGame(false);
      setErrorText('Could not create game. Please try again later');
    }   
  }

  function createInputHandler(
    setStateFunc: (input: string) => void
  ): (event: ChangeEvent<HTMLInputElement>) => void {
    return (event) => setStateFunc(event.target.value);
  }

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
                <Form.Control 
                  value={gameName} 
                  onChange={createInputHandler(setGameName)}
                  disabled={isCreatingGame}
                />
              </Form.Group>

              <Form.Group controlId='playerName' className='text-left'>
                <Form.Label>Player name</Form.Label>
                <Form.Control
                  value={playerName}
                  onChange={createInputHandler(setPlayerName)}
                  disabled={isCreatingGame}
                />
              </Form.Group>

              <Form.Group>
                <Button variant='primary' onClick={createGameHandler}>
                  {isCreatingGame ?
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
                    'Create game'
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