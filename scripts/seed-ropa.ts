import "reflect-metadata";
import { AppDataSource } from "../lib/typeorm-data-source";
import { RopaRecord } from "../lib/entity/RopaRecord";

async function seedRopa() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(RopaRecord);
  const records = [
    {
      activityName: 'Employee Data Management',
      department: 'HR',
      businessUnit: 'Corporate',
      dataController: 'Magic Software (Thailand) Corp., Ltd.',
      contactPerson: 'Somchai Jaidee',
      contactEmail: 'somchai.j@magicsoftware.co.th',
      dataGroups: 'Employee,Staff',
      purposes: 'Payroll,HR',
      retentionPeriod: '5',
    },
    {
      activityName: 'Customer Data Analytics',
      department: 'Marketing',
      businessUnit: 'Corporate',
      dataController: 'Magic Software (Thailand) Corp., Ltd.',
      contactPerson: 'Nattapong Suksan',
      contactEmail: 'nattapong.s@magicsoftware.co.th',
      dataGroups: 'Customer',
      purposes: 'Analytics,Marketing',
      retentionPeriod: '3',
    },
    {
      activityName: 'Supplier Management',
      department: 'Procurement',
      businessUnit: 'Operations',
      dataController: 'Magic Software (Thailand) Corp., Ltd.',
      contactPerson: 'Suda Chaiyo',
      contactEmail: 'suda.c@magicsoftware.co.th',
      dataGroups: 'Supplier',
      purposes: 'Supplier Management',
      retentionPeriod: '7',
    },
    {
      activityName: 'IT Asset Tracking',
      department: 'IT',
      businessUnit: 'Support',
      dataController: 'Magic Software (Thailand) Corp., Ltd.',
      contactPerson: 'Prasit Tech',
      contactEmail: 'prasit.t@magicsoftware.co.th',
      dataGroups: 'Employee,Asset',
      purposes: 'Asset Tracking',
      retentionPeriod: '2',
    },
    {
      activityName: 'User Access Review',
      department: 'IT',
      businessUnit: 'Support',
      dataController: 'Magic Software (Thailand) Corp., Ltd.',
      contactPerson: 'Kanya Wong',
      contactEmail: 'kanya.w@magicsoftware.co.th',
      dataGroups: 'Employee,User',
      purposes: 'Access Review',
      retentionPeriod: '1',
    },
  ];
  await repo.save(records);
  console.log('Inserted 5 demo ROPA records');
  await AppDataSource.destroy();
}

seedRopa().catch((err) => {
  console.error(err);
  process.exit(1);
});
