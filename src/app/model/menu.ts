import { NavItem } from './nav-item';

export let menu: NavItem[] = [
  {
    displayName: 'ADMINSTRATION',
    iconName: 'dashboard',
    route: 'dashboard'
  },
  {
    displayName: 'Employee',
    iconName: 'face',
    route: 'employee',
    children: [
      {
        displayName: 'New Employee',
        iconName: 'person',
        route: 'employee/NewEmployee'
      },
      {
        displayName: 'All Employees',
        iconName: 'groups',
        route: 'employee/allEmployees'
      },
      {
        displayName: 'Search Employee',
        iconName: 'person_search',
        route: 'employee/searchEmployee'
      },
      {
        displayName: 'Skills',
        iconName: 'engineering',
        route: 'employee/skills'
      },
      {
        displayName: 'Reports',
        iconName: 'list_alt',
        route: 'employee/reports'
      }
    ]
  },
  {
    displayName: 'Contracts',
    iconName: 'business',
    route: 'contracts',
    children: [
      {
        displayName: 'New Contract',
        iconName: 'add_business',
        route: 'contracts/newContract'
      },
      {
        displayName: 'All Contracts',
        iconName: 'business_center',
        route: 'contracts/allContracts'
      },
      {
        displayName: 'Reports',
        iconName: 'list_alt',
        route: 'contracts/reports'
      }
    ]
  },
  {
    displayName: 'HR',
    iconName: 'manage_accounts',
    route: 'hr',
    children: [
      {
        displayName: 'Apply Leaves',
        iconName: 'person_off',
        route: 'hr/applyLeaves'
      },
      {
        displayName: 'Leaves Balence',
        iconName: 'person_off',
        route: 'hr/leavesBalence'
      },
      {
        displayName: 'Fill Timesheet',
        iconName: 'timer',
        route: 'hr/timesheet'
      },
      {
        displayName: 'Monthly Timesheet',
        iconName: 'timer',
        route: 'hr/monthlyTimesheet'
      },
      {
        displayName: 'Yearly Timesheet',
        iconName: 'timer',
        route: 'hr/yearlyTimesheet'
      },
      {
        displayName: 'Report',
        iconName: 'list_alt',
        route: 'hr/generateReports'
      }
    ]
  },
  {
    displayName: 'Assets',
    iconName: 'manage_accounts',
    route: 'assets',
    children: [
      {
        displayName: 'New Asset',
        iconName: 'person_off',
        route: 'assets/newAsset'
      },
      {
        displayName: 'All Assets',
        iconName: 'person_off',
        route: 'assets/allAssets'
      },
      {
        displayName: 'Update Asset',
        iconName: 'timer',
        route: 'assets/updateAssets'
      },
      {
        displayName: 'Asset History',
        iconName: 'list_alt',
        route: 'assets/assetHistory'
      }
    ]
  }
]