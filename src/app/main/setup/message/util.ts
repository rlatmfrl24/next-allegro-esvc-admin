import {
  MessageModule,
  MessageProps,
  MessageType,
} from "@/util/typeDef/message";
import { faker, fakerKO, fakerJA, fakerZH_CN } from "@faker-js/faker";

export function createDummyMessageDataset(): MessageProps[] {
  return Array.from({ length: 30 }, (_, index) => ({
    id: faker.string.alphanumeric(10).toUpperCase(),
    module: faker.helpers.arrayElement(Object.values(MessageModule)),
    type: faker.helpers.arrayElement(Object.values(MessageType)),
    message: {
      en: faker.lorem.sentence(),
      ko: fakerKO.lorem.sentence(),
      ja: fakerJA.lorem.sentence(),
      zh_CN: fakerZH_CN.lorem.sentence(),
    },
  }));
}
