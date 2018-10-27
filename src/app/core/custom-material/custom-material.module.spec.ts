import { CustomMaterialModule } from './custom-material.module';

describe('CustomMaterialModule', () => {
  let materialModuleModule: CustomMaterialModule;

  beforeEach(() => {
    materialModuleModule = new CustomMaterialModule();
  });

  it('should create an instance', () => {
    expect(materialModuleModule).toBeTruthy();
  });
});
