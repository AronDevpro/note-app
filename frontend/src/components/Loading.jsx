import {Spinner} from "react-bootstrap";
import Container from "react-bootstrap/Container";

function Loading() {
    return <Container className='vw-100 vh-100 d-flex justify-content-center align-items-center'>
        <Spinner animation="grow" />
    </Container>;
}

export default Loading;
