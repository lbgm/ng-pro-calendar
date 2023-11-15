export enum E_View {
    DAY = "day",
    WEEK = "week",
    MONTH = "month",
}

export enum E_CustomEvents {
    VIEW = 'calendar.request.view',
    REPORT = 'calendar.request.report'
}

export type Appointment = {
    id: string;
    name: string;
    date: string; //DateIsoString
    keywords: string;
    comment?: string;
    createdAt?: string; //DateIsoString
    updatedAt?: string; //DateIsoString
}

export type T_View = 'day' | 'week' | 'month';

export type T_Action = {
    icon?: boolean;
    text?: string;
}

export type Configs = {
    viewEvent?: T_Action;
    reportEvent?: T_Action;
    searchPlaceholder?: string;
    eventName?: string;
    closeText?: string;
    nativeDatepicker?: boolean;
    todayButton?: boolean;
    firstDayOfWeek?: 0 | 1;
}

export type IStartEndDates = {
    start: Date | string;
    end: Date | string
};