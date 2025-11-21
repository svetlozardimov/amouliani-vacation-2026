export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export enum DayType {
  REGULAR = 'REGULAR',
  VACATION = 'VACATION',
  TRAVEL = 'TRAVEL',
  EMPTY = 'EMPTY'
}

export interface CalendarDay {
  day: number | null;
  type: DayType;
}