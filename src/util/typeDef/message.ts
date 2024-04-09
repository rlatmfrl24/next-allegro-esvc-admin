export enum MessageModule {
  ALL_MODULE = "All Module",
  BOOKING = "Booking",
  IMPORT = "Import",
  TRACK_AND_TRACE = "Track & Trace",
  MANAGEMENT_SETUP = "Management Setup",
  DUMRRAGE_AND_DETENTION = "Dumrrage & Detention",
  DOCUMENT = "Document",
}

export enum MessageType {
  SUCCESS = "Success",
  ERROR = "Error",
  WARNING = "Warning",
  CONFIRMATION = "Confirmation",
}

export interface MessageProps {
  module: MessageModule;
  id: string;
  message: {
    en: string;
    ko: string;
    ja: string;
    zh_CN: string;
  };
  type: MessageType;
}
