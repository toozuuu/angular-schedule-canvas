import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as moment from 'moment';

interface ScheduleItem {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
}

interface Holiday {
  name: string;
  date: string;
}

@Component({
  selector: 'app-schedule-canvas',
  templateUrl: './schedule-canvas.component.html',
  styleUrls: ['./schedule-canvas.component.css']
})
export class ScheduleCanvasComponent {
  times = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  dates: string[] = [];
  scheduleItems: ScheduleItem[] = [
    { name: 'Anne Greene', date: '11 MON', startTime: '8:00 AM', endTime: '1:00 PM', type: 'attendant' },
    { name: 'Jenny Slate', date: '11 MON', startTime: '10:00 AM', endTime: '3:00 PM', type: 'aesthetician' },
    { name: 'Jane Brown', date: '11 MON', startTime: '1:00 PM', endTime: '6:00 PM', type: 'attendant' }
  ];
  holidays: Holiday[] = [];
  startDate: string = '';
  endDate: string = '';
  holidayDate: string = '';
  scheduleDate: string = '';
  scheduleStartTime: string = '';
  scheduleEndTime: string = '';
  scheduleName: string = '';
  scheduleType: string = '';

  getScheduleItemsForDate(date: string): ScheduleItem[] {
    return this.scheduleItems.filter(item => item.date === date);
  }

  getScheduleItemsForDateAndTime(date: string, time: string): ScheduleItem[] {
    return this.scheduleItems.filter(item => item.date === date && this.isWithinTimeRange(item, time));
  }

  isWithinTimeRange(item: ScheduleItem, time: string): boolean {
    const itemStartTime = moment(item.startTime, 'h:mm A');
    const itemEndTime = moment(item.endTime, 'h:mm A');
    const currentTime = moment(time, 'h:mm A');
    return currentTime.isSameOrAfter(itemStartTime) && currentTime.isBefore(itemEndTime);
  }

  calculateGridRow(item: ScheduleItem): string {
    const start = moment(item.startTime, 'h:mm A');
    const end = moment(item.endTime, 'h:mm A');
    const startRow = this.times.indexOf(start.format('h:mm A')) + 1;
    const endRow = this.times.indexOf(end.format('h:mm A')) + 2;
    return `${startRow} / ${endRow}`;
  }

  drop(event: CdkDragDrop<ScheduleItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  updateDateRange() {
    if (this.startDate && this.endDate) {
      const start = moment(this.startDate);
      const end = moment(this.endDate);

      if (end.isBefore(start)) {
        alert('End Date must be after Start Date');
        return;
      }

      this.dates = [];
      const current = start.clone();

      while (current.isSameOrBefore(end)) {
        this.dates.push(current.format('D ddd').toUpperCase());
        current.add(1, 'day');
      }
    }
  }

  addHoliday() {
    if (this.holidayDate) {
      const holiday = moment(this.holidayDate).format('D ddd').toUpperCase();
      if (!this.holidays.some(h => h.date === holiday)) {
        this.holidays.push({ date: holiday, name: 'Public Holiday' });
      }
    }
  }

  validateTimeRange(startTime: string, endTime: string): boolean {
    const start = moment(startTime, 'HH:mm');
    const end = moment(endTime, 'HH:mm');
    return end.isAfter(start);
  }

  roundToNearestSlot(time: string, roundUp: boolean = false): string {
    const timeMoment = moment(time, 'HH:mm');
    const minutes = timeMoment.minutes();
    if (roundUp) {
      if (minutes > 0) {
        timeMoment.add(1, 'hour').startOf('hour');
      }
    } else {
      timeMoment.startOf('hour');
    }
    return timeMoment.format('h:mm A');
  }

  addSchedule() {
    if (this.scheduleDate && this.scheduleStartTime && this.scheduleEndTime && this.scheduleName && this.scheduleType) {
      if (!this.validateTimeRange(this.scheduleStartTime, this.scheduleEndTime)) {
        alert('End time must be after start time');
        return;
      }

      const date = moment(this.scheduleDate).format('D ddd').toUpperCase();
      const startTime = this.roundToNearestSlot(this.scheduleStartTime);
      const endTime = this.roundToNearestSlot(this.scheduleEndTime, true);

      this.scheduleItems.push({
        name: this.scheduleName,
        date: date,
        startTime: startTime,
        endTime: endTime,
        type: this.scheduleType
      });
      this.scheduleName = '';
      this.scheduleStartTime = '';
      this.scheduleEndTime = '';
      this.scheduleDate = '';
      this.scheduleType = '';
    }
  }

  isHoliday(date: string): boolean {
    return this.holidays.some(holiday => holiday.date === date);
  }

  getHolidayDescription(date: string): string {
    const holiday = this.holidays.find(holiday => holiday.date === date);
    return holiday ? holiday.name : '';
  }
}
