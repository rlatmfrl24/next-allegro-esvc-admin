import {
  MessageModule,
  MessageProps,
  MessageType,
} from "@/util/typeDef/message";
import { faker } from "@faker-js/faker";

export function createDummyMessageDataset(): MessageProps[] {
  return Array.from({ length: 30 }, (_, index) => ({
    id: faker.string.nanoid(),
    module: faker.helpers.arrayElement(Object.values(MessageModule)),
    type: faker.helpers.arrayElement(Object.values(MessageType)),
    message: faker.lorem.sentence(),
  }));
}
