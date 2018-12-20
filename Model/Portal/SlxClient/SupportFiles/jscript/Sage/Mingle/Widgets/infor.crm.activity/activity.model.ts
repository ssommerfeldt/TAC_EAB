export interface IActivity {
    key: string;
    type: string;
    description: string;
    startDate: Date;
    phoneNumber: string;
    location: string;
    priority: string;
    status: string;
    recurrenceState: string;
    data: any;
    // Custom fields
    iconName: string;
    condition: string;
    isAsParticipant: boolean;
}

export const iconMap = {
    atAppointment: 'calendar',
    atPhoneCall: 'phone',
    atToDo: 'bullet-list',
    atPersonal: 'contacts'
}

export const activityStatus = {
    accepted: 'asAccepted',
    declined: 'asDeclned'
}