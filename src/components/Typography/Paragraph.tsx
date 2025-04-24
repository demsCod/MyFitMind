import { Text, TextProps } from 'react-native';
import { cn } from '../../utils/cn';

export default function Paragraph({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn(
        "text-secondary font-body",
        className
      )}
      {...props}
    />
  );
}
