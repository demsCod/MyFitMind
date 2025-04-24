import { Text, TextProps } from 'react-native';
import { cn } from '../../utils/cn';

export default function Title({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn(
        "text-xl font-body-semibold",
        className
      )}
      {...props}
    />
  );
}
