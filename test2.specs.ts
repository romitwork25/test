
await service.handleAuthorizeAction(action).toPromise();

  // Assert that authorizeWorkingCopy was called with the expected data
  expect(guiHttpHelperService.authorizeWorkingCopy).toHaveBeenCalledWith(expect.objectContaining({
    [serviceConstants.SUPPORT_POJO]: { key1: 'value1' } // Check that supportData is included
  }));
