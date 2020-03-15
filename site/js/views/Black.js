import styled from 'styled-components';

export default styled.b`
font-family: "Anomalie Sans Black";
-webkit-user-select: none; /* Safari */
-moz-user-select: none; /* Firefox */
-ms-user-select: none; /* IE10+/Edge */
user-select: none; /* Standard */
outline: none;
tab-index: -1;
${({ color }) => (color ? `color: ${color};` : '')}
`;
