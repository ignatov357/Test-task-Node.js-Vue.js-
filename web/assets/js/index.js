"use strict"

Vue.use(VueRouter)
Vue.use(VeeValidate);

var register = Vue.component('sign-up', {
	template: `<div id="register-container">
		<h3 class="form-heading">Sign up</h3>
		<form @submit.prevent="handler()">
			<div class="row form">
				<div class="col-md-6">
					<div class="form-group">
			            <p class="control has-icon has-icon-right">
			                <input v-model="name" v-validate="'required'" name="name" :class="{'input': true, 'is-danger': errors.has('name') }" class="form-control" placeholder="Your Name *" type="text" value="">
			                <i v-show="errors.has('name')" class="fa fa-warning"></i>
			                <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
			            </p>
					</div>
					<div class="form-group">
			            <p class="control has-icon has-icon-right">
			            	<input v-model="email" v-validate="'required|email'" name="email" :class="{'input': true, 'is-danger': errors.has('email') }" class="form-control" placeholder="Your Email *" value="">
			                <i v-show="errors.has('email')" class="fa fa-warning"></i>
			                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
			            </p>
					</div>
					<div class="form-group">
			            <p class="control has-icon has-icon-right">
			            	<input v-model="password" v-validate="'required'" name="password" :class="{'input': true, 'is-danger': errors.has('password') }" class="form-control" placeholder="Password *" type="password" value="">
			                <i v-show="errors.has('password')" class="fa fa-warning"></i>
			                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
			            </p>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
			            <p class="control has-icon has-icon-right">
			                <input v-model="username" v-validate="'required'" name="username" :class="{'input': true, 'is-danger': errors.has('username') }" class="form-control" placeholder="Username *" value="">
			                <i v-show="errors.has('username')" class="fa fa-warning"></i>
			                <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
			            </p>
					</div>
					<div class="form-group">
			            <p class="control has-icon has-icon-right">
			                <input v-model="phone" v-validate="'required'" name="phone" :class="{'input': true, 'is-danger': errors.has('phone') }" class="form-control" placeholder="Your Phone *" value="">
			                <i v-show="errors.has('phone')" class="fa fa-warning"></i>
			                <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
			            </p>
					</div>
					<div class="form-group">
			            <p class="control has-icon has-icon-right">
			                <input v-model="passwordConfirmation" v-validate="'required|confirmed:password'" name="password confirmation" :class="{'input': true, 'is-danger': errors.has('password confirmation') }" class="form-control" placeholder="Confirm Password *" type="password" value="">
			                <i v-show="errors.has('password confirmation')" class="fa fa-warning"></i>
			                <span v-show="errors.has('password confirmation')" class="help is-danger">{{ errors.first('password confirmation') }}</span>
			            </p>
					</div>
					<input class="btnSubmit" type="submit" value="Sign up">
				</div>
			</div>
		</form>
	</div>`,
	data: function () {
		return {
			name: '',
			username: '',
			email: '',
			phone: '',
			password: '',
			passwordConfirmation: ''
		}
	},
	props: {
		submitHandler: {
			type: Function,
			required: true
		}
	},
	methods: {
		handler: function () {
			this.$validator.validateAll().then((result) => {
				if (this.errors.items.length > 0) {
					return;
				}

				if (typeof this.submitHandler === 'function') {
					this.submitHandler(this._data);
				}
			});
		}
	}
});

var login = Vue.component('sign-in', {
	template: `<div id="login-container">
		<h3 class="form-heading">Login</h3>
		<form @submit.prevent="handler()">
			<div class="row form">
				<div class="col-md-6">
					<div class="form-group">
			            <p class="control has-icon has-icon-right">
			            	<input v-model="email" v-validate="'required|email'" name="email" :class="{'input': true, 'is-danger': errors.has('email') }" class="form-control" placeholder="Your Email *" value="">
			                <i v-show="errors.has('email')" class="fa fa-warning"></i>
			                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
			            </p>
					</div>
        		</div>
				<div class="col-md-6">
					<div class="form-group">
			            <p class="control has-icon has-icon-right">
			            	<input v-model="password" v-validate="'required'" name="password" :class="{'input': true, 'is-danger': errors.has('password') }" class="form-control" placeholder="Password *" type="password" value="">
			                <i v-show="errors.has('password')" class="fa fa-warning"></i>
			                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
			            </p>
					</div>
          			<input class="btnSubmit" type="submit" value="Login">
        		</div>
			</div>
		</form>
	</div>`,
	data: function () {
		return {
			email: '',
			password: ''
		}
	},
	props: {
		submitHandler: {
			type: Function,
			required: true
		}
	},
	methods: {
		handler: function () {
			this.$validator.validateAll().then((result) => {
				if (this.errors.items.length > 0) {
					return;
				}

				if (typeof this.submitHandler === 'function') {
					this.submitHandler(this._data);
				}
			});
			return false;
		}
	}
});

