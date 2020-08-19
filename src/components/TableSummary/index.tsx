import React from 'react';
import CaseModel from '../../models/case.model';
import { Table } from 'react-bootstrap';
import './table.scss';
import { Link } from 'react-router-dom';
import { VIEW_COUNTRY_ROUTE } from '../../constants/route_names';

interface iCases {
  cases: CaseModel[];
}
export default function({ cases } : iCases) {
  return (
    <Table striped bordered hover>
      <thead className="sticky-head">
        <tr>
          <th>Country</th>
          <th>New Confirmed</th>
          <th>Total Confirmed</th>
          <th>New Deaths</th>
          <th>Total Deaths</th>
          <th>New Recovered</th>
          <th>Total Recovered</th>
        </tr>
      </thead>
      <tbody>
        {
          cases.map(item => {
            return (
              <tr key={item.CountryCode}>
                  <td><Link to={`${VIEW_COUNTRY_ROUTE}/${item.Slug}`}>{item.Country}</Link></td>
                  <td>{item.NewConfirmed.toLocaleString('en-En')}</td>
                  <td>{item.TotalConfirmed.toLocaleString('en-En')}</td>
                  <td>{item.NewDeaths.toLocaleString('en-En')}</td>
                  <td>{item.TotalDeaths.toLocaleString('en-En')}</td>
                  <td>{item.NewRecovered.toLocaleString('en-En')}</td>
                  <td>{item.TotalRecovered.toLocaleString('en-En')}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}