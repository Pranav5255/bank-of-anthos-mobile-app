// Theme constants for the Bank of Anthos mobile app

export const colors = {
  primary: '#1976D2',       // Primary brand color
  primaryDark: '#0D47A1',   // Darker variant of primary
  primaryLight: '#BBDEFB',  // Lighter variant of primary
  accent: '#FF4081',        // Accent color for highlights
  success: '#4CAF50',       // Success color for confirmations
  error: '#F44336',         // Error color for alerts
  warning: '#FFC107',       // Warning color for cautions
  info: '#2196F3',          // Info color for notifications
  text: '#212121',          // Primary text color
  textSecondary: '#757575', // Secondary text color
  background: '#FFFFFF',    // Background color
  surface: '#F5F5F5',       // Surface color for cards
  border: '#E0E0E0',        // Border color
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System-Medium',
    bold: 'System-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

export default {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
};