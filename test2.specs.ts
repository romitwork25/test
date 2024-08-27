  it('should dispatch GET_CALINK action if linkedCAs is empty', async () => {
    // Setup mock store state
    store.select.and.returnValue(of({
      facilityState: {
        creditApprovals: {
          linkedCAs: []
        }
      }
    }));

    await service.loadPage();

    // Verify dispatch
    expect(store.dispatch).toHaveBeenCalledWith({
      type: FacilityActions.GET_CALINK
    });
  });
