import { Text as DefaultText, TextProps } from 'react-native';
import { FONT } from '@/constants/theme';

export default function Text(props: TextProps) {
  return (
    <DefaultText
      {...props}
      style={[{ fontFamily: FONT.regular }, props.style]}
    />
  );
}
