import { uuidRegexPattern } from '../../../routes';

export default (pathname, talePath) => {

	const stringAfterTalePath = pathname.replace(`${talePath}/`, '');
	const isPageId = new RegExp(uuidRegexPattern).test(stringAfterTalePath);

	return isPageId ? stringAfterTalePath : null;

};
