import "create-react-class";
import React, { useReducer, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function employmentStatusReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_JOB_TITLE':
      return { ...state, jobTitle: action.payLoad };
    case 'CHANGE_CURRENTLY_EMPLOYED':
      return (action.payLoad ? { ...state, currentlyEmployed: action.payLoad } : 
        {...state, currentlyEmployed: action.payLoad, employmentPeriodPermanent: false});
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
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {      
      event.preventDefault();
      event.stopPropagation();
      if (isValidPhoneNumber(state.phoneNumber)) console.log("Form is validated and can submit this state: ", state)
    }

    setValidated(true);
    
  };

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
                onChange={() => dispatch({ type: "CHANGE_CURRENTLY_EMPLOYED", payLoad: !state.currentlyEmployed })} />
            </Form.Group>
                <Form.Group controlId="validEmploymentPeriod">
                  <Form.Label>{state.currentlyEmployed ? "Employment period" : "Previous employment period"}</Form.Label>
                  <Form.Check
                    required
                    name={"employment-period-radios"}
                    label={"Permanent"}
                    size="lg"
                    type="radio"
                    disabled={!state.currentlyEmployed}
                    checked={state.employmentPeriodPermanent ? "checked" : null}
                    onChange={() => dispatch({ type: "CHANGE_EMPLOYMENT_PERIOD", payLoad: true })} />
                 <Form.Check

                    required
                    name={"employment-period-radios"}
                    label={"Fixed term"}
                    size="lg"
                    type="radio"
                    checked={!state.employmentPeriodPermanent ? "checked" : null}
                    onChange={() => dispatch({ type: "CHANGE_EMPLOYMENT_PERIOD", payLoad: false })} />
                </Form.Group>
              <Form.Group >
                <Form.Label>Start Date</Form.Label>
                <DatePicker
                  selected={(state.startDate === null || state.startDate === "") ? new Date() : state.startDate}
                  onChange={date => dispatch({ type: "CHANGE_START_DATE", payLoad: date })}
                  showYearDropdown
                  dateFormatCalendar="MMMM"
                  yearDropdownItemNumber={15}
                  scrollableYearDropdown />
                <div>
                  {(state.employmentPeriodPermanent) ? null : <Form.Label>End Date</Form.Label>}
                  {(state.employmentPeriodPermanent) ? null : 
                  <DatePicker
                    selected={(state.endDate === null || state.endDate === "") ? new Date() : state.endDate}
                    onChange={date => dispatch({ type: "CHANGE_END_DATE", payLoad: date })}
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown />}
                </div>
              </Form.Group>

            <Form.Group>
              <Form.Label>{state.currentlyEmployed ? "Employer name" : "Most recent employer"}</Form.Label>
              <Form.Control
                required
                value={state.employer}
                size="lg"
                type="text"
                onChange={(event) => dispatch({ type: "CHANGE_EMPLOYER", payLoad: event.target.value })} />
            </Form.Group>
            <Form.Group controlId="validPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <PhoneInput
                error={!isValidPhoneNumber(state.phoneNumber) ? "Invalid Number" : ""}
                indicateInvalid={!isValidPhoneNumber(state.phoneNumber)}
                placeholder="Enter phone number"
                county={'UK'}
                value={state.phoneNumber || ""}
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
