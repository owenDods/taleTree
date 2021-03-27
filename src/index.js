// import React from 'react';
// import { render } from 'react-dom';

import './styles/index.scss';

// import App from './components/app/App';

// render(<App />, document.getElementById('root'));

import join from 'lodash/fp/join';
import Icon from './img/triangle.svg';

function component() {

	const element = document.createElement('div');

	element.innerHTML = join(' ', [ 'Hello', 'webpack' ]);

	const myIcon = new Image();
	myIcon.src = Icon;

	element.appendChild(myIcon);

	return element;

}

document.body.appendChild(component());
