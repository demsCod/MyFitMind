import { Text, TextProps } from 'react-native';
import { cn } from '../../utils/cn';

export default function Subtitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn(
        "text-grey text-xl font-body",
        className
      )}
      {...props}
    />
  );
}
