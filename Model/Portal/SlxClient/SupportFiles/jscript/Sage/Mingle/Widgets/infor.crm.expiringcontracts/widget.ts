import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { ContractSettingController } from './Contract-setting.controller';

import templateCache = require('./templateCache');
import lm = require('lime');

export const widgetFactory = (context: lm.IWidgetContext): lm.IWidgetInstance => {
    const m = context.getAngularContext().module;

    m.controller('infor.crm.contract.ContractController', ContractController);
    m.controller('infor.crm.ContractSettingController', ContractSettingController);
    m.service('infor.crm.contract.ContractService', ContractService);

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
        ],
        isConfigured(settings: any): boolean {
            var group = settings.get("group");
            var limitCount = settings.get("limitCount");

            if (group && limitCount)
                return true;

            return false;
        }
    };

    return instance;
};