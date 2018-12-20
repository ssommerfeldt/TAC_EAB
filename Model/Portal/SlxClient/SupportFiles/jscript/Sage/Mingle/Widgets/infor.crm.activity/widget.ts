import { ActivityController } from './activity.controller';
import { ActivitySettingController } from './activity-setting.controller';
import { UserService } from './user.service';
import { ActivityService } from './activity.service';

import templateCache = require('./templateCache');
import lm = require('lime');

export const widgetFactory = (context: lm.IWidgetContext): lm.IWidgetInstance => {
    const m = context.getAngularContext().module;

    m.controller('infor.crm.ActivityController', ActivityController);
    m.controller('infor.crm.ActivitySettingController', ActivitySettingController);
    m.service('infor.crm.UserService', UserService);
    m.service('infor.crm.ActivityService', ActivityService);

    const angularConfig: lm.IAngularWidgetConfig = {};
    if (context.isDev()) {
        angularConfig.relativeTemplateUrl = 'widget.html';
    } else {
        angularConfig.templates = templateCache.getTemplates(context.getAngularContext());
        angularConfig.cachedTemplateUrl = angularConfig.templates[1].key;
    }

    const instance: lm.IWidgetInstance = {
        angularConfig: angularConfig
    };

    return instance;
};
