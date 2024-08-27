// Test case for successful authorization with approveOnAuthorizeInd set to 'Y'
it('should execute action type AUTHORIZE and handle success with approveOnAuthorizeInd', async () => {
  const action = {
    type: FacilityActions.AUTHORIZE,
    payload: {
      sourceTab: 'HELIOS',
      destinationTab: 'Helios details',
      facilityData: {
        facility: { test: 'test', aggregationPreviewTab: { derivedApproveOnAuthorizeInd: 'Y' } },
        supportData: {}
      }
    }
  };

  jest.spyOn(guiHttpHelperService, 'authorizeWorkingCopy').mockReturnValue(
    of({
      status: 'Success',
      uiInstructions: {},
      validations: { results: {} },
      wcOperationSuccessful: true
    })
  );

  facilityEffects.initEffects();
  const res = await store.dispatch(action);

  expect(res.globalState).toEqual({
    data: []
  });
  // Add more assertions based on the expected output
});

// Test case for successful authorization without approveOnAuthorizeInd
it('should execute action type AUTHORIZE and handle success without approveOnAuthorizeInd', async () => {
  const action = {
    type: FacilityActions.AUTHORIZE,
    payload: {
      sourceTab: 'HELIOS',
      destinationTab: 'Helios details',
      facilityData: {
        facility: { test: 'test', aggregationPreviewTab: { derivedApproveOnAuthorizeInd: 'N' } },
        supportData: {}
      }
    }
  };

  jest.spyOn(guiHttpHelperService, 'authorizeWorkingCopy').mockReturnValue(
    of({
      status: 'Success',
      uiInstructions: {},
      validations: { results: {} },
      wcOperationSuccessful: true
    })
  );

  facilityEffects.initEffects();
  const res = await store.dispatch(action);

  expect(res.globalState).toEqual({
    data: []
  });
  // Add more assertions based on the expected output
});

// Test case for unsuccessful authorization
it('should execute action type AUTHORIZE and handle failure', async () => {
  const action = {
    type: FacilityActions.AUTHORIZE,
    payload: {
      sourceTab: 'HELIOS',
      destinationTab: 'Helios details',
      facilityData: {
        facility: { test: 'test' },
        supportData: {}
      }
    }
  };

  jest.spyOn(guiHttpHelperService, 'authorizeWorkingCopy').mockReturnValue(
    of({
      status: 'Failure',
      uiInstructions: {},
      validations: { results: {} },
      wcOperationSuccessful: false
    })
  );

  facilityEffects.initEffects();
  const res = await store.dispatch(action);

  expect(res.globalState).toEqual({
    data: []
  });
  // Add more assertions based on the expected output
});
