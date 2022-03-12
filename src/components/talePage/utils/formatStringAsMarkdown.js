import React from 'react';

import map from 'lodash/fp/map';

export default (text = '') => (
	map.convert({ cap: false })((textParagraph, i) => (<p key={i}>{textParagraph}</p>), text.split('//'))
);
