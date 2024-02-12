export class Notification {
  id!: number;
  title!: string;
}
export const NOTIFICATION: Notification[] = [
  {
    id: 11,
    title: 'Fill in timesheets each month by 25th',
  },
  {
    id: 12,
    title: 'Apply leaves before filling timesheet',
  },
  {
    id: 13,
    title:
      'Any changes in employee details please send updates to SPINE team immediately',
  },
  {
    id: 14,
    title:
      'All sick leaves or any changes to leaves or medical certificates to be sent ONLY to hr@nishtech.be and cc sp@nishtech.be. No emails to other ids will be entertained',
  },
];
