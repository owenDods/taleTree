import { checkIsPageId } from '../../../routes';

export default (pathname, talePath) => {

	const stringAfterTalePath = pathname.replace(`${talePath}/`, '');
	const isPageId = checkIsPageId(stringAfterTalePath);

	return isPageId ? stringAfterTalePath : null;

};
