import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { BaseRoutes } from "./routes/BaseRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export function App() {
  return (
    <>
      <ChakraProvider>
        <BaseRoutes />
      </ChakraProvider>
    </>
  );
}
