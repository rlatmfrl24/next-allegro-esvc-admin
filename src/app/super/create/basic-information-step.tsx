import { MdTypography } from "@/app/components/typography";
import { MdFilledButton } from "@/util/md3";
import { useCallback, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import NAMultiAutoComplete from "@/app/components/na-multi-autocomplete";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { DividerComponent } from "@/app/components/divider";
import { DateTime } from "luxon";

type CompanyType = {
  companyName: string;
  effectiveDate?: [DateTime, DateTime];
  representative: string;
  location: string;
  locationDetail: string;
  faxNumber: string;
  telNumber: string;
  address: string;
  zipCode: string;
  email: string;
};

export default function BasicInformationStep(props: {
  onNextStep: () => void;
}) {
  const tempCompanyList = useMemo(() => {
    return Array.from(
      { length: 100 },
      (_, i) =>
        ({
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

  const [selectedCompany, setSelectedCompany] = useState<CompanyType>();

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
            label: selectedCompany?.companyName || "",
            value: selectedCompany?.address || "",
          }}
          required
          itemList={tempCompanyList.map((company) => {
            return { label: company.companyName, value: company.address };
          })}
          onItemSelection={(item) => {
            setSelectedCompany(
              tempCompanyList.find(
                (company) => company.companyName === item.label
              )
            );
          }}
        />
        <NAOutlinedTextField label="Full Name" readOnly className="flex-1" />
        <NAOutlinedTextField label="Company Code" readOnly className="w-80" />
      </div>
      <DividerComponent className="border-dotted my-2" />
      <div className="flex gap-2">
        <NAOutlinedTextField label="Representative" className="mr-2 w-80" />
        <NAOutlinedTextField label="Location" className="w-80" />
        <NAOutlinedTextField label="Location Detail" className="w-96" />
      </div>
      <div className="flex gap-4">
        <NAOutlinedTextField label="Fax Number" className="w-80" />
        <NAOutlinedTextField label="Tel Number" className="w-80" />
      </div>
      <div className="flex gap-2">
        <NAOutlinedTextField label="Address" className="w-[655px]" />
        <NAOutlinedTextField label="Zip Code" className="w-96" />
      </div>
      <div className="flex">
        <NAOutlinedTextField label="Email" className="w-80" />
      </div>
    </div>
  );
}