var authorization = Vue.component('authorization-page', {
	template: `<div class="container register">
    <div class="row">
      <div class="col-md-3 left">
        <h3>{{ activeTab == 'register' ? 'Already have an account?' : 'Don\\'t have an account yet?' }}</h3>
        <button @click="changeTab()">{{ activeTab == 'register' ? 'Login' : 'Sign up' }}</button><br>
      </div>
      <div class="col-md-9 right">
        <sign-up v-if="activeTab == 'register'" :submit-handler="registerHandler"></sign-up>
        <sign-in v-if="activeTab == 'login'" :submit-handler="loginHandler"></sign-in>
      </div>
    </div>
  </div>`,
	data: function () {
		return {
			activeTab: 'login'
		}
	},
	methods: {
		changeTab: function () {
			this.activeTab = (this.activeTab == 'register' ? 'login' : 'register');
		},
		registerHandler: function (data) {
			var componentReference = this;
			axios.post('/api/v1/register', data)
			.then(function (response) {
				if (response.status == 200) {
					componentReference.$snotify.success(response.data.message);
					updateUserData();
				} else {
					componentReference.$snotify.error(response.data.errorMessage);
				}
			})
			.catch(function (error) {
				if(typeof error.response !== 'undefined') {
					componentReference.$snotify.error(error.response.data.errorMessage);
				} else {
					componentReference.$snotify.error('Problem connecting to the server');
				}
			});
		},
		loginHandler: function (data) {
			var componentReference = this;
			axios.post('/api/v1/login', data)
			.then(function (response) {
				if (response.status == 200) {
					componentReference.$snotify.success(response.data.message);
					updateUserData();
				} else {
					componentReference.$snotify.error(response.data.errorMessage);
				}
			})
			.catch(function (error, res) {
				if(typeof error.response !== 'undefined') {
					componentReference.$snotify.error(error.response.data.errorMessage);
				} else {
					componentReference.$snotify.error('Problem connecting to the server');
				}
			});
		}
	}
});

// TODO
// Not finished
var dashboard = Vue.component('dashboard', {
	template: `<div>
		<p v-if="user">Name: <b>{{user.name}}</b></p>
		<p v-if="user">Username: <b>{{user.username}}</b></p>
		<p v-if="user">Email: <b>{{user.email}}</b></p>
		<p v-if="user">Phone number: <b>{{user.phone}}</b></p>
		<br>
		<a class="a-link" @click.prevent="logoutHandler()">Logout</a>
	</div>`,
	data: function() {
		return {user}
	},
	methods: {
		logoutHandler: function() {
			var componentReference = this;
			axios.post('/api/v1/logout')
			.then(function (response) {
				if (response.status == 200) {
					componentReference.$snotify.success(response.data.message);
					componentReference.$router.replace('/authorization');
				} else {
					componentReference.$snotify.error(response.data.errorMessage);
				}
			})
			.catch(function (error, res) {
				if(typeof error.response !== 'undefined') {
					componentReference.$snotify.error(error.response.data.errorMessage);
				} else {
					componentReference.$snotify.error('Problem connecting to the server');
				}
			});
		}
	}
});

var routes, router, app;
var initializeVue = function() {
	routes = [{
			path: '/authorization',
			component: authorization
		},
		{
			path: '/dashboard',
			component: dashboard
		}
	];
	router = new VueRouter({
		mode: 'history',
		routes: routes
	});
	app = new Vue({
		router,
	}).$mount('#app');
}
var user = undefined;
updateUserData(initializeVue);