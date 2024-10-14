export class CreateCohortDto {
    readonly name: string;
    readonly programId: string; // Foreign key reference to a program
    readonly startDate: string;
    readonly endDate: string;
  }
  