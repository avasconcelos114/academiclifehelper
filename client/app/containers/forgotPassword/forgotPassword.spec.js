import ForgotPasswordModule from './forgotPassword';
import ForgotPasswordController from './forgotPassword.controller';
import ForgotPasswordComponent from './forgotPassword.component';
import ForgotPasswordTemplate from './forgotPassword.html';

describe('ForgotPassword', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ForgotPasswordModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ForgotPasswordController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(ForgotPasswordTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = ForgotPasswordComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(ForgotPasswordTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(ForgotPasswordController);
    });
  });
});
