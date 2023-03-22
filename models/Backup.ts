export class Backup {
    id: number | null;
    source: string;
    destination: string;
    frequency: string;
    type: string;
  
    constructor({ id = null, source, destination, frequency, type }: Partial<Backup>) {
      this.id = id;
      this.source = source;
      this.destination = destination;
      this.frequency = frequency;
      this.type = type;
    }
  }
  