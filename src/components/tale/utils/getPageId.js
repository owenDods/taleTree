import { checkIsPageId } from '../../../routes';

export default stringAfterTalePath => {

	const isPageId = checkIsPageId(stringAfterTalePath);

	return isPageId ? stringAfterTalePath : null;

};
