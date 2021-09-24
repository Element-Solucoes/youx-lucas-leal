import styled from 'styled-components';
import { DefaultContainer } from './DefaultContainer';

// Um container exclusivo para a dashboard.

export const DashboardContainer = styled(DefaultContainer)`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
  position: relative;
  z-index: 2;
  background-color: white;
  padding: 2em;
`;
