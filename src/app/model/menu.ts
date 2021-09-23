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
        displayName: 'New Employee',
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
        displayName: 'Search Employee',
        iconName: 'person_search',
        route: 'employee/searchEmployee',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Skills',
        iconName: 'engineering',
        route: 'employee/skills',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Reports',
        iconName: 'list_alt',
        route: 'employee/reports',
        role:['All','Admin','HR','Finance'],
      }
    ]
  },
  {
    displayName: 'Contracts',
    iconName: 'business',
    route: 'contracts',
    role:['All','Admin','HR','Finance'],
    children: [
      {
        displayName: 'New Contract',
        iconName: 'add_business',
        route: 'contracts/newContract',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'All Contracts',
        iconName: 'business_center',
        route: 'contracts/allContracts',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Reports',
        iconName: 'list_alt',
        route: 'contracts/reports',
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
        displayName: 'Leaves Balence',
        iconName: 'person_off',
        route: 'hr/leavesBalence',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Fill Timesheet',
        iconName: 'timer',
        route: 'hr/timesheet',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Monthly Timesheet',
        iconName: 'timer',
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
        displayName: 'Report',
        iconName: 'list_alt',
        route: 'hr/generateReports',
        role:['All','Admin','HR','Finance'],
      }
    ]
  },
  {
    displayName: 'Assets',
    iconName: 'manage_accounts',
    route: 'assets',
    role:['All','Admin','HR','Finance'],
    children: [
      {
        displayName: 'New Asset',
        iconName: 'person_off',
        route: 'assets/newAsset',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'All Assets',
        iconName: 'person_off',
        route: 'assets/allAssets',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Update Asset',
        iconName: 'timer',
        route: 'assets/updateAssets',
        role:['All','Admin','HR','Finance'],
      },
      {
        displayName: 'Asset History',
        iconName: 'list_alt',
        route: 'assets/assetHistory',
        role:['All','Admin','HR','Finance'],
      }
    ]
  },
  {
    displayName: 'User Management',
    iconName: 'manage_accounts',
    route: 'user',
    role:['All','Admin'],
    children: [
      {
        displayName: 'Create New User',
        iconName: 'person_off',
        route: 'user/newUser',
        role:['All','Admin'],
      },
      {
        displayName: 'Users List',
        iconName: 'person_off',
        route: 'user/usersList',
        role:['All','Admin'],
      },
      {
        displayName: 'Manage User',
        iconName: 'person_off',
        route: 'user/manageUser',
        role:['All','Admin'],
      }
    ]
  }
]