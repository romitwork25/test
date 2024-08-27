it('should handle facilityRuleMessagesResp.facilityRuleMessages being truthy', async () => {
  const action = {
    type: FacilityActions.FETCH,
    payload: {
      sourceTab: 'HELIOS',
      destinationTab: 'Helme datatla',
      facilityData: { test: 'test' },
      facility: { test: 'test' },
    },
  };

  jest.spyOn(guiHttpHelperService, 'getFacilityRuleMessages').mockReturnValue(of({
    facilityRuleMessages: { message: 'Some rule message' },
  }));

  facilityEffects.initEffects();
  const res = await store.dispatch(action);

  expect(res.globalState).toEqual({ data: [] });
  expect(res.payload[serviceConstants.ListofRuleMessages]).toEqual({ message: 'Some rule message' });
});

it('should handle facilityRuleMessagesResp.facilityRuleMessages being falsy', async () => {
  const action = {
    type: FacilityActions.FETCH,
    payload: {
      sourceTab: 'HELIOS',
      destinationTab: 'Helme datatla',
      facilityData: { test: 'test' },
      facility: { test: 'test' },
    },
  };

  jest.spyOn(guiHttpHelperService, 'getFacilityRuleMessages').mockReturnValue(of({
    facilityRuleMessages: null, // or undefined
  }));

  facilityEffects.initEffects();
  const res = await store.dispatch(action);

  expect(res.globalState).toEqual({ data: [] });
  expect(res.payload[serviceConstants.ListofRuleMessages]).toEqual({});
});
