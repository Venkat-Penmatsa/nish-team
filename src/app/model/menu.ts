import { NavItem } from './nav-item';

export let menu: NavItem[] = [
  {
    displayName: 'ADMINSTRATION',
    iconName: 'admin_panel_settings', // More specific icon for admin settings
    route: 'dashboard',
    role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
  },
  {
    displayName: 'Employee',
    iconName: 'group', // Represents a group of people/employees
    route: 'employee',
    role: ['contract', 'admin', 'hr', 'finance'],
    children: [
      {
        displayName: 'Manage Employees',
        iconName: 'person_add', // Icon for adding/managing individuals
        route: 'employee/NewEmployee',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'All Employees',
        iconName: 'groups', // Represents the entire group
        route: 'employee/allEmployees',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Employee OffBoarding',
        iconName: 'person_remove', // A clear icon for removing a person
        route: 'employee/empOffBoarding',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Batch Upload',
        iconName: 'cloud_upload', // Standard icon for uploading files
        route: 'employee/empManagement',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
    ],
  },
  {
    displayName: 'Simulation',
    iconName: 'data_usage', // Represents data or a simulation process
    route: 'contracts',
    role: ['admin', 'recruiter'],
    children: [
      {
        displayName: 'Simulation',
        iconName: 'scatter_plot', // A graph-like icon for simulation/data
        route: 'finance/simulation',
        role: ['admin', 'recruiter'],
      },
    ],
  },
  {
    displayName: 'Finance',
    iconName: 'account_balance', // Represents finance/banking
    route: 'contracts',
    role: ['admin', 'finance'],
    children: [
      {
        displayName: 'Employee Outlay',
        iconName: 'payments', // Icon for payments or outlays
        route: 'finance/empOffer',
        role: ['admin', 'finance'],
      },
      {
        displayName: 'Employee Yearly Report',
        iconName: 'analytics', // Standard icon for a report with analytics
        route: 'finance/empYearlyReport',
        role: ['admin', 'finance'],
      },
      {
        displayName: 'Revenue Report',
        iconName: 'paid', // An icon representing revenue or being paid
        route: 'finance/revenueReport',
        role: ['admin', 'finance'],
      },
      {
        displayName: 'Simulation',
        iconName: 'scatter_plot', // A graph-like icon for simulation/data
        route: 'finance/simulation',
        role: ['admin', 'finance'],
      },
    ],
  },
  {
    displayName: 'Contracts',
    iconName: 'work', // Represents contracts or business work
    route: 'contracts',
    role: ['contract', 'admin', 'hr', 'finance'],
    children: [
      {
        displayName: 'Manage Contracts',
        iconName: 'assignment', // Icon for managing assignments/contracts
        route: 'contracts/newContract',
        role: ['contract', 'admin', 'hr', 'finance'],
      },
      {
        displayName: 'All Contracts',
        iconName: 'fact_check', // A list with checkmark for all contracts
        route: 'contracts/allContracts',
        role: ['contract', 'admin', 'hr', 'finance'],
      },
      {
        displayName: 'Manage Customer',
        iconName: 'diversity_3', // Represents managing a diverse group of customers
        route: 'client/manageClient',
        role: ['contract', 'admin', 'hr', 'finance'],
      },
      {
        displayName: 'All Customers',
        iconName: 'people', // Represents all people/customers
        route: 'client/allClients',
        role: ['contract', 'admin', 'hr', 'finance'],
      },
      {
        displayName: 'Contract Report',
        iconName: 'description', // Standard icon for a document or report
        route: 'contracts/contractReport',
        role: ['contract', 'admin', 'hr', 'finance'],
      },
    ],
  },
  {
    displayName: 'HR',
    iconName: 'handshake', // Represents a human resources handshake/agreement
    route: 'hr',
    role: ['contract', 'admin', 'hr', 'finance'],
    children: [
      {
        displayName: 'Apply Leaves',
        iconName: 'flight_takeoff', // A plane icon for taking time off
        route: 'hr/applyLeaves',
        role: ['contract', 'admin', 'hr', 'finance'],
      },
      {
        displayName: 'Monthly Leaves Report',
        iconName: 'calendar_month', // A calendar icon for a monthly report
        route: 'hr/leavesBalence',
        role: ['contract', 'admin', 'hr', 'finance'],
      },
      {
        displayName: 'Update Leaves',
        iconName: 'event_note', // Represents notes on an event/leave
        route: 'hr/updateLeaves',
        role: ['contract', 'admin', 'hr', 'finance'],
      },
      {
        displayName: 'Monthly Timesheet',
        iconName: 'calendar_month', // A calendar for monthly tracking
        route: 'hr/monthlyTimesheet',
        role: ['contract', 'admin', 'hr', 'finance'],
      },
      {
        displayName: 'Yearly Timesheet',
        iconName: 'event_note', // A more generic note icon for a yearly sheet
        route: 'hr/yearlyTimesheet',
        role: ['contract', 'admin', 'hr', 'finance'],
      },
      {
        displayName: 'Leaves Generation Batch',
        iconName: 'batch_prediction', // Represents a batch or process
        route: 'hr/batchJob',
        role: ['contract', 'admin', 'hr', 'finance'],
      },
    ],
  },
  {
    displayName: 'Emp TimeSheet',
    iconName: 'access_time', // Standard for time-related tasks
    route: 'emptimesheet',
    role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
    children: [
      {
        displayName: 'Fill Timesheet',
        iconName: 'edit_calendar', // An icon for filling/editing a calendar
        route: 'emptimesheet/filltimesheet',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'All Emp TimeSheet Report',
        iconName: 'bar_chart', // A chart for a report
        route: 'emptimesheet/allemptimesheet',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
    ],
  },
  {
    displayName: 'Invoice',
    iconName: 'receipt_long', // Represents a receipt or invoice
    route: 'invoice',
    role: ['admin', 'finance', 'timesheet'],
    children: [
      {
        displayName: 'Invoice Sequence',
        iconName: 'auto_mode', // Represents an automated sequence
        route: 'invoice/invoice',
        role: ['admin', 'finance', 'timesheet'],
      },
      {
        displayName: 'Invoice Report',
        iconName: 'description', // Standard for a document or report
        route: 'invoice/invoiceReport',
        role: ['admin', 'finance', 'timesheet'],
      },
      {
        displayName: 'Invoice Details',
        iconName: 'list_alt', // A checklist icon for details
        route: 'invoice/invoiceDetails',
        role: ['admin', 'finance', 'timesheet'],
      },
    ],
  },
  {
    displayName: 'Mobility',
    iconName: 'directions_car', // A car icon for mobility/travel
    route: 'mobility',
    role: ['contract', 'admin', 'hr'],
    children: [
      {
        displayName: 'Manage Mobility',
        iconName: 'map', // A map icon for managing routes
        route: 'mobility/manageMobility',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Monthly Mobility',
        iconName: 'calendar_month', // Calendar for monthly details
        route: 'mobility/monthMobility',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Monthly Mobility Report',
        iconName: 'description', // A document for the report
        route: 'mobility/mobilityReport',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Mobility Batch',
        iconName: 'batch_prediction', // Batch process icon
        route: 'mobility/mobilityBatch',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
    ],
  },
  {
    displayName: 'Assets',
    iconName: 'category', // A box/category icon for assets
    route: 'assets',
    role: ['contract', 'admin', 'hr'],
    children: [
      {
        displayName: 'New Asset',
        iconName: 'add_box', // An icon for adding a new asset/item
        route: 'assets/newAsset',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'All Assets',
        iconName: 'inventory_2', // A box with contents for all assets
        route: 'assets/allAssets',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Update Asset',
        iconName: 'published_with_changes', // An icon for updating or changes
        route: 'assets/updateAssets',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
      {
        displayName: 'Asset History',
        iconName: 'history', // The standard icon for history
        route: 'assets/assetHistory',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
    ],
  },
  {
    displayName: 'Documents',
    iconName: 'folder_shared', // A folder icon for documents
    route: 'document',
    role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
    children: [
      {
        displayName: 'Manage Documents',
        iconName: 'upload_file', // A clear icon for managing/uploading documents
        route: 'document/manageDocuments',
        role: ['contract', 'admin', 'hr', 'finance', 'timesheet'],
      },
    ],
  },
  {
    displayName: 'User Management',
    iconName: 'manage_accounts', // A specific icon for managing user accounts
    route: 'user',
    role: ['contract', 'admin', 'hr', 'finance'],
    children: [
      {
        displayName: 'Manage User',
        iconName: 'person_add', // Represents adding/managing an individual user
        route: 'user/newUser',
        role: ['admin', 'finance'],
      },
      {
        displayName: 'Users List',
        iconName: 'people', // Represents a list of people/users
        route: 'user/usersList',
        role: ['contract', 'admin', 'hr', 'finance'],
      },
      {
        displayName: 'Manage Employees',
        iconName: 'group', // Represents a group of employees to manage
        route: 'user/empManage',
        role: ['contract', 'admin', 'hr'],
      },
    ],
  },
];
