const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export class CustomDate extends Date {
  getMonthName() {
    return months[this.getMonth()];
  }

  getHoursMinutes() {
    const hour = this.getHours();
    const minutes = this.getMinutes();
    return (
      String(hour).padStart(2, "0") + ":" + String(minutes).padStart(2, "0")
    );
  }

  getWeekdayName() {
    return days[this.getDay()];
  }
}
