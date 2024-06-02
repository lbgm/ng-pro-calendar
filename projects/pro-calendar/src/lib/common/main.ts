import { T_LANG } from '../types/main';
import { TranslateService } from "../services/translate.service";


function locale(): T_LANG {
  return TranslateService.instance.lang;
}

export const twoDigit = (part: string | number): string => {
  return String("0" + part).slice(-2);
};

export const copyDate = (date: Date | string): Date => {
  return new Date(date);
};

export const incrementTime = (time: string, force = false): string => {
  time = time || "23:00";
  let _time: string[] | string = time.split(":");
  _time =
    _time[0] === "23" || force
      ? `${twoDigit(_time[0])}:${"59"}`
      : `${twoDigit(String(Number(_time[0]) + 1))}:${_time[1]}`;
  return _time;
};

export const fixDateTime = (date: Date, time: string): Date => {
  time = time || "00:00";
  const _time: string[] = time.split(":");
  //const _date = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const _date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  //
  _date.setHours(Number(_time[0]));
  _date.setMinutes(Number(_time[1]));

  return _date;
};

export const randomId = (): string => {
  const rd = (Math.random() + 1).toString(36).substring(7);
  return rd;
};

export const dayName = (date: Date | string, day: string | number): string => {
  const _day = copyDate(date);
  return new Intl.DateTimeFormat(locale(), { weekday: "short" }).format(
    _day.setDate(Number(day))
  );
};

export const monthName = (date: Date | string): string => {
  const _day = copyDate(date);
  return new Intl.DateTimeFormat(locale(), { month: "short" }).format(_day);
};

export const dateLabel = (date: Date): string => {
  const _d = copyDate(date);
  const _nd = new Date();
  if (
    _d.getMonth() === _nd.getMonth() &&
    _d.getFullYear() === _nd.getFullYear()
  ) {
    if (_d.getDate() === _nd.getDate()) return "calendar.today";
    if (_d.getDate() === _nd.getDate() + 1) return "calendar.tomorrow";
  }

  return new Intl.DateTimeFormat(locale(), {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const isoStringToDate = (iso: Date | string): Date => {
  const _date = new Date(iso);
  return _date;
};

export const dateToIsoString = (date: Date | string): string => {
  return new Date(date).toISOString();
};

export const minutes = (dat: Date | string): string => {
  return twoDigit(isoStringToDate(dat).getMinutes());
};

export const hours = (dat: Date | string): string => {
  return twoDigit(isoStringToDate(dat).getHours());
};

//----------------------------------------------------------------------------------

// generate previous year' months to actual year' months until actual month
export const yearMonthGenerator = (
  date?: Date | string
): { _prevmonths: Date[]; _nextmonths: Date[] } => {
  const _prevmonths: Date[] = [];
  const _nextmonths: Date[] = [];
  const _date = date ? new Date(date) : new Date();
  const _year = _date.getFullYear();
  const _month = _date.getMonth();

  //old year month
  const prevFirstMonth = new Date(_year - 1, 0, 1);
  const prevLastMonth = new Date(_year - 1, 11, 1);
  //actual year month
  const acFirstMonth = new Date(_year, 0, 1); //must be previous
  const acLastMonth = new Date(_year, _month, 1);

  const itPrevMonth = new Date(prevFirstMonth);
  const itActMonth = new Date(acFirstMonth);

  // iterate on previous year month
  while (itPrevMonth <= prevLastMonth) {
    _prevmonths.push(new Date(itPrevMonth));
    itPrevMonth.setMonth(itPrevMonth.getMonth() + 1);
  }

  // iterate on current year Month to actual month of current year
  while (itActMonth <= acLastMonth) {
    _nextmonths.push(new Date(itActMonth));
    itActMonth.setMonth(itActMonth.getMonth() + 1);
  }

  return {
    _prevmonths,
    _nextmonths,
  };
};

export const getWeekInterval = (
  date: Date | string | number,
  firstDayOfWeek: 0 | 1 = 0
): { start: Date; end: Date } => {
  const current_date = new Date(date);
  // Start from Sunday, if want Monday add + 1
  const week_start = current_date.getDate() - current_date.getDay() + firstDayOfWeek;
  const week_first_day = new Date(current_date.setDate(week_start));
  const week_end_day = new Date(
    current_date.setDate(week_first_day.getDate() + 6)
  );

  return {
    start: week_first_day,
    end: week_end_day,
  };
};

// week days'date generation from picked date
export const weekGenerator = (
  week: { start: Date; end: Date } | Record<string, Date>
): Date[] => {
  const weeks: Date[] = [];
  const week_day_date = copyDate(week.start);

  while (week_day_date <= week.end) {
    weeks.push(copyDate(week_day_date));
    week_day_date.setDate(week_day_date.getDate() + 1);
  }
  return weeks;
};

// month days'date generation from picked date
export const monthGenerator = (date: Date | string, firstDayOfWeek: 0 | 1 = 0): {firstDay: Date; lastDay: Date; _days: Date[]} => {
  const _days: Date[] = [];
  const _date = copyDate(date);
  const _year = _date.getFullYear();
  const _month = _date.getMonth();
  const firstDay = new Date(_year, _month, 1);
  const lastDay = new Date(_year, _month + 1, 0);
  const month_day_date = new Date(firstDay);

  // to get previous dates before requested month (in target week)
  const previousMonthDays = weekGenerator(getWeekInterval(firstDay, firstDayOfWeek));
  for (const _dayDate of previousMonthDays) {
    if (_dayDate < firstDay) _days.push(_dayDate);
  }

  // to get requested month days'day
  while (month_day_date <= lastDay) {
    _days.push(copyDate(month_day_date));
    month_day_date.setDate(month_day_date.getDate() + 1);
  }

  // to get next dates after requested month (in target week)
  const nextMonthDays = weekGenerator(getWeekInterval(lastDay, firstDayOfWeek));
  for (const _dayDate of nextMonthDays) {
    if (_dayDate > lastDay) _days.push(_dayDate);
  }

  return {
    _days,
    firstDay,
    lastDay,
  };
};

export const prevDate = (date: Date | string): Date => {
  const _date = copyDate(date);
  const _day = _date.getDate();
  return _day > 1 ? new Date(_date.setDate(_day - 1)) : _date;
};

export const nextDate = (date: Date | string): Date => {
  const _date = copyDate(date);
  const _day = _date.getDate();
  // month days limit
  const limit =
    _date.getMonth() === 1
      ? 27
      : [0, 2, 4, 6, 7, 9, 11].includes(_date.getMonth())
      ? 30
      : 29;
  return _day <= limit ? new Date(_date.setDate(_day + 1)) : _date;
};

export const timeToSeconds = (time: string): number => {
  if (!/.{2}:.{2}:.{2}/i.test(time)) {
    if(!/.{2}:.{2}/i.test(time)) return 0;
    time = `${time}:00`;
  }
  const a = time.split(":"); // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  const seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

  return seconds;
};

export const timeFormat = (time: string, full?: boolean): string => {
  const _nd = fixDateTime(new Date(), time);
  let options = {};

  if(locale().indexOf("en") !== -1) {
    options = full ? {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    } : {
      hour: "numeric",
      hour12: true,
    }
  } else options = {
    hour: "numeric",
    minute: "numeric",
  }

  return new Intl.DateTimeFormat(locale(), options).format(_nd);
};