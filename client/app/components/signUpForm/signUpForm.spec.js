import SignUpFormModule from './signUpForm';
import SignUpFormController from './signUpForm.controller';
import SignUpFormComponent from './signUpForm.component';
import SignUpFormTemplate from './signUpForm.html';

describe('SignUpForm', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SignUpFormModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SignUpFormController();
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
      expect(SignUpFormTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = SignUpFormComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(SignUpFormTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(SignUpFormController);
    });
  });
});
