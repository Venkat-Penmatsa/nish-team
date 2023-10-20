import { NavItem } from './nav-item';

export let menu: NavItem[] = [
  {
    displayName: 'ADMINSTRATION',
    iconName: 'dashboard',
    route: 'dashboard',
    role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
  },
  {
    displayName: 'Employee',
    iconName: 'face',
    route: 'employee',
    role: ['contract', 'admin', 'hr', 'finance'],
    children: [
      {
        displayName: 'Manage Employees',
        iconName: 'person',
        route: 'employee/NewEmployee',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'All Employees',
        iconName: 'groups',
        route: 'employee/allEmployees',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Batch Upload',
        iconName: 'person_search',
        route: 'employee/empManagement',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
    ],
  },
  {
    displayName: 'Simulation',
    iconName: 'business',
    route: 'contracts',
    role: ['admin', 'recruiter'],
    children: [
      {
        displayName: 'Simulation',
        iconName: 'list_alt',
        route: 'finance/simulation',
        role: ['admin', 'recruiter'],
      },
    ],
  },
  {
    displayName: 'Finance',
    iconName: 'business',
    route: 'contracts',
    role: ['admin', 'finance'],
    children: [
      {
        displayName: 'Employee Outlay',
        iconName: 'list',
        route: 'finance/empOffer',
        role: ['admin', 'finance'],
      },
      {
        displayName: 'Employee Yearly Report',
        iconName: 'list',
        route: 'finance/empYearlyReport',
        role: ['admin', 'finance'],
      },
      {
        displayName: 'Revenue Report',
        iconName: 'business',
        route: 'finance/revenueReport',
        role: ['admin', 'finance'],
      },
      {
        displayName: 'Simulation',
        iconName: 'list_alt',
        route: 'finance/simulation',
        role: ['admin', 'finance'],
      },
    ],
  },
  {
    displayName: 'Contracts',
    iconName: 'business',
    route: 'contracts',
    role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
    children: [
      {
        displayName: 'Manage Contracts',
        iconName: 'add_business',
        route: 'contracts/newContract',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'All Contracts',
        iconName: 'list',
        route: 'contracts/allContracts',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Manage Customer',
        iconName: 'add_business',
        route: 'client/manageClient',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'All Customers',
        iconName: 'list',
        route: 'client/allClients',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
    ],
  },
  {
    displayName: 'HR',
    iconName: 'manage_accounts',
    route: 'hr',
    role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
    children: [
      {
        displayName: 'Apply Leaves',
        iconName: 'person_off',
        route: 'hr/applyLeaves',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Monthly Leaves Report',
        iconName: 'person_off',
        route: 'hr/leavesBalence',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Update Leaves',
        iconName: 'timer',
        route: 'hr/updateLeaves',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Monthly Timesheet',
        iconName: 'calendar_view_month',
        route: 'hr/monthlyTimesheet',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Yearly Timesheet',
        iconName: 'timer',
        route: 'hr/yearlyTimesheet',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      } /*,
      {
        displayName: 'Monthly TimeSheet Report',
        iconName: 'report',
        route: 'hr/generateMontlyTimeSheetReports',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Contract Based Monthly TimeSheet',
        iconName: 'report',
        route: 'hr/generateContractBasedTimeSheetReport',
        role:['All','Admin','HR','Finance'],
      }*/,
      {
        displayName: 'Leaves Generation Batch',
        iconName: 'list_alt',
        route: 'hr/batchJob',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
    ],
  },
  {
    displayName: 'Emp TimeSheet',
    iconName: 'access_time',
    route: 'emptimesheet',
    role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
    children: [
      {
        displayName: 'Fill Timesheet',
        iconName: 'timer',
        route: 'emptimesheet/filltimesheet',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'All Emp TimeSheet Report',
        iconName: 'select_all',
        route: 'emptimesheet/allemptimesheet',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
    ],
  } /*
  {
    displayName: 'Notification',
    iconName: 'access_time',
    route: 'notification',
    role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
    children: [
      {
        displayName: 'New Notification',
        iconName: 'timer',
        route: 'notification/newNotification',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'All Notification',
        iconName: 'select_all',
        route: 'notification/allNotification',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
    ],
  },*/,
  {
    displayName: 'Mobility',
    iconName: 'card_travel',
    route: 'mobility',
    role: ['contract', 'admin', 'hr'],
    children: [
      {
        displayName: 'Manage Mobility',
        iconName: 'directions_railway',
        route: 'mobility/manageMobility',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Monthly Mobility',
        iconName: 'shopping_cart',
        route: 'mobility/monthMobility',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Monthly Mobility Report',
        iconName: 'list',
        route: 'mobility/mobilityReport',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Mobility Batch',
        iconName: 'list_alt',
        route: 'mobility/mobilityBatch',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
    ],
  },
  {
    displayName: 'Assets',
    iconName: 'web_asset',
    route: 'assets',
    role: ['contract', 'admin', 'hr'],
    children: [
      {
        displayName: 'New Asset',
        iconName: 'add',
        route: 'assets/newAsset',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'All Assets',
        iconName: 'list',
        route: 'assets/allAssets',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Update Asset',
        iconName: 'security_update_good',
        route: 'assets/updateAssets',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Asset History',
        iconName: 'history',
        route: 'assets/assetHistory',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
    ],
  },
  {
    displayName: 'Documents',
    iconName: 'file_copy',
    route: 'document',
    role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
    children: [
      {
        displayName: 'Manage Documents',
        iconName: 'attach_file',
        route: 'document/manageDocuments',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
    ],
  },
  {
    displayName: 'User Management',
    iconName: 'settings',
    route: 'user',
    role: ['contract', 'admin', 'hr', 'finance'],
    children: [
      {
        displayName: 'Manage User',
        iconName: 'person_add',
        route: 'user/newUser',
        role: ['admin', 'finance'],
      },
      {
        displayName: 'Users List',
        iconName: 'people',
        route: 'user/usersList',
        role: ['contract', 'admin', 'hr', 'finance'],
      },
      {
        displayName: 'Manage Employees',
        iconName: 'people',
        route: 'user/empManage',
        role: ['contract', 'admin', 'hr'],
      },
    ],
  },
];
