import { useContext } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BlackBoxMap } from "../visuals/BlackBoxDataMap";

import DataContext from "../dataContext";

function MainAppPage(): JSX.Element {
  const dataObj = useContext(DataContext);

  if (dataObj.data === undefined) {
    return (
      <Container className="my-1">
        <Alert variant="danger" onClose={() => {}} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            You need to upload a CSV file before you can view the data. Click
            the link below to go back
          </p>
          <Link to={"/upload"} className="Button">
            <Button>Click here to upload a file </Button>
          </Link>
        </Alert>
      </Container>
    );
  }
  return <BlackBoxMap data={dataObj.data} />;
}

export default MainAppPage;
