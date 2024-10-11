export class Notification {
    constructor(
      public id: string,
      public phoneNumber: string,
      public message: string,
      public status: string,
      public sid?: string,
      public dateSent?: Date,
      public error?: string,
    ) {}
  }
  