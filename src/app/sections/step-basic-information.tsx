"use client";

import { useEffect, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { DividerComponent } from "@/app/components/divider";
import NAMultiAutoComplete from "@/app/components/na-multi-autocomplete";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { CurrentCompanyState } from "@/store/super.store";
import { CompanyType } from "@/util/typeDef/super";
import { faker } from "@faker-js/faker";
import { DateRangePicker } from "../components/datepicker/date-range-picker";
import { modifiedDetectState } from "@/store/base.store";
import { DateTime } from "luxon";

export default function BasicInformationStep() {
  const [currentCompanyStore, setCurrentCompanyStore] =
    useRecoilState(CurrentCompanyState);
  const modifiedDetect = useSetRecoilState(modifiedDetectState);
  const tempCompanyList = useMemo(() => {
    return Array.from(
      { length: 100 },
      (_, i) =>
        ({
          companyCode: faker.string.alphanumeric(5).toUpperCase(),
          companyName: faker.company.name(),
          urlContextPath: "",
          representative: faker.person.fullName(),
          location: faker.location.country(),
          locationDetail: faker.lorem.sentence(),
          faxNumber: faker.phone.number(),
          telNumber: faker.phone.number(),
          address:
            faker.location.streetAddress() +
            faker.location.city() +
            faker.location.state(),
          zipCode: faker.location.zipCode(),
          email: faker.internet.email(),
        } as CompanyType)
    );
  }, []);

  useEffect(() => {
    modifiedDetect(false);
  }, [modifiedDetect]);

  return (
    <>
      <div className="flex gap-2">
        <NAMultiAutoComplete
          className="w-80"
          label="Company Name"
          initialValue={{
            label: currentCompanyStore.basicInformation.companyName || "",
            value: currentCompanyStore.basicInformation.address || "",
          }}
          required
          itemList={tempCompanyList.map((company) => {
            return { label: company.companyName, value: company.address };
          })}
          onItemSelection={(item) => {
            const selected = tempCompanyList.find(
              (company) => company.companyName === item.label
            );
            if (!selected) {
              modifiedDetect(false);
              setCurrentCompanyStore({
                ...currentCompanyStore,
                basicInformation: {
                  ...currentCompanyStore.basicInformation,
                  companyName: "",
                  companyCode: "",
                },
              });
            } else {
              modifiedDetect(true);
              setCurrentCompanyStore({
                ...currentCompanyStore,
                basicInformation: {
                  ...currentCompanyStore.basicInformation,
                  ...selected,
                },
              });
            }
          }}
        />
        <NAOutlinedTextField
          label="Full Name"
          readOnly
          value={currentCompanyStore.basicInformation.companyName || ""}
        />
        <NAOutlinedTextField
          label="Company Code"
          readOnly
          className="w-80"
          value={currentCompanyStore.basicInformation.companyCode || ""}
        />
        <NAOutlinedTextField
          required
          label="URL Context Path"
          className="flex-1"
          value={currentCompanyStore.basicInformation.urlContextPath || ""}
          handleValueChange={(value) => {
            // check value is changed
            if (value === currentCompanyStore.basicInformation.urlContextPath) {
              return;
            }
            modifiedDetect(true);
            setCurrentCompanyStore({
              ...currentCompanyStore,
              basicInformation: {
                ...currentCompanyStore.basicInformation,
                urlContextPath: value,
              },
            });
          }}
        />
      </div>
      <DividerComponent className="border-dotted my-2" />
      <div className="flex">
        <DateRangePicker
          className="w-80"
          initial={{
            start: currentCompanyStore.basicInformation.effectiveDate?.[0],
            end: currentCompanyStore.basicInformation.effectiveDate?.[1],
          }}
          onDateChange={(dateRange) => {
            if (
              dateRange.start ===
                currentCompanyStore.basicInformation.effectiveDate?.[0] &&
              dateRange.end ===
                currentCompanyStore.basicInformation.effectiveDate?.[1]
            ) {
              return;
            }

            modifiedDetect(true);
            setCurrentCompanyStore({
              ...currentCompanyStore,
              basicInformation: {
                ...currentCompanyStore.basicInformation,
                effectiveDate: [dateRange.start!, dateRange.end!],
              },
            });
          }}
        />
      </div>
      <div className="flex gap-2">
        <NAOutlinedTextField
          label="Representative"
          className="mr-2 w-80"
          value={currentCompanyStore.basicInformation.representative || ""}
          handleValueChange={(value) => {
            if (value === currentCompanyStore.basicInformation.representative) {
              return;
            }

            modifiedDetect(true);
            setCurrentCompanyStore({
              ...currentCompanyStore,
              basicInformation: {
                ...currentCompanyStore.basicInformation,
                representative: value,
              },
            });
          }}
        />
        <NAOutlinedTextField
          label="Location"
          className="w-80"
          value={currentCompanyStore.basicInformation.location || ""}
          handleValueChange={(value) => {
            if (value === currentCompanyStore.basicInformation.location) {
              return;
            }

            modifiedDetect(true);
            setCurrentCompanyStore({
              ...currentCompanyStore,
              basicInformation: {
                ...currentCompanyStore.basicInformation,
                location: value,
              },
            });
          }}
        />
        <NAOutlinedTextField
          label="Location Detail"
          className="w-96"
          value={currentCompanyStore.basicInformation.locationDetail || ""}
          handleValueChange={(value) => {
            if (value === currentCompanyStore.basicInformation.locationDetail) {
              return;
            }

            modifiedDetect(true);
            setCurrentCompanyStore({
              ...currentCompanyStore,
              basicInformation: {
                ...currentCompanyStore.basicInformation,
                locationDetail: value,
              },
            });
          }}
        />
      </div>
      <div className="flex gap-4">
        <NAOutlinedTextField
          label="Fax Number"
          className="w-80"
          value={currentCompanyStore.basicInformation.faxNumber || ""}
          handleValueChange={(value) => {
            if (value === currentCompanyStore.basicInformation.faxNumber) {
              return;
            }

            modifiedDetect(true);
            setCurrentCompanyStore({
              ...currentCompanyStore,
              basicInformation: {
                ...currentCompanyStore.basicInformation,
                faxNumber: value,
              },
            });
          }}
        />
        <NAOutlinedTextField
          label="Tel Number"
          className="w-80"
          value={currentCompanyStore.basicInformation.telNumber || ""}
          handleValueChange={(value) => {
            if (value === currentCompanyStore.basicInformation.telNumber) {
              return;
            }

            modifiedDetect(true);
            setCurrentCompanyStore({
              ...currentCompanyStore,
              basicInformation: {
                ...currentCompanyStore.basicInformation,
                telNumber: value,
              },
            });
          }}
        />
      </div>
      <div className="flex gap-2">
        <NAOutlinedTextField
          label="Address"
          className="w-[655px]"
          value={currentCompanyStore.basicInformation.address || ""}
          handleValueChange={(value) => {
            if (value === currentCompanyStore.basicInformation.address) {
              return;
            }

            modifiedDetect(true);
            setCurrentCompanyStore({
              ...currentCompanyStore,
              basicInformation: {
                ...currentCompanyStore.basicInformation,
                address: value,
              },
            });
          }}
        />
        <NAOutlinedTextField
          label="Zip Code"
          className="w-96"
          value={currentCompanyStore.basicInformation.zipCode || ""}
          handleValueChange={(value) => {
            if (value === currentCompanyStore.basicInformation.zipCode) {
              return;
            }

            modifiedDetect(true);
            setCurrentCompanyStore({
              ...currentCompanyStore,
              basicInformation: {
                ...currentCompanyStore.basicInformation,
                zipCode: value,
              },
            });
          }}
        />
      </div>
      <div className="flex">
        <NAOutlinedTextField
          label="Email"
          className="w-80"
          value={currentCompanyStore.basicInformation.email || ""}
          handleValueChange={(value) => {
            if (value === currentCompanyStore.basicInformation.email) {
              return;
            }

            modifiedDetect(true);
            setCurrentCompanyStore({
              ...currentCompanyStore,
              basicInformation: {
                ...currentCompanyStore.basicInformation,
                email: value,
              },
            });
          }}
        />
      </div>
    </>
  );
}
