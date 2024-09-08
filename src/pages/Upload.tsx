import React, { useContext, useState } from "react";
import DataContext from "../dataContext";
import Papa, { ParseResult } from "papaparse";
import { BlackBoxDataObj } from "../dataManagement/BlackBoxDataObj";
import { Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Upload(): JSX.Element {
  const { setData } = useContext(DataContext); // we don't need the data here because it should be empty

  const [csvData, setCsvData] = useState<unknown[]>([]); // Define the type of csvData

  const navFunc = useNavigate();

  const handleNewFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files?.[0] != null) {
      Papa.parse(e.target.files?.[0], {
        complete: (result) => {
          // Handle the parsed data here
          const parsedData: unknown[] = result.data;
          setCsvData(parsedData);
        },
        header: true, // Set this to true if your CSV has headers
        skipEmptyLines: true,
      });
    }
  };

  const handleTestFileData = (): void => {
    Papa.parse(import.meta.env.VITE_REACT_APP_BASENAME + "/blackBoxData.csv", {
      complete: (results: ParseResult<object>) => {
        if (results.errors.length > 1) {
          // we are expecting 1 error because that is how the file ends
          console.log(results);
          throw new Error("There were errors in the parsing of the csv");
        }
        setData(new BlackBoxDataObj(results.data));
        navFunc("/");
      },
      download: true,
      header: true,
    });
  };

  const moveOnToNextStage = (): void => {
    setData(new BlackBoxDataObj(csvData)); // Update the context data with parsed CSV data
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
