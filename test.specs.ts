describe('updateGridFieldMapping', () => {
  beforeEach(() => {
    jest.spyOn(service.dataService, 'getFieldMap').mockReturnValue({
      gridName: {
        colDefs: [
          {
            fieldType: 'dropdown',
            items: null,
            lov: 'lov',
            header: 'header',
            headerTooltip: 'test',
          },
        ],
      },
    });

    jest.spyOn(service.dataService, 'getFieldDataMap').mockReturnValue({
      lov: [],
    });

    jest.spyOn(service.translateService, 'instant').mockReturnValue('instant');

    jest.spyOn(service, 'updateColDefItem').mockImplementation(jest.fn());
    jest.spyOn(service, 'updateColDefHeader').mockImplementation(jest.fn());
    jest.spyOn(service, 'updateColDefHeaderTooltip').mockImplementation(jest.fn());
    jest.spyOn(service, 'updateColDefCellRenderer').mockImplementation(jest.fn());
  });

  it('should update the field mapping for dropdown type', () => {
    service.updateGridFieldMapping('gridName');

    expect(service.updateColDefItem).toHaveBeenCalled();
    expect(service.updateColDefHeader).toHaveBeenCalled();
    expect(service.updateColDefHeaderTooltip).toHaveBeenCalled();
    expect(service.updateColDefCellRenderer).toHaveBeenCalled();
  });

  it('should update the field mapping for numberinput type', () => {
    jest.spyOn(service.dataService, 'getFieldMap').mockReturnValue({
      gridName: {
        colDefs: [
          {
            fieldType: 'numberinput',
            items: null,
            lov: 'lov',
            header: 'header',
          },
        ],
      },
    });

    service.updateGridFieldMapping('gridName');

    expect(service.updateColDefItem).toHaveBeenCalled();
    expect(service.updateColDefHeader).toHaveBeenCalled();
    expect(service.updateColDefHeaderTooltip).toHaveBeenCalled();
    expect(service.updateColDefCellRenderer).toHaveBeenCalled();
  });

  it('should update the field mapping for calendar type', () => {
    const obj = {
      data: {},
    };
    service.datePipe = {
      transform: jest.fn(),
    } as any;

    jest.spyOn(service.dataService, 'getFieldMap').mockReturnValue({
      gridName: {
        colDefs: [
          {
            fieldType: 'calendar',
            items: null,
            lov: 'lov',
            header: 'header',
            refId: 'refId',
            cellRenderer: obj,
          },
        ],
      },
    });

    service.updateGridFieldMapping('gridName');

    expect(service.updateColDefItem).toHaveBeenCalled();
    expect(service.updateColDefHeader).toHaveBeenCalled();
    expect(service.updateColDefHeaderTooltip).toHaveBeenCalled();
    expect(service.updateColDefCellRenderer).toHaveBeenCalled();
  });

  it('should handle cellRenderer with no data', () => {
    jest.spyOn(service.dataService, 'getFieldMap').mockReturnValue({
      gridName: {
        colDefs: [
          {
            fieldType: 'calendar',
            items: null,
            lov: 'lov',
            header: 'header',
            refId: 'refId',
            cellRenderer: { data: {} },
          },
        ],
      },
    });

    service.updateGridFieldMapping('gridName');

    expect(service.updateColDefItem).toHaveBeenCalled();
    expect(service.updateColDefHeader).toHaveBeenCalled();
    expect(service.updateColDefHeaderTooltip).toHaveBeenCalled();
    expect(service.updateColDefCellRenderer).toHaveBeenCalled();
  });
});
