class Backup {
  constructor({ id = null, source, destination, frequency, selectedDay, selectedTime, type }) {
    this.id = id;
    this.source = source;
    this.destination = destination;
    this.frequency = frequency;
    this.selectedDay = selectedDay
    this.selectedTime = selectedTime
    this.type = type;
  }
}

module.exports = {
  Backup,
};
