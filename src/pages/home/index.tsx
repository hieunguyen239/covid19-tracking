import React, { useState, useEffect } from 'react';
import CaseModel from '../../models/case.model';
import TrackerService from '../../services/tracker.service';
import TopSummary from '../../components/TopSummary';
import TableSummary from '../../components/TableSummary';
import { formatDate } from '../../utils/utils';
import './home.scss';
import { InputGroup, FormControl, Spinner } from 'react-bootstrap';

interface iState {
  cases: CaseModel[];
  filterCases: CaseModel[];
  global: CaseModel;
  loaded: boolean;
}

export default function () {
  const [state, setState] = useState<iState>(
    {
      cases: [],
      filterCases: [],
      global: new CaseModel(),
      loaded: false,
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      const ts = new TrackerService();
      const resp = await ts.getSummary();
      const { data } = resp;
      const countries = data.Countries;
      setState({
        cases: countries,
        filterCases: countries,
        global: data.Global,
        loaded: true
      });
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase().trim();
    const { cases } = state;
    let newState = Object.assign({}, state);
    if (keyword) {
      newState.filterCases = cases.filter(item => item.Country.toLowerCase().search(keyword) !== -1);
    } else {
      newState.filterCases = cases;
    }
    setState(newState);
  }

  return (
    <div className={`dashboard ${!state.loaded ? 'loading' : ''}`}>
      {
        state.loaded ? (
          <>
            <TopSummary scopeName="Global" item={state.global} date={state.cases.length ? formatDate(state.cases[0].Date) : formatDate(new Date().toString())} />
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Enter Country Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl className="country-filter" onChange={handleChange} />
            </InputGroup>
            {
              state.filterCases?.length ? (
                  <TableSummary cases={state.filterCases}/>
                ) : (
                  <p>No data</p>
                )
            }
          </>
        ) : <Spinner animation="border" className="spinner"/>
      }
    </div>
  )
}