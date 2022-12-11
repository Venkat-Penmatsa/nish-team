import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class FormattedDatePipe extends
  DatePipe implements PipeTransform {
  override transform(value: any, args?: any): any {
    return super.transform(value, "dd/MMM/yyyy");
  }
}