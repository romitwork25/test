it('populateDomainFromForm should mark control as touched if it has errors', () => {
  // Create a form with validation errors
  const formWithErrors = new FormGroup({
    formField: new FormControl('', [Validators.required]), // Adding a required validator
    arrayField: new FormControl(['arrayFieldValue']),
    dateField: new FormControl(new Date()),
    invalidField: new FormControl({}),
    refKeyField: new FormControl({ refkey: 'refValue' }),
  });

  // The field map based on which the domain should be populated
  const fieldMap = {
    formField: { path: 'path', refkey: 'refkey', datakey: 'formField' },
    arrayField: { path: 'arrayPath', refkey: 'refkey', datakey: 'arrayField' },
    dateField: { path: 'datePath' },
    invalidField: { path: 'invalidPath', refKey: 'refKey', datakey: 'invalidField' },
    refKeyField: { path: 'refKeyPath', refKey: 'refKey' },
  };

  const customerState = {
    path: { formField: null },
    arrayPath: { arrayField: [] },
    invalidPath: { invalidField: undefined },
    datePath: { dateField: null },
    refKeyPath: { customField: '' },
  };

  // Simulate the service responses
  jest.spyOn(service.dataService, 'getFormList').mockReturnValue([formWithErrors]);
  jest.spyOn(service.dataService, 'getFieldMap').mockReturnValue(fieldMap);

  // Call the method under test
  service.populateDomainFromForm(customerState);

  // Check the expected state after the function call
  setTimeout(() => {
    // The control should be marked as touched
    expect(formWithErrors.controls.formField.touched).toBe(true);

    // The customer state should be updated accordingly
    expect(customerState).toEqual({
      path: { formField: '' },
      arrayPath: { arrayField: ['arrayFieldValue'] },
      invalidPath: { invalidField: undefined },
      datePath: { dateField: new Date() },
      refKeyPath: { customField: '' },
    });
  });
});



// ---------------------------- second
it('populateDomainFromForm with form errors and array field', () => {
  jest.spyOn(service.dataService, 'getFormList').mockReturnValue([
    new FormGroup({
      formField: new FormControl('formFieldValue', { validators: [Validators.required] }), // Validator to simulate error
      arrayField: new FormControl(['arrayFieldValue']),
      dateField: new FormControl(new Date()),
      invalidField: new FormControl({}, { validators: [Validators.required] }), // Error case
      refKeyField: new FormControl({
        refkey: 'refValue'
      })
    })
  ]);

  let customerState: any = {
    path: {
      formField: null
    },
    arrayPath: {
      arrayField: []
    },
    invalidPath: {
      invalidField: undefined
    },
    datePath: {
      dateField: null
    },
    refKeyPath: {
      customField: ''
    }
  };

  jest.spyOn(service.dataService, 'getFieldMap').mockReturnValue({
    formField: {
      path: 'path',
      refkey: 'refkey',
      datakey: 'formField'
    },
    arrayField: {
      path: 'arrayPath',
      refkey: 'refkey',
      datakey: 'arrayField'
    },
    dateField: {
      path: 'datePath'
    },
    invalidField: {
      path: 'invalidPath',
      refKey: 'refKey',
      datakey: 'invalidField'
    },
    refKeyField: {
      path: 'refKeyPath',
      refKey: 'refKey'
    }
  });

  // Call the function
  service.populateDomainFromForm(customerState);

  setTimeout(() => {
    // Expect formField to be updated
    expect(customerState.path.formField).toEqual('formFieldValue');
    
    // Expect arrayField to be updated in arrayPath
    expect(customerState.arrayPath.arrayField).toEqual(['arrayFieldValue']);
    
    // Expect form controls to be marked as touched due to errors
    expect(service.dataService.getFormList()[0].controls['formField'].touched).toBe(true);
    expect(service.dataService.getFormList()[0].controls['invalidField'].touched).toBe(true);
  });
});

