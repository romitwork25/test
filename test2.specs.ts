it('should assign an empty object to ListofRuleMessages when facilityRuleMessages is falsy', async () => {
  const action = {
    type: FacilityActions.FETCH,
    payload: {
      sourceTab: 'HELIOS',
      destinationTab: 'Helme data',
      facilityData: {},
      facility: { test: 'test' },
    },
  };

  jest.spyOn(guiHttpHelperService, 'getUIValidated').mockReturnValue(
    of({
      status: 'SUCCESS',
      facilityWcPojo: {},
      uiInstructions: {},
      validations: { results: {} },
      authorizeEnabled: false,
      submitEnabled: false,
      approveEnabled: false,
      supportPojo: { facilitySupports: '' },
    })
  );

  // Mock getFacilityRuleMessages to return a falsy value (e.g., an empty object)
  jest.spyOn(guiHttpHelperService, 'getFacilityRuleMessages').mockReturnValue(
    of({ facilityRuleMessages: null })
  );

  jest.spyOn(guiHttpHelperService, 'getFacilityData').mockReturnValue(
    of({ facilityRuleMessages: '', status: 'SUCCESS' })
  );

  facilityEffects.initEffects();
  const res = await store.dispatch(action);
  
  expect(res.globalState).toEqual({ data: [] });

  // Add an additional check to ensure the payload assignment happens as expected
  expect(res.payload[serviceConstants.ListofRuleMessages]).toEqual({});
});
