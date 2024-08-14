describe('updateFieldMapping', () => {
    let service: any;

    beforeEach(() => {
        service = new YourService(); // Replace with your actual service initialization
        service.dataService = {
            getGridList: jest.fn().mockReturnValue(['grid1', 'grid2']),
            getFieldMap: jest.fn().mockReturnValue({}),
            setFieldMap: jest.fn()
        };
        service.updateGridFieldMapping = jest.fn();
    });

    it('should call updateGridFieldMapping with updatedField when updatedField is provided', () => {
        const updatedField = 'someField';
        service.updateFieldMapping(updatedField);
        expect(service.updateGridFieldMapping).toHaveBeenCalledWith(updatedField);
    });

    it('should call updateGridFieldMapping for each gridName when updatedField is not provided', () => {
        service.updateFieldMapping();
        expect(service.updateGridFieldMapping).toHaveBeenCalledWith('grid1');
        expect(service.updateGridFieldMapping).toHaveBeenCalledWith('grid2');
    });
});

describe('updateGridFieldMapping', () => {
    let service: any;

    beforeEach(() => {
        service = new YourService(); // Replace with your actual service initialization
        service.dataService = {
            getFieldMap: jest.fn(),
            setFieldMap: jest.fn()
        };
        service.updateColDefItem = jest.fn();
        service.updateColDefHeader = jest.fn();
        service.updateColDefHeaderTooltip = jest.fn();
        service.updateColDefCellRenderer = jest.fn();
    });

    it('should map and update colDef items for dropdown type', () => {
        const mockFieldMap = {
            gridName: {
                colDef: [
                    {
                        fieldType: 'dropdown',
                        items: null,
                        lov: 'lov',
                        header: 'header',
                        headerTooltip: 'test'
                    }
                ],
                refreshedView: false
            }
        };

        jest.spyOn(service.dataService, 'getFieldMap').mockReturnValue(mockFieldMap);
        service.updateGridFieldMapping('gridName');

        expect(service.updateColDefItem).toHaveBeenCalledWith(mockFieldMap.gridName.colDef[0]);
        expect(service.updateColDefHeader).toHaveBeenCalledWith(mockFieldMap.gridName.colDef[0]);
        expect(service.updateColDefHeaderTooltip).toHaveBeenCalledWith(mockFieldMap.gridName.colDef[0]);
        expect(service.updateColDefCellRenderer).toHaveBeenCalledWith(mockFieldMap.gridName.colDef[0]);
        expect(mockFieldMap.gridName.refreshedView).toBe(true);
        expect(service.dataService.setFieldMap).toHaveBeenCalledWith(mockFieldMap);
    });

    it('should map and update colDef items for number input type', () => {
        const mockFieldMap = {
            gridName: {
                colDef: [
                    {
                        fieldType: 'numberinput',
                        items: null,
                        lov: 'lov',
                        header: 'header'
                    }
                ],
                refreshedView: false
            }
        };

        jest.spyOn(service.dataService, 'getFieldMap').mockReturnValue(mockFieldMap);
        service.updateGridFieldMapping('gridName');

        expect(service.updateColDefItem).toHaveBeenCalledWith(mockFieldMap.gridName.colDef[0]);
        expect(service.updateColDefHeader).toHaveBeenCalledWith(mockFieldMap.gridName.colDef[0]);
        expect(service.updateColDefHeaderTooltip).toHaveBeenCalledWith(mockFieldMap.gridName.colDef[0]);
        expect(service.updateColDefCellRenderer).toHaveBeenCalledWith(mockFieldMap.gridName.colDef[0]);
        expect(mockFieldMap.gridName.refreshedView).toBe(true);
        expect(service.dataService.setFieldMap).toHaveBeenCalledWith(mockFieldMap);
    });

    it('should map and update colDef items for calendar type', () => {
        const mockFieldMap = {
            gridName: {
                colDef: [
                    {
                        fieldType: 'calendar',
                        items: null,
                        lov: 'lov',
                        header: 'header',
                        refId: 'refId',
                        cellRenderer: jest.fn().mockReturnValue({
                            data: {
                                refId: '01-JAN-2023'
                            }
                        })
                    }
                ],
                refreshedView: false
            }
        };

        jest.spyOn(service.dataService, 'getFieldMap').mockReturnValue(mockFieldMap);
        service.updateGridFieldMapping('gridName');

        expect(service.updateColDefItem).toHaveBeenCalledWith(mockFieldMap.gridName.colDef[0]);
        expect(service.updateColDefHeader).toHaveBeenCalledWith(mockFieldMap.gridName.colDef[0]);
        expect(service.updateColDefHeaderTooltip).toHaveBeenCalledWith(mockFieldMap.gridName.colDef[0]);
        expect(service.updateColDefCellRenderer).toHaveBeenCalledWith(mockFieldMap.gridName.colDef[0]);
        expect(mockFieldMap.gridName.refreshedView).toBe(true);
        expect(service.dataService.setFieldMap).toHaveBeenCalledWith(mockFieldMap);
