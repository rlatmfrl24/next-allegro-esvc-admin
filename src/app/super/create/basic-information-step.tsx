import { MdTypography } from "@/app/components/typography";
import { MdFilledButton } from "@/util/md3";
import { useCallback, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import NAMultiAutoComplete from "@/app/components/na-multi-autocomplete";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { DividerComponent } from "@/app/components/divider";
import { CompanyType } from "@/util/typeDef/super";
import { useRecoilState } from "recoil";
import { CurrentCompanyState } from "@/store/super.store";
import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";

export default function BasicInformationStep(props: {
  onNextStep: () => void;
}) {
  const [currentCompanyStore, setCurrentCompanyStore] =
    useRecoilState(CurrentCompanyState);

  const tempCompanyList = useMemo(() => {
    return Array.from(
      { length: 100 },
      (_, i) =>
        ({
          companyCode: faker.string.alphanumeric(5).toUpperCase(),
          companyName: faker.company.name(),
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

  const moveToNextStep = useCallback(() => {
    props.onNextStep();
  }, [props]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <MdTypography variant="title" size="large">
          Basic Information
        </MdTypography>
        <MdFilledButton onClick={moveToNextStep}>Next</MdFilledButton>
      </div>
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
              setCurrentCompanyStore({
                ...currentCompanyStore,
                basicInformation: {
                  ...currentCompanyStore.basicInformation,
                  companyName: "",
                  companyCode: "",
                },
              });
            } else {
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
          className="flex-1"
          value={currentCompanyStore.basicInformation.companyName || ""}
        />
        <NAOutlinedTextField
          label="Company Code"
          readOnly
          className="w-80"
          value={currentCompanyStore.basicInformation.companyCode || ""}
        />
      </div>
      <DividerComponent className="border-dotted my-2" />
      <div className="flex">
        <MdRangeDatePicker
          className="w-80"
          defaultStartDate={
            currentCompanyStore.basicInformation.effectiveDate?.[0]
          }
          defaultEndDate={
            currentCompanyStore.basicInformation.effectiveDate?.[1]
          }
          handleDateRangeSelected={(dateRange) => {
            setCurrentCompanyStore({
              ...currentCompanyStore,
              basicInformation: {
                ...currentCompanyStore.basicInformation,
                effectiveDate: dateRange,
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
    </div>
  );
}
