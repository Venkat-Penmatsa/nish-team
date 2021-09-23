export interface NavItem {
    displayName: string;
    role: string[],
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: NavItem[];
  }