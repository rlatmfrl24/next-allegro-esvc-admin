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
  uuid: string;
  type: EmailType;
  template: string;
  title: string;
  senderName: string;
  senderEmail: string;
}

export interface EmailSendingHistoryProps {
  uuid: string;
  sentDate: DateTime;
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
  uuid: string;
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
