import angular from 'angular';

// Containers
import Home from '../containers/home/home';
import Login from '../containers/login/login';
import SignUp from '../containers/signUp/signUp';
import ForgotPassword from '../containers/forgotPassword/forgotPassword';

// Components
import About from './about/about';
import CompanyInfo from './companyInfo/companyInfo';
import Contribute from './contribute/contribute';
import HomeHero from './homeHero/homeHero';
import LoginForm from './loginForm/loginForm';
import SignUpForm from './signUpForm/signUpForm';

let componentModule = angular.module('app.components', [
  Home,
  Login,
  SignUp,
  ForgotPassword,
  About,
  CompanyInfo,
  Contribute,
  HomeHero,
  LoginForm,
  SignUpForm
])

.name;

export default componentModule;
