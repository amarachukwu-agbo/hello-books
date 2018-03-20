import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'materialize-css';
import '../public/style/style.scss';
import store, { history } from './store';
import App from '../components/App';
import '../helpers/materialize/index';

render(
    <Provider store = { store }>
        <App history = { history }/>
    </Provider>,
    document.getElementById('root'),
);
