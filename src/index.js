import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const inState = {
    "jobTitle" : "",
    "employmentPeriodPermanent": false,
    "currentlyEmployed": false,
    "startDate": null,
    "endDate": null,
    "employer": "",
    "phoneNumber": null,
    "email": ""
};

ReactDOM.render(<App initialState={inState}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
