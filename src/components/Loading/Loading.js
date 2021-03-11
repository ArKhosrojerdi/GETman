import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/fontawesome-free-solid";
import styled from "styled-components";

const H2 = styled.h4`
  text-align: center;
  font-size: 24px;
  margin: 1rem;
  animation: spin 1s infinite linear;
  
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    
    to {
      transform: rotate(360deg);
    }
  }
`;

const loading = () => {
  return (
    <H2><FontAwesomeIcon icon={faSpinner}/></H2>
  )
}

export default loading;