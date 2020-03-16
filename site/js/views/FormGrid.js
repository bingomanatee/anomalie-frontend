import styled from 'styled-components';

const FormGrid = styled.section`
  display: grid;
  grid-gap: 0.5rem 0.5rem;
  grid-template-columns: [form-row] minmax(10rem,25%) [data] 1fr [form-row-end];
  grid-template-rows: repeat(auto, minmax(200px,1fr));
  width: 100%;
`;
export default FormGrid;
