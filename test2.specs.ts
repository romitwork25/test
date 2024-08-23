it('should execute action type AUTHORIZE and include supportData when populated', async () => {
  const action = {
    type: FacilityActions.AUTHORIZE,
    payload: {
      sourceTab: 'HELIOS',
      destinationTab: 'Helios details',
      facilityData: {
        facility: { test: 'test' },
        supportData: { key: 'value' } // Non-empty supportData
      }
    }
  };

  const expectedData = {
    [serviceConstants.FACILITY_POJO]: { test: 'test' },
    [serviceConstants.SUPPORT_POJO]: { key: 'value' } // Expect supportData to be added
  };

  jest.spyOn(service, 'authorizeWorkingCopy').mockReturnValue(
    of({
      status: 'Success',
      uiInstructions: {},
      validations: { results: {} },
      wcOperationSuccessful: true
    })
  );

  const result = await service.handleAuthorizeAction(action).toPromise();

  expect(service.authorizeWorkingCopy).toHaveBeenCalledWith(expectedData);
  expect(result[serviceConstants.UI_MSG]).toBe(msgConstants.AUTHORIZE_SUCCESSFUL);
});
