import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import GetStarted from "./pages/GetStarted";
import Downloads from "./pages/Downloads";
import FAQ from "./pages/FAQ";
import Documentation from "./pages/Documentation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Feedback from "./pages/Feedback";
import NoPage from "./pages/NoPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="get-started" element={<GetStarted />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="__/auth/verifyEmail" element={<Navigate to="/sign-up" />} />
          <Route path="__/auth/resetPassword" element={<Navigate to="/sign-up" />} />
          <Route path="404" element={<NoPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}