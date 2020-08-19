import React from 'react';
import { Card } from 'react-bootstrap';
import './card.scss';

interface iProps {
  header: string;
  className: 'card-red' | 'card-green';
  caseNumber: number;
}

export default function({header, className, caseNumber} : iProps) {
  return(
    <Card className={'case-card ' + className}>
      <Card.Header as="h5">{header}</Card.Header>
      <Card.Body>
        <Card.Text className="case-number">
          {caseNumber.toLocaleString('en')}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}