import { NavItem } from './nav-item';

export let menu: NavItem[] = [
  {
    displayName: 'ADMINSTRATION',
    iconName: 'dashboard',
    route: 'dashboard',
    role:['All','Admin','HR','Finance'],
  },
  {
    displayName: 'Employee',
    iconName: 'face',
    route: 'employee',
    role:['All'],
    children: [
      {
        displayName: 'Manage Employees',
        iconName: 'person',
        route: 'employee/NewEmployee',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'All Employees',
        iconName: 'groups',
        route: 'employee/allEmployees',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Batch Upload',
        iconName: 'person_search',
        route: 'employee/empManagement',
        role:['All','Admin','HR','Finance'],
      }
    ]
  },
  {
    displayName: 'Finance',
    iconName: 'business',
    route: 'contracts',
    role:['All','Admin','HR','Finance'],
    children: [
      {
        displayName: 'Manage Contracts',
        iconName: 'add_business',
        route: 'contracts/newContract',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'All Contracts',
        iconName: 'list',
        route: 'contracts/allContracts',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Employee Outlay',
        iconName: 'list',
        route: 'finance/empOffer',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Employee Yearly Report',
        iconName: 'list',
        route: 'finance/empYearlyReport',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Simulation',
        iconName: 'list_alt',
        route: 'finance/simulation',
        role:['All','Admin','HR','Finance'],
      }
    ]
  },
  {
    displayName: 'HR',
    iconName: 'manage_accounts',
    route: 'hr',
    role:['All','Admin','HR','Finance'],
    children: [
      {
        displayName: 'Apply Leaves',
        iconName: 'person_off',
        route: 'hr/applyLeaves',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Monthly Leaves Report',
        iconName: 'person_off',
        route: 'hr/leavesBalence',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Update Leaves',
        iconName: 'timer',
        route: 'hr/updateLeaves',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Monthly Timesheet',
        iconName: 'calendar_view_month',
        route: 'hr/monthlyTimesheet',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Yearly Timesheet',
        iconName: 'timer',
        route: 'hr/yearlyTimesheet',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Monthly TimeSheet Report',
        iconName: 'report',
        route: 'hr/generateMontlyTimeSheetReports',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Leaves Generation Batch',
        iconName: 'list_alt',
        route: 'hr/batchJob',
        role:['All','Admin','HR','Finance'],
      }
    ]
  }/*,
  {
    displayName: 'Emp TimeSheet',
    iconName: 'access_time',
    route: 'emptimesheet',
    role:['All','Admin'],
    children: [
      {
        displayName: 'Fill Timesheet',
        iconName: 'timer',
        route: 'emptimesheet/filltimesheet',
        role:['All','Admin'],
      },
      {
        displayName: 'All Emp TimeSheet Report',
        iconName: 'select_all',
        route: 'emptimesheet/allemptimesheet',
        role:['All','Admin'],
      }
    ]
  }*/,
  {
    displayName: 'Assets',
    iconName: 'web_asset',
    route: 'assets',
    role:['All','Admin','HR','Finance'],
    children: [
      {
        displayName: 'New Asset',
        iconName: 'add',
        route: 'assets/newAsset',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'All Assets',
        iconName: 'list',
        route: 'assets/allAssets',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Update Asset',
        iconName: 'security_update_good',
        route: 'assets/updateAssets',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Asset History',
        iconName: 'history',
        route: 'assets/assetHistory',
        role:['All','Admin','HR','Finance'],
      }
    ]
  },
  {
    displayName: 'Documents',
    iconName: 'file_copy',
    route: 'document',
    role:['All','Admin'],
    children: [
      {
        displayName: 'Manage Documents',
        iconName: 'attach_file',
        route: 'document/manageDocuments',
        role:['All','Admin'],
      }
    ]
  },
  {
    displayName: 'User Management',
    iconName: 'settings',
    route: 'user',
    role:['All','Admin'],
    children: [
      {
        displayName: 'Manage User',
        iconName: 'person_add',
        route: 'user/newUser',
        role:['All','Admin'],
      },
      {
        displayName: 'Users List',
        iconName: 'people',
        route: 'user/usersList',
        role:['All','Admin'],
      }
    ]
  }
]