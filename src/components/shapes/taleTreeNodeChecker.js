import isString from 'lodash/fp/isString';
import isArray from 'lodash/fp/isArray';
import forEach from 'lodash/fp/forEach';

const uncappedForEach = forEach.convert({ cap: false });

const taleTreeNodeChecker = (propValue, index, componentName, location, propFullName) => {

	if (index === 0 && !isString(propValue[index])) {

		return new Error(`${propFullName} node does not have a string for its id, received: ${propValue[index]}`);

	}

	if (index === 1) {

		if (!isArray(propValue[index])) {

			return new Error(`${propFullName} node does not have an array for its child nodes, received: ${propValue[index]}`);

		}

		if (propValue[index].length) {

			let childError;

			uncappedForEach(childNode => {

				uncappedForEach((childNodeNode, childNodeIndex) => {

					const result = taleTreeNodeChecker(
						childNode, childNodeIndex, componentName, location, propFullName
					);

					if (result) {

						childError = result;

					}

				}, childNode);

			}, propValue[index]);

			if (childError) {

				return childError;

			}

		}

	}

	if (index > 1) {

		return new Error(`${propFullName} node has too many structures`);

	}

	return null;

};

export default taleTreeNodeChecker;
