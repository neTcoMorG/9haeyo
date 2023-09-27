import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import PublicProfilePage from "./pages/public/PublicProfilePage";
import Callback from "./pages/Callback";

function App() {
  return (
    <Box w={'100%'} h={'100%'} bgColor={'#101010'}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/public/:nickname" element={<PublicProfilePage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
