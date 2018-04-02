import CompanyInfoModule from './companyInfo';
import CompanyInfoController from './companyInfo.controller';
import CompanyInfoComponent from './companyInfo.component';
import CompanyInfoTemplate from './companyInfo.html';

describe('CompanyInfo', () => {
  let $rootScope, makeController;

  beforeEach(window.module(CompanyInfoModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new CompanyInfoController();
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
      expect(CompanyInfoTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = CompanyInfoComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(CompanyInfoTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(CompanyInfoController);
    });
  });
});
