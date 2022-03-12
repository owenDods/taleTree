import { useState, useEffect } from 'react';

export default elementRef => {

	const [ isAtTopOfScroll, setIsAtTopOfScroll ] = useState(null);
	const [ isAtBottomOfScroll, setIsAtBottomOfScroll ] = useState(null);
	const updateScrollStatusIfNeeded = () => {

		const { clientHeight, scrollHeight, scrollTop } = elementRef.current;
		const overflowAmount = scrollHeight - clientHeight;

		if (overflowAmount > 0) {

			setIsAtTopOfScroll(scrollTop === 0);

			setIsAtBottomOfScroll(Math.max(overflowAmount - scrollTop, 0) === 0);

		}

	};

	useEffect(updateScrollStatusIfNeeded, []);

	return [ { isAtTopOfScroll, isAtBottomOfScroll }, updateScrollStatusIfNeeded ];

};
