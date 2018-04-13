import SignUpModule from './signUp';
import SignUpController from './signUp.controller';
import SignUpComponent from './signUp.component';
import SignUpTemplate from './signUp.html';

describe('SignUp', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SignUpModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SignUpController();
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
      expect(SignUpTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = SignUpComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(SignUpTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(SignUpController);
    });
  });
});
