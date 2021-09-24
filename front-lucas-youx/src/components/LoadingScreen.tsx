import { LoadingScreenProps } from '../interfaces/LoadingScreenProps';
import { LoadingWrapper } from '../styled-components/containers/LoadingWrapper';

export function LoadingScreen(props: LoadingScreenProps): JSX.Element {
  // Serve uma tela de loading padrão para o sistema.
  return props.shown ? (
    <LoadingWrapper>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoadingWrapper>
  ) : (
    <></>
  );
}
