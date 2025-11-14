import { NativeWindStyleSheet } from "nativewind";
import "react-native";

declare module "react-native" {
  interface ViewProps extends NativeWindStyleSheet {}
  interface TextProps extends NativeWindStyleSheet {}
  interface TextInputProps extends NativeWindStyleSheet {}
  interface PressableProps extends NativeWindStyleSheet {}
}
