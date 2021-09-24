import { PopUpHandlerProps } from '../interfaces/PopUpHandlerProps';
import { DefaultButton } from '../styled-components/buttons/DefaultButton';
import { PopUpContainer } from '../styled-components/containers/PopUpContainer';
import { PopUpWrapper } from '../styled-components/containers/PopUpWrapper';

// Cria imediatamente um componente de pop up.
export function PopUpHandler(content: PopUpHandlerProps): JSX.Element {
  return content.shown ? (
    <PopUpWrapper>
      <PopUpContainer>
        <h1>{content.title}</h1>
        {typeof content.text === 'string' ? <p>content.text</p> : content.text}
        <p style={{ textAlign: 'center' }}>
          {content.buttons?.map((button, index) => {
            return (
              <DefaultButton key={index} onClick={button.callback}>
                {button.text}
              </DefaultButton>
            );
          })}
        </p>
      </PopUpContainer>
    </PopUpWrapper>
  ) : (
    <></>
  );
}
