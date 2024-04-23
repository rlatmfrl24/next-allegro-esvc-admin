import { DateTime } from "luxon";

export enum EmailType {
  Register = "Register",
  Booking = "Booking",
  SI = "S/I",
  BL = "B/L",
  Vessel = "Vessel",
  Report = "Report",
  Schedule = "Schedule",
  Visibility = "Visibility",
  SystemManagement = "System Management",
}

export interface EmailSettingProps {
  type: EmailType;
  template: string;
  title: string;
  sender: {
    name: string;
    email: string;
  };
}

export interface EmailSendingHistoryProps {
  sender: DateTime;
  type: EmailType;
  title: string;
  userId: string;
  senderEmail: string;
  receiverEmail: string;
  mailKey: string;
}

export interface EmailSendingReportProps {
  sentDate: {
    from: DateTime;
    to: DateTime;
  };
  type: EmailType;
  totalSent: number;
}

export interface OfficeEmailSettingProps {
  officeCode: string;
  officeName: string;
  bookingNotificationReceiver: string;
  siNotificationReceiver: string;
}

export interface OfficeCodeSearchProps {
  officeCode: string;
  officeName: string;
  officeType: string;
  location: string;
  address: string;
}
