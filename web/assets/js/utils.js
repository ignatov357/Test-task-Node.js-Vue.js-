var updateUserData = function(beforeRouterCallback = () => {}) {
	axios.get('/api/v1/user_data')
	.then(function (response) {
		if (response.status == 200) {
			user = response.data;
			beforeRouterCallback();
			router.replace('/dashboard');
		} else {
			beforeRouterCallback();
			router.replace('/authorization');
		}
	})
	.catch(function (error, res) {
		beforeRouterCallback();
		router.replace('/authorization');
	});
}