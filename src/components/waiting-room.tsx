import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useGameContext } from './game-provider';

export default function WaitingRoom() {
  const [isStartingGame, setIsStartingGame] = useState(false);
  const [errorText, setErrorText] = useState('');
  const { startGame, game } = useGameContext();

  async function startGameHandler() {
    setIsStartingGame(true);

    try {
      await startGame();
    } catch (error) {
      console.error(error);
      setErrorText('Could not create player. Please try again later');
      setIsStartingGame(false);
    }
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <h1>Waiting room</h1>
      </Row>
      <Row className='justify-content-center text-center'>
        <Form>
          <Form.Group>
            <Button variant='primary' onClick={startGameHandler}>
              {isStartingGame ?
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
                'Start game'
              }
            </Button>
            <Form.Control.Feedback type='invalid'>
              {errorText}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Row>
      <Row className='justify-content-center'>
        <h4>Players</h4>
      </Row>
      <Row>
        {game.players.map(({ _id, name }) => (
          <Col key={_id} className='text-center'>{name}</Col>
        ))}
      </Row>
    </Container>
  );
}