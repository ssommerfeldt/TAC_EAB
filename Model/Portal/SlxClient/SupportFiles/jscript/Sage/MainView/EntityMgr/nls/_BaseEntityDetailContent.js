define("Sage/MainView/EntityMgr/nls/_BaseEntityDetailContent", {
    root:
    {
        //tab names
        FilterTabTitle: 'Filters',
        MetricTabTitle: 'Metrics',
        PropertyTabTitle: 'Fields',
        CalcFieldTabTitle: 'Calculated Fields',
        EntityTabTitle: 'Entities',
        RelationTabTitle: 'Relationships',

        //Dialog Names
        // Add <Dialogue Name> to <Entity Name> Entity.
        dialogTitleAddField: 'Add Field to ${0} Entity',
        dialogTitleAddFilter: 'Add Filter to ${0} Entity',
        dialogTitleAddMetric: 'Add Metric to ${0} Entity',
        dialogTitleAddRelationship: 'Add Relationship to ${0} Entity',
        // Edit <Field Name> in <Entity Name> Entity.
        editDialogTitle: 'Edit ${0} in ${1} Entity',

        FilterDialogTitle: 'Filter',
        MetricDialogTitle: 'Metric',
        PropertyDialogTitle: 'Field',
        RelationDialogTitle: 'Relationship',

        //filter grid column names
        FilterGridColumnFilter: 'Filter Name',
        MetricGridColumnMetric: 'Metric Name',
        FilterGridColumnDisplay: 'Display Name',
        FilterGridColumnProperty: 'Field',
        FilterGridColumnType: 'Metric or Filter',
        FilterGridColumnIsMetric: 'In Dashboard',
        FilterGridColumnLastUpdated: 'Last Modified',
        FilterGridColumnDetails: 'Type',

        //filter grid detail columns Formats
        FilterGridDetailsDistinctFilter: "Distinct",
        FilterGridDetailsDateDiffMetricFilter: "Date Difference Metric",
        FilterGridDetailsRangeFilter: "Range",
        FilterGridDetailsMetricFilter: "Metric",
        FilterGridDetailsUserLookupFilter: "User Lookup",
        FilterGridDetailsLookupFilter: "Lookup",
        FilterGridDetailsCustom: "Custom",

        //grid icons titles
        GridHelp: 'Help',

        //filter grid icon titles
        FilterGridAdd: 'Add Filter',
        FilterGridRemove: 'Remove Filter',
        FilterGridEdit: 'Edit Filter',

        MetricGridAdd: 'Add Metric',
        MetricGridRemove: 'Remove Metric',
        MetricGridEdit: 'Edit Metric',

        PropertyGridAdd: 'Add Field',
        PropertyGridRemove: 'Remove Field',
        PropertyGridEdit: 'Edit Field',

        CalculatedGridAdd: 'Add Calculated Field',
        CalculatedGridRemove: 'Remove Calculated Field',
        CalculatedGridEdit: 'Edit Calculated Field',

        // Add/Edit labels
        lblFilterName: "Filter Name",
        lblDisplayName: "Display Name",
        lblFilterDp: "Fields",
        lblTypeDp: "Type",
        lblCharacter: "Characters",
        lblTypeSpecificContentBox: "Type Specific Content Box",
        lblSaveButton: "Save",
        lblCancelButton: "Cancel",
        lblOkButton: "OK",
        lblWarning: "Please select an item.",
        confirmDeleteFmtTxt: "Are you sure you want to delete these ${0} items?",
        filtersFor: "Filters for",
        metricsFor: "Metrics for",
        propertyFor: "Fields for",
        calculatedFor: "Calculated Fields for",
        defaultRangeRowValue: "Enter a Value",

        //range column names
        customSql: 'Custom SQL',
        displayName: 'Display Name',
        "lower": 'Lower',
        rangeId: 'Range Id',
        rangeName: 'Range Name',
        "upper": 'Upper',

        //operations
        SUM: 'Total (sum)',
        "Contains": 'Contains',
        StartsWith: 'Starts With',
        EndsWith: 'Ends With',
        LessThan: 'Less Than',
        GreaterThan: 'Greater Than',
        LessThanEqual: 'Less Than Or Equal',
        GreaterThanEqual: 'Greater Than Or Equal',
        "Equal": 'Equals',
        NotEqual: 'Does Not Equal',
        COUNT: 'Count',
        AVG: 'Average',
        MIN: 'Minimum Value',
        MAX: 'Maximum Value',
        totalRecordCountLabel: "Total Records: ${0}",

        // property and calculated fields grid
        propertyName: 'Name',
        Description: 'Description',
        propertyType: 'Type',
        "included": 'Included',
        calculatedFields: 'Calculated',
        generate: 'Generate',
        key: 'Key',


        //relationships
        relationFor: 'Relationship For',
        childEntity: 'Child',
        childProperty: "Child's Field",
        parentEntity: 'Parent',
        parentProperty: "Parent's Field",
        editable: "Editable",
        cardinality: "Cardinality",
        relationship: "Relationship",
        parentImport: "Parent's Import",
        parentMatch: "Parent's Match",
        parentAudit: "Parent's Audit",
        parentIncluded: "Parent's Included",
        childImport: "Child's Import",
        childMatch: "Child's Match",
        childAudit: "Child's Audit",
        childIncluded: "Child is Included",

        // data types
        "text": 'text',
        memo: 'memo',
        unicodeText: 'unicode text',
        unicodeMemo: 'unicode memo',
        "integer": 'integer',
        "double": 'double',
        single: 'single',
        "decimal": 'decimal',
        "short": 'short',
        standardId: 'standard id',
        trueFalse: 'true/false',
        yesNo: 'yes/no',
        "boolean": 'boolean',
        dateTime: 'date/time',
        email: 'email',
        phone: 'phone',
        pickList: 'pick list',
        owner: 'owner',
        lookup: 'lookup',
        dependencyLookup: 'dependency lookup',
        "char": 'char',
        enum_: 'enum',
        "guid": 'guid',
        "byte": 'byte',
        "binary": 'binary',
        "url": 'url',
        "string": 'string',
        "number": 'number',

        //errors
        notUniqueFor: 'is not unique for',

        lblPluralName: "Display Plural Name",
        lblTitle: 'Title',
        IsExtension: 'Is Extension',
        AdvOptions: 'Advanced Options',
        lblImport: 'Import',
        lblMatch: 'Match',
        lblBulkUpdate: 'Bulk Update',
        lblAudited: 'Audited',
        lblPut: 'Put',
        lblPost: 'Post',
        lblDelete: 'Delete',
        lblHistory: 'Track History To',
        metricNotEditable: 'This metric is not editable.'

    },
    "de": true,
    "en": true,
    "fr": true,
    "it": true,
    "ru": true
});