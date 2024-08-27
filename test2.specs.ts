it('should include facilityRuleMessages in payload when present', async () => {
  const action = {
    type: FacilityActions.FETCH,
    payload: {
      sourceTab: 'HELIOS',
      destinationTab: 'Helme datatla',
      facilityData: {
        test: 'test'
      }
    }
  };

  jest.spyOn(guiHttpHelperService, 'getFacilityRuleMessages').mockReturnValue(
    of({ facilityRuleMessages: [{ message: 'Test message' }] })
  );
  jest.spyOn(guiHttpHelperService, 'getFacilityData').mockReturnValue(
    of({ facilityRuleMessages: '', status: 'SUCCESS' })
  );

  facilityEffects.initEffects();
  const res = await store.dispatch(action);

  expect(res.globalState).toEqual({
    data: {
      [serviceConstants.ListofRuleMessages]: [{ message: 'Test message' }]
    }
  });
});
 // 
// 
// 
// 
it('should include empty object for facilityRuleMessages in payload when not present', async () => {
  const action = {
    type: FacilityActions.FETCH,
    payload: {
      sourceTab: 'HELIOS',
      destinationTab: 'Helme datatla',
      facilityData: {
        test: 'test'
      }
    }
  };

  jest.spyOn(guiHttpHelperService, 'getFacilityRuleMessages').mockReturnValue(
    of({ facilityRuleMessages: null })
  );
  jest.spyOn(guiHttpHelperService, 'getFacilityData').mockReturnValue(
    of({ facilityRuleMessages: '', status: 'SUCCESS' })
  );

  facilityEffects.initEffects();
  const res = await store.dispatch(action);

  expect(res.globalState).toEqual({
    data: {
      [serviceConstants.ListofRuleMessages]: {}
    }
  });
});
