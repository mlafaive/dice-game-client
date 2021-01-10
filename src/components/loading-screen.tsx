import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingScreen() {
  return (
    <Container>
      <Row className='min-vh-100 align-items-center'>
        <Col>
          <Row className='justify-content-center'>
            <Row>
              <Spinner animation='border' role='status'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}