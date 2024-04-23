import { DateTime } from "luxon";

export enum AdminUserType {
  SystemAdmin = "System Admin",
  CompanyAdmin = "Company Admin",
  GeneralStaff = "General Staff",
}

export enum AdminUserStatus {
  Confirm = "Confirm",
  Delete = "Delete",
}

export enum CompanyType {
  ShipperConsignee = "Shipper or Consignee",
  Forwarder = "Freight Forwarder",
  Carrier = "Shipping Carrier",
  TruckRailCompany = "Truck or Rail Company",
  Other = "Other",
}

export enum CustomerUserStatus {
  newRegist = "New Regist",
  update = "Update",
  confirm = "Confirm",
  rejectForRegist = "Reject for Regist",
  rejectForUpdate = "Reject for Update",
  block = "Block",
  withdraw = "Withdraw",
}

export interface UserInterface {
  uuid: string;
  userId: string;
  email: string;
  updatedAt: DateTime;
}

export interface AdminUserProps extends UserInterface {
  userName: string;
  office: string;
  type: AdminUserType;
  status: AdminUserStatus;
  noficication: {
    booking: boolean;
    si: boolean;
    officeNotification: string[];
  };
  authorization: {
    userManagement: {
      customerUser: boolean;
    };
    noticeManagement: {
      notice: boolean;
      regionalContactPerson: boolean;
    };
    notificationSetup: {
      emailSetting: boolean;
      emailSendingSummary: boolean;
      officeGroupEmailSetting: boolean;
    };
  };
}

export interface CustomerUserProps extends UserInterface {
  firstName: string;
  lastName: string;
  lastLoginDate: DateTime | null;
  status: CustomerUserStatus;
  useCustomerCode: "All" | "Yes" | "No";
  customerCode: string;
  companyName: string;
  companyType: CompanyType;
  contactOffice: string;
  tpId: string;
  salesRap: "Import" | "Export" | "Both";
  rateOption: "Basic" | "All" | "Block" | "All Blocked";
  city: string;
  address: string;
  zipCode: string;
  country: string;
  telNumber: string;
  faxNumber: string;
  comment: string;
}
