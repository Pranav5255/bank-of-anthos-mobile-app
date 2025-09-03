import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../utils/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return colors.border;
    
    switch (type) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.accent;
      case 'outline':
        return 'transparent';
      case 'danger':
        return colors.error;
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textSecondary;
    
    switch (type) {
      case 'outline':
        return colors.primary;
      case 'primary':
      case 'secondary':
      case 'danger':
        return colors.background;
      default:
        return colors.background;
    }
  };

  const getBorderColor = () => {
    if (disabled) return colors.border;
    
    switch (type) {
      case 'outline':
        return colors.primary;
      default:
        return 'transparent';
    }
  };

  const getButtonHeight = () => {
    switch (size) {
      case 'small':
        return 32;
      case 'medium':
        return 44;
      case 'large':
        return 56;
      default:
        return 44;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return typography.fontSize.sm;
      case 'medium':
        return typography.fontSize.md;
      case 'large':
        return typography.fontSize.lg;
      default:
        return typography.fontSize.md;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          height: getButtonHeight(),
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: getFontSize(),
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Button;