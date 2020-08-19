import React, { useEffect, useState } from 'react';
import CountryModel from '../../models/country-detail.model';
import TrackerService from '../../services/tracker.service';
import { Tabs, Tab, Spinner, Row, Col, Breadcrumb } from 'react-bootstrap';
import CaseCard from '../../components/CaseCard';
import { formatDate, calcDate } from '../../utils/utils';
import './country.scss';

interface iProps {
  match: {
    params: {
      slug: string,
    }
  };
}
interface iState {
  cases: CountryModel[];
  loaded: boolean;
}

export default function(props: iProps) {
  const { slug } = props.match.params;
  const [state, setState] = useState<iState>(
    {
      cases: [],
      loaded: false,
    }
  );
  useEffect(() => {
    const fetchData = async () => {
      const ts = new TrackerService();
      const toDate = new Date();
      toDate.setHours(0, 0, 0, 0);
      const fromDate = calcDate(toDate, -8);
      const resp = await ts.getSummaryByCountry(slug, fromDate.toISOString(), toDate.toISOString());
      const { data } = resp;
      setState({
        cases: data.reverse(),
        loaded: true
      });
    };

    fetchData();
  }, [slug]);

  return (
    <div className={`country-detail ${!state.loaded ? 'loading' : ''}`}>
      {
        state.loaded ? (
          <>
            {state.cases.length && <h1>{state.cases[0].Country}</h1>}
            <Tabs className="date-tab">
              {
                state.cases.map(item => {
                  return (
                    <Tab eventKey={item.Date} title={formatDate(item.Date)} key={Math.random()}>
                      <Row>
                        <Col lg="2">
                          <CaseCard className="card-red" caseNumber={item.Confirmed} header="Confirmed"/>
                        </Col>
                        <Col lg="2">
                          <CaseCard className="card-red" caseNumber={item.Deaths} header="Deaths"/>
                        </Col>
                        <Col lg="2">
                          <CaseCard className="card-green" caseNumber={item.Recovered} header="Recovered"/>
                        </Col>
                        <Col lg="2">
                          <CaseCard className="card-green" caseNumber={item.Active} header="Active"/>
                        </Col>
                      </Row>
                    </Tab>
                  )
                })
              }
            </Tabs>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>{state.cases.length && <>{state.cases[0].Country}</>}</Breadcrumb.Item>
            </Breadcrumb>
          </>
        ) : <Spinner animation="border" className="spinner"/>
      }
    </div>
  )
}