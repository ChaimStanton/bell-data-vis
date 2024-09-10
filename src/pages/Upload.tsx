import React, { useContext } from "react";
import DataContext from "../dataContext";
import { Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { DbConn } from "../DbConn";

function Upload(): JSX.Element {
  const { setIsLoaded } = useContext(DataContext); // we don't need the data here because it should be empty

  const navFunc = useNavigate();

  const handleNewFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e.target.files?.[0] != null) {
      const file = e.target.files[0];
      const filePath = URL.createObjectURL(file);
      await DbConn.loadCSV(filePath);
      await DbConn.getTelematicData();
      setIsLoaded(true);
    }
  };

  const handleTestFileData = async (): Promise<void> => {
    try {
      await DbConn.loadCSV(import.meta.env.VITE_DATA_SOURCE);
      // await DbConn.getInstance().getAllData();
      setIsLoaded(true);
      navFunc("/");
    } catch (error) {
      console.error("There were errors in the parsing of the csv", error);
    }
  };

  const moveOnToNextStage = (): void => {
    navFunc("/");
  };

  return (
    <Container className="mt-2">
      <h1>Upload your CSV file here</h1>
      <Form onSubmit={moveOnToNextStage}>
        <Form.Control
          type="file"
          onChange={handleNewFile}
          accept=".csv"
          className="my-2"
          required
        />
        <Button type="submit">Submit form</Button>
      </Form>

      <Button className="my-2" variant="secondary" onClick={handleTestFileData}>
        Click to use some example data instead
      </Button>
    </Container>
  );
}

export default Upload;
