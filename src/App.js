import "create-react-class";
import React from 'react';
import Form from 'react-bootstrap/Form';
// import ControlLabel from 'react-bootstrap/lib/ControlLabel';
// import FormControl from 'react-bootstrap/lib/FormControl'; 
// import Button from 'react-bootstrap/Button';
import IntlTelInput from 'react-bootstrap-intl-tel-input';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function App() {
  var dateVal = new Date();
  return (
    <div className={"container"}>
      <div class="py-5">
        <img class="d-block mx-autoe mb-4" src="https://global-uploads.webflow.com/5d2cef25b4a76dcc2236ace0/5d2e058599a69033b540bbfb_side-by-side-blue.svg" alt="Acre Logo"/>
        <h2>Acre Technical Exercise</h2>
      </div>
      <div className={"row"}>
        <div className={"col-md-8 order-md-1"}>
          <Form>
            <Form.Group>
              <Form.Group>
                <Form.Label>Job Title</Form.Label>
                <Form.Control size="lg" type="text" />
              </Form.Group>
              <fieldset>
                <Form.Group>
                  <Form.Label>Employment period</Form.Label>
                  <Form.Check name={"employment-period-radios"} label={"Permanent"} size="lg" type="radio" />
                  <Form.Check name={"employment-period-radios"} label={"Fixed term"} size="lg" type="radio" />
                </Form.Group>
              </fieldset>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <DatePicker id="example-datepicker" value={dateVal} onChange={() => { }}></DatePicker>
                <Form.Label>End Date</Form.Label>
                <DatePicker id="example-datepicker2" value={dateVal} onChange={() => { }}>></DatePicker>
              </Form.Group>
              <Form.Group>
                <Form.Label>Employer name</Form.Label>
                <Form.Control size="lg" type="text" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <IntlTelInput
                  preferredCountries={['GB']}
                  defaultCountry={'GB'}
                  defaultValue={'+44 7911 123456'}
                  onChange={() => { }} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email"></Form.Control>
              </Form.Group>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
