import { OpportunityController } from './opportunity.controller';
import { OpportunitySettingController } from './opportunity-setting.controller';
import { OpportunityService } from './opportunity.service';

import templateCache = require('./templateCache');
import lm = require('lime');

export const widgetFactory = (context: lm.IWidgetContext): lm.IWidgetInstance => {
    const m = context.getAngularContext().module;

    m.controller('infor.crm.opportunity.OpportunityController', OpportunityController);
    m.controller('infor.crm.opportunity.OpportunitySettingController', OpportunitySettingController);
    m.service('infor.crm.opportunity.OpportunityService', OpportunityService);

    const angularConfig: lm.IAngularWidgetConfig = {};
    if (context.isDev()) {
        angularConfig.relativeTemplateUrl = 'widget.html';
    } else {
        angularConfig.templates = templateCache.getTemplates(context.getAngularContext());
        angularConfig.cachedTemplateUrl = angularConfig.templates[1].key;
    }

    const instance: lm.IWidgetInstance = {
        angularConfig: angularConfig,
        actions: <lm.IWidgetAction[]>[
            { isPrimary: true, standardIconName: '#icon-launch' }
        ]
    };

    return instance;
};