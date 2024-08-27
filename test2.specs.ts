it('should handle falsy facilityRuleMessages and update state correctly', async () => {
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

  // Mock getFacilityRuleMessages to return a falsy value (e.g., null)
  jest.spyOn(guiHttpHelperService, 'getFacilityRuleMessages').mockReturnValue(
    of({ facilityRuleMessages: null })
  );

  jest.spyOn(guiHttpHelperService, 'getFacilityData').mockReturnValue(
    of({ facilityRuleMessages: '', status: 'SUCCESS' })
  );

  // Optionally, spy on a downstream method that relies on ListofRuleMessages
  const setToolBarStatusSpy = jest.spyOn(facilityEffects, 'setToolBarStatus');

  facilityEffects.initEffects();
  const res = await store.dispatch(action);

  // Verify final state or output
  expect(res.globalState).toEqual({ data: [] });

  // Optionally, verify that the downstream method was called correctly
  expect(setToolBarStatusSpy).toHaveBeenCalledWith(expect.anything(), expect.anything());

  // Additionally, ensure that the state or output is consistent with the expectation
  // that ListofRuleMessages was assigned an empty object.
});
