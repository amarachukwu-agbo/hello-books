import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, Switch } from 'react-router-dom';
import style from '../public/style/style.scss';
import SignUpForm from '../components/SignUpForm';
import store, { history } from './store';
import App from '../components/App';


render(
    <Provider store ={ store }>
        <App history = { history }/>
    </Provider>,
    document.getElementById('root')
);