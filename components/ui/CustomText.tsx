import { Text as DefaultText, TextProps } from 'react-native';

export default function Text(props: TextProps) {
  return (
    <DefaultText
      {...props}
      style={[{ fontFamily: 'Roboto_400Regular' }, props.style]}
    />
  );
}
