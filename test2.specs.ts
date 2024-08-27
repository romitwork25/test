it('should assign an empty object when facilityRuleMessages is absent', async () => {
    const action = {
        type: FacilityActions.FETCH,
        payload: {
            sourceTab: 'HELIOS',
            destinationTab: 'Helme',
            facilityData: { test: 'test' },
            facility: { test: 'test' }
        }
    };

    // Mock the getFacilityRuleMessages to return null or undefined
    jest.spyOn(guiHttpHelperService, 'getFacilityRuleMessages').mockReturnValue(of({ facilityRuleMessages: null }));

    // Other necessary mocks (you can reuse these if they are common in your test setup)
    jest.spyOn(guiHttpHelperService, 'getUIValidated').mockReturnValue(
        of({
            status: 'SUCCESS',
            facilityWcPojo: {},
            uiInstructions: {},
            validations: { results: {} },
            authorizeEnabled: true,
            submitEnabled: true,
            approveEnabled: true,
            supportPojo: { facilitySupports: '' }
        })
    );

    facilityEffects.initEffects();
    const res = await store.dispatch(action);

    // Assert that ListofRuleMessages is assigned to an empty object
    expect(res.globalState).toEqual({
        data: {
            ...res.globalState.data, // Preserving the existing structure
            [serviceConstants.ListofRuleMessages]: {}
        }
    });
});
