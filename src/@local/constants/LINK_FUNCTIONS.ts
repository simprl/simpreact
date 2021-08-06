interface LinkFunc {
	(params: Record<string, string>, pathParams: Record<string, string>): string;
}

const LINK_FUNCTIONS = {
	EMPTY:
		(page = ''): LinkFunc =>
		() =>
			page,
};

export default LINK_FUNCTIONS;
