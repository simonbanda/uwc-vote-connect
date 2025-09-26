// Global type definitions for the UWC Vote Connect application

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'voter' | 'admin' | 'moderator';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Vote {
  id: string;
  userId: string;
  pollId: string;
  optionId: string;
  timestamp: string;
  isAnonymous: boolean;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  createdBy: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  allowAnonymous: boolean;
  maxVotesPerUser: number;
  tags: string[];
}

export interface PollOption {
  id: string;
  text: string;
  voteCount: number;
  percentage: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: any;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface AppConfig {
  name: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  apiUrl: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  userId?: string;
  sessionId?: string;
  timestamp: number;
}

export interface PerformanceMetrics {
  loadTime: number;
  ttfb: number; // Time to First Byte
  fcp: number;  // First Contentful Paint
  lcp: number;  // Largest Contentful Paint
  fid: number;  // First Input Delay
  cls: number;  // Cumulative Layout Shift
  memoryUsage?: {
    used: number;
    total: number;
    limit: number;
  };
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

export interface FormFieldProps extends ComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ComponentType<any>;
  badge?: string | number;
  isActive?: boolean;
  children?: NavigationItem[];
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    muted: string;
    accent: string;
    destructive: string;
    border: string;
  };
  typography: {
    fontFamily: string;
    fontSize: Record<string, string>;
    fontWeight: Record<string, number>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      VITE_SUPABASE_URL?: string;
      VITE_SUPABASE_ANON_KEY?: string;
      VITE_APP_NAME?: string;
      VITE_APP_VERSION?: string;
    }
  }
}

export {};