import "create-react-class";
import React, { useReducer, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import IntlTelInput from 'react-bootstrap-intl-tel-input';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function employmentStatusReducer(state, action) {
  console.log("sa", state, action);
  switch (action.type) {
    case 'CHANGE_JOB_TITLE':
      return { ...state, jobTitle: action.payLoad };
    case 'CHANGE_CURRENTLY_EMPLOYED':
      return { ...state, currentlyEmployed: action.payLoad }
    case 'CHANGE_EMPLOYMENT_PERIOD':
      return { ...state, employmentPeriodPermanent: action.payLoad };
    case 'CHANGE_START_DATE':
      return { ...state, startDate: action.payLoad };
    case 'CHANGE_END_DATE':
      return state.employmentPeriodPermanent ? { ...state, endDate: action.payLoad } : null;
    case 'CHANGE_EMPLOYER':
      return { ...state, employer: action.payLoad };
    case 'CHANGE_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payLoad };
    case 'CHANGE_EMAIL':
      return { ...state, email: action.payLoad };
    default:
      throw new Error();
  }
}

function App(props) {

  const [state, dispatch] = useReducer(employmentStatusReducer, props.initialState);

  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    console.log("valid state: ", state)
    console.log("valid event: ", event)
    const form = event.currentTarget;
    console.log("form: ", form)
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  console.log("state: ", state);
  return (
    <div className={"container"}>
      <div className="py-5">
        <img className="d-block mx-autoe mb-4" src="https://global-uploads.webflow.com/5d2cef25b4a76dcc2236ace0/5d2e058599a69033b540bbfb_side-by-side-blue.svg" alt="Acre Logo" />
        <h2>Acre Technical Exercise</h2>
      </div>
      <div className={"row"}>
        <div className={"col-md-8 order-md-1"}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="validJobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  required
                  value={state.jobTitle}
                  size="lg"
                  type="text"
                  onChange={(event) => dispatch({ type: "CHANGE_JOB_TITLE", payLoad: event.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  size="lg"
                  type="checkbox"
                  label="Currently Employed"
                  value={state.currentlyEmployed}
                  // checked={state.currentlyEmployed ? "checked" : null}
                  onChange={() => dispatch({ type: "CHANGE_CURRENTLY_EMPLOYED", payLoad: !state.currentlyEmployed })} />
              </Form.Group>
              <fieldset>
                <Form.Group controlId="validEmploymentPeriod">
                  <Form.Label>Employment period</Form.Label>
                  <Form.Check
                    required
                    name={"employment-period-radios"}
                    label={"Permanent"}
                    size="lg"
                    type="radio"
                    onChange={() => dispatch({ type: "CHANGE_EMPLOYMENT_PERIOD", payLoad: false })} />
                  <Form.Check
                    required
                    name={"employment-period-radios"}
                    label={"Fixed term"}
                    size="lg"
                    type="radio"
                    onChange={() => dispatch({ type: "CHANGE_EMPLOYMENT_PERIOD", payLoad: true })} />
                </Form.Group>
              </fieldset>
              <Form.Group >

                <Form.Label>Start Date</Form.Label>
                <DatePicker

                  disabled={state.employmentPeriodPermanent === null ? true : null}
                  selected={(state.startDate === null || state.startDate === "") ? new Date() : state.startDate}
                  onChange={date => dispatch({ type: "CHANGE_START_DATE", payLoad: date })}
                  showYearDropdown
                  dateFormatCalendar="MMMM"
                  yearDropdownItemNumber={15}
                  scrollableYearDropdown />

                <div>
                  {(state.employmentPeriodPermanent === null || state.employmentPeriodPermanent === false) ? null : <Form.Label>End Date</Form.Label>}
                  {(state.employmentPeriodPermanent === null || state.employmentPeriodPermanent === false) ? null : <DatePicker

                    disabled={(state.employmentPeriodPermanent === null || state.employmentPeriodPermanent === false) ? true : null}
                    selected={(state.endDate === null || state.endDate === "") ? new Date() : state.endDate}
                    onChange={date => dispatch({ type: "CHANGE_END_DATE", payLoad: date })}
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown />}
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Employer name</Form.Label>
                <Form.Control
                  required
                  value={state.employer}
                  size="lg"
                  type="text"
                  onChange={(event) => dispatch({ type: "CHANGE_EMPLOYER", payLoad: event.target.value })} />
              </Form.Group>
              <Form.Group noValidate controlId="validPhoneNumber">
                <Form.Label noValidate>Phone Number</Form.Label>
                  <IntlTelInput
                    noValidate
                    preferredCountries={['GB']}
                    defaultCountry={'GB'}
                    defaultValue={'your number here'}
                    value={state.phoneNumber}
                    onChange={(event) => dispatch({ type: "CHANGE_PHONE_NUMBER", payLoad: event })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={state.email}
                  onChange={event => dispatch({ type: "CHANGE_EMAIL", payLoad: event.target.value })} />
              </Form.Group>
              
            <Button type="submit">Submit form</Button>

          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
