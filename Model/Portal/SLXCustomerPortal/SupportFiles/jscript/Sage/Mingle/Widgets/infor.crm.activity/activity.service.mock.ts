import { IActivityService } from './activity.service';
import lm = require('lime');

export class ActivityServiceMock implements IActivityService {
    widgetContext: lm.IWidgetContext;
    limitCount = 100;

    static $inject = ['$q'];
    constructor(private q: ng.IQService) { }

    getMyActivities(): ng.IPromise<any> {
        const response = { data: { $resources: this.createMockData() } };
        return this.q.when(response);
    }

    getOverdueActivities(): ng.IPromise<any> {
        throw 'Not implemented.';
    }

    getAllOpenActivities(): ng.IPromise<any> {
        throw 'Not implemented.';
    }

    getUserActivities(): ng.IPromise<any> {
        throw 'Not implemented.';
    }
    private createMockData() {
        const mockData = [];
        mockData.push({
            $key: 1,
            Type: 'atAppointment',
            Description: 'Test client',
            PhoneNumber: '999-788-887',
            AccountName: 'ABC Company',
            Status: 'asUnconfirmed',
            StartDate: '/Date(1492811100000)/'
        });
        mockData.push({
            $key: 2,
            Type: 'atAppointment',
            Description: 'Merge conflict testing',
            PhoneNumber: '999-788-887',
            AccountName: 'ABC Company',
            StartDate: new Date(),
            Status: 'asUnconfirmed',
            isAsParticipant: true
        });
        mockData.push({
            $key: 3,
            Type: 'atAppointment',
            Description: 'Another client test',
            PhoneNumber: '999-788-887',
            AccountName: 'ABC Company',
            Status: 'asUnconfirmed',
            StartDate: '/Date(1492811100000)/'
        });
        mockData.push({
            $key: 4,
            Type: 'atAppointment',
            Description: 'Discuss bug testing',
            PhoneNumber: '999-788-887',
            AccountName: 'ABC Company',
            Status: 'asUnconfirmed',
            StartDate: '/Date(1492811100000)/',
            isAsParticipant: true
        });
        mockData.push({
            $key: 5,
            Type: 'atAppointment',
            Description: 'Visit client for testing',
            PhoneNumber: '999-788-887',
            AccountName: 'ABC Company',
            Status: 'asAccepted',
            StartDate: '/Date(1492811100000)/'
        });
        mockData.push({
            $key: 6,
            Type: 'atAppointment',
            Description: 'Talk about testing',
            PhoneNumber: '999-788-887',
            AccountName: 'ABC Company',
            Status: 'asAccepted',
            StartDate: '/Date(1492811100000)/',
            isAsParticipant: true
        });
        mockData.push({
            $key: 7,
            Type: 'atPhoneCall',
            Description: 'Call for testing',
            PhoneNumber: '999-788-887',
            AccountName: 'ABC Company',
            Status: 'asUnconfirmed',
            StartDate: '/Date(1492811100000)/'
        });
        mockData.push({
            $key: 8,
            Type: 'atToDo',
            Description: 'Visit client for testing',
            PhoneNumber: '999-788-887',
            AccountName: 'ABC Company',
            StartDate: '/Date(1492811100000)/',
            Status: 'asUnconfirmed',
            isAsParticipant: true
        });
        mockData.push({
            $key: 9,
            Type: 'atAppointment',
            Description: 'See testing',
            PhoneNumber: '999-788-887',
            AccountName: 'ABC Company',
            Status: 'asUnconfirmed',
            StartDate: '/Date(1492811100000)/'
        });
        mockData.push({
            $key: 10,
            Type: 'atToDo',
            Description: 'Visit client for testing',
            PhoneNumber: '999-788-887',
            AccountName: 'ABC Company',
            StartDate: '/Date(1492811100000)/',
            Status: 'asUnconfirmed',
            isAsParticipant: true
        });

        return mockData;
    }
}