it('should push the form field to invalidFields if parentObj[data.formField] is undefined', async () => {
  // Arrange
  const form = {
    controls: {
      testField: { setValue: jest.fn() }
    }
  };
  const parentObj = {};
  const invalidFields = [];
  const uiInstructions = {};
  const validations = {};
  const customerState = {};
  const data = {
    formField: 'testField',
    fieldMapping: {
      testField: {}
    }
  };
  const service = new YourServiceClass(); // Replace with your actual service class

  jest.spyOn(service, 'getFormFieldData').mockResolvedValue('testValue');
  jest.spyOn(service, 'updateFormControl').mockImplementation(() => {});
  jest.spyOn(service, 'updateFieldMappingForDynamicForm').mockImplementation(() => {});

  // Act
  await service.processFormField(form, parentObj, invalidFields, uiInstructions, validations, customerState, data);

  // Assert
  expect(invalidFields).toContain('testField');
  expect(service.getFormFieldData).not.toHaveBeenCalled();
  expect(form.controls[data.formField].setValue).not.toHaveBeenCalled();
  expect(service.updateFormControl).not.toHaveBeenCalled();
  expect(service.updateFieldMappingForDynamicForm).not.toHaveBeenCalled();
});
// -----------
it('should get the form field data, update the form control, and update the field mapping when parentObj[data.formField] is defined', async () => {
  // Arrange
  const form = {
    controls: {
      testField: { setValue: jest.fn() }
    }
  };
  const parentObj = { testField: 'someValue' };
  const invalidFields = [];
  const uiInstructions = {};
  const validations = {};
  const customerState = {};
  const data = {
    formField: 'testField',
    fieldMapping: {
      testField: {
        fieldType: 'someFieldType'
      }
    }
  };
  const service = new YourServiceClass(); // Replace with your actual service class

  jest.spyOn(service, 'getFormFieldData').mockResolvedValue('testValue');
  jest.spyOn(service, 'updateFormControl').mockImplementation(() => {});
  jest.spyOn(service, 'updateFieldMappingForDynamicForm').mockImplementation(() => {});

  // Act
  await service.processFormField(form, parentObj, invalidFields, uiInstructions, validations, customerState, data);

  // Assert
  expect(service.getFormFieldData).toHaveBeenCalledWith('testField', parentObj, undefined);
  expect(form.controls[data.formField].setValue).toHaveBeenCalledWith('testValue');
  expect(service.updateFormControl).toHaveBeenCalledWith(form, 'testField', undefined, uiInstructions, validations, customerState);
  expect(service.updateFieldMappingForDynamicForm).toHaveBeenCalledWith('testField', 'someFieldType');
  expect(invalidFields).not.toContain('testField');
});
