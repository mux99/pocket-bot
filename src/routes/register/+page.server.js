export const actions = {
	register: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const email = data.get('email');
		const password = data.get('password');

		console.log(username, email, password);
	}
};
