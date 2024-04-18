import { AdminUserProps, AdminUserStatus } from "@/util/typeDef/user";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

function createDummaryAdminUser(): AdminUserProps {
  return {
    uuid: faker.string.uuid(),
    userId: faker.internet.userName(),
    email: faker.internet.email(),
    updatedAt: DateTime.fromJSDate(faker.date.recent()),
    userName: faker.person.fullName(),
    office: faker.string.alphanumeric(5).toUpperCase(),
    status: faker.helpers.enumValue(AdminUserStatus),
    noficication: {
      booking: faker.datatype.boolean(),
      si: faker.datatype.boolean(),
      officeNotification: faker.helpers.arrayElements([
        "Seoul",
        "Busan",
        "Incheon",
        "Vietnam",
        "Singapore",
      ]),
    },
    authorization: {
      userManagement: {
        customerUser: faker.datatype.boolean(),
      },
      noticeManagement: {
        notice: faker.datatype.boolean(),
        regionalContactPerson: faker.datatype.boolean(),
      },
      notificationSetup: {
        emailSetting: faker.datatype.boolean(),
        emailSendingSummary: faker.datatype.boolean(),
        officeGroupEmailSetting: faker.datatype.boolean(),
      },
    },
  };
}

export const AdminUserTable = () => {};
