import { SimpleButtonProps } from './SimpleButtonProps';

export interface PopUpHandlerProps {
  title: string;
  text: string | JSX.Element;
  shown: boolean;
  type: 'ERROR' | 'NORMAL';
  buttons?: [SimpleButtonProps];
}
