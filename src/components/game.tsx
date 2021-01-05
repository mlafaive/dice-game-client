import React from 'react';
import { useParams } from 'react-router-dom';

export default function Game() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>game: {id}</div>
  );
}