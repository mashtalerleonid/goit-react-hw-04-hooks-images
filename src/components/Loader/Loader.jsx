import Spinner from "react-loader-spinner";
import { Container } from "./Loader.styled";

function Loader() {
  return (
    <Container>
      <Spinner type="ThreeDots" color="#3f51b5" height={60} width={100} />
    </Container>
  );
}

export default Loader;
