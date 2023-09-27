import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import PublicProfilePage from "./pages/public/PublicProfilePage";
import Callback from "./pages/Callback";
import PrivateProfilePage from "./pages/private/PrivateProfilePage";
import SubMissionPage from "./pages/public/SubMissionPage";

function App() {
  return (
    <Box w={'100%'} h={'100%'} bgColor={'#101010'}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/public/:nickname" element={<PublicProfilePage />} />
          <Route path="/private/*" element={<PrivateProfilePage />} />
          <Route path="/mission" element={<SubMissionPage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
