
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  background: '#f9f9f9',        // Light Gray
  text: '#212121',              // Dark Gray
  textSecondary: '#757575',     // Medium Gray
  primary: '#00308F',           // University of Ghana Blue
  secondary: '#FF6F61',         // Burnt Orange - Accent Color
  accent: '#4CAF50',            // Green - Success/Confirmation
  card: '#FFFFFF',              // White
  highlight: '#FFEB3B',         // Yellow - Important Information
  border: '#E0E0E0',            // Light border color
  shadow: 'rgba(0, 0, 0, 0.1)', // Shadow color
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Extra space for floating tab bar
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: colors.card,
  },
});

export const shadowStyles = {
  small: {
    boxShadow: `0px 1px 3px ${colors.shadow}`,
    elevation: 2,
  },
  medium: {
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 4,
  },
  large: {
    boxShadow: `0px 4px 16px ${colors.shadow}`,
    elevation: 8,
  },
};
