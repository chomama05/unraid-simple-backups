class Backup {
  constructor({ id = null, source, destination, frequency, type }) {
    this.id = id;
    this.source = source;
    this.destination = destination;
    this.frequency = frequency;
    this.type = type;
  }
}

module.exports = {
  Backup,
};
