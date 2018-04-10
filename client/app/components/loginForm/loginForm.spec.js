import LoginFormModule from './loginForm';
import LoginFormController from './loginForm.controller';
import LoginFormComponent from './loginForm.component';
import LoginFormTemplate from './loginForm.html';

describe('LoginForm', () => {
  let $rootScope, makeController;

  beforeEach(window.module(LoginFormModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new LoginFormController();
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
      expect(LoginFormTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = LoginFormComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(LoginFormTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(LoginFormController);
    });
  });
});
