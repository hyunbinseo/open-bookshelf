export const hideBodyOverflow = (hide: boolean): void => {
	const { classList } = document.body;
	const className = 'overflow-hidden';

	if (hide) classList.add(className);
	if (!hide) classList.remove(className);
};
