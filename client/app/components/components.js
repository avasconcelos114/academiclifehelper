import angular from 'angular';

// Containers
import Home from '../containers/home/home';
import Login from '../containers/login/login';
import SignUp from '../containers/signUp/signUp';
import ForgotPassword from '../containers/forgotPassword/forgotPassword';
import Dashboard from '../containers/dashboard/dashboard';

// Components
import About from './about/about';
import CompanyInfo from './companyInfo/companyInfo';
import Contribute from './contribute/contribute';
import HomeHero from './homeHero/homeHero';
import LoginForm from './loginForm/loginForm';
import SignUpForm from './signUpForm/signUpForm';
import Calendar from './calendar/calendar';
import CompletionCharts from './completionCharts/completionCharts';
import CompletionCounter from './completionCounter/completionCounter';
import UpcomingActivities from './upcomingActivities/upcomingActivities';

let componentModule = angular.module('app.components', [
  Home,
  Login,
  SignUp,
  ForgotPassword,
  Dashboard,
  About,
  CompanyInfo,
  Contribute,
  HomeHero,
  LoginForm,
  SignUpForm,
  Calendar,
  CompletionCharts,
  CompletionCounter,
  UpcomingActivities
])

.name;

export default componentModule;
