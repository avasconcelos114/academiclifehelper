import ContributeModule from './contribute';
import ContributeController from './contribute.controller';
import ContributeComponent from './contribute.component';
import ContributeTemplate from './contribute.html';

describe('Contribute', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ContributeModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ContributeController();
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
      expect(ContributeTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = ContributeComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(ContributeTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(ContributeController);
    });
  });
});
