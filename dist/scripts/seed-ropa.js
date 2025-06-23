var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "reflect-metadata";
import { AppDataSource } from "../lib/typeorm-data-source";
import { RopaRecord } from "../lib/entity/RopaRecord";
function seedRopa() {
    return __awaiter(this, void 0, void 0, function* () {
        yield AppDataSource.initialize();
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
        yield repo.save(records);
        console.log('Inserted 5 demo ROPA records');
        yield AppDataSource.destroy();
    });
}
seedRopa().catch((err) => {
    console.error(err);
    process.exit(1);
});
