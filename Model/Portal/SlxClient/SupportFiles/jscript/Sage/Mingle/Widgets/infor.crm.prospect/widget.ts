import { ProspectController } from './prospect.controller';
import { ProspectSettingController } from './prospect-setting.controller';
import { UserService } from './user.service';
import { ProspectService } from './prospect.service';

import templateCache = require('./templateCache');
import lm = require('lime');

export const widgetFactory = (context: lm.IWidgetContext): lm.IWidgetInstance => {
    const m = context.getAngularContext().module;

    m.controller('infor.crm.prospect.ProspectController', ProspectController);
    m.controller('infor.crm.prospect.ProspectSettingController', ProspectSettingController);
    m.service('infor.crm.prospect.UserService', UserService);
    m.service('infor.crm.prospect.ProspectService', ProspectService);

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