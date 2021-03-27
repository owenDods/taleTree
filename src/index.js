// import React from 'react';
// import { render } from 'react-dom';

import './styles/index.scss';

// import App from './components/app/App';

// render(<App />, document.getElementById('root'));

import join from 'lodash/fp/join';

function component() {

	const element = document.createElement('div');

	element.innerHTML = join(' ', [ 'Hello', 'webpack' ]);

	return element;

}

document.body.appendChild(component());
