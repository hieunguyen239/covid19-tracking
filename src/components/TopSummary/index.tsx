import React from 'react';
import CaseModel from '../../models/case.model';
import {Row, Col } from 'react-bootstrap';
import CaseCard from '../../components/CaseCard';
import './summary.scss';

interface iCase {
  item: CaseModel;
  scopeName: string;
  date: string;
}

export default function(props : iCase) {
  const { scopeName, item, date } = props;
  return (
    <div className="top-summary">
      <Row>
        <Col lg="12">
        <h1 className="scope-header">{scopeName} - {date}</h1>
        </Col>
        <Col lg="2">
          <CaseCard className="card-red" caseNumber={item.NewConfirmed} header="New Confirmed"/>
        </Col>
        <Col lg="2">
          <CaseCard className="card-red" caseNumber={item.TotalConfirmed} header="Total Confirmed"/>
        </Col>
        <Col lg="2">
          <CaseCard className="card-red" caseNumber={item.NewDeaths} header="New Deaths"/>
        </Col>
        <Col lg="2">
          <CaseCard className="card-red" caseNumber={item.TotalDeaths} header="Total Deaths"/>
        </Col>
        <Col lg="2">
          <CaseCard className="card-green" caseNumber={item.NewRecovered} header="New Recovered"/>
        </Col>
        <Col lg="2">
          <CaseCard className="card-green" caseNumber={item.TotalRecovered} header="Total Recovered"/>
        </Col>
      </Row>
    </div>
  )
}