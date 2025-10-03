import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/hooks/useLanguage";
import CookieConsent from "@/components/CookieConsent";
import StructuredData from "@/components/StructuredData";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import ServiceDetail from "./pages/ServiceDetail";
import BusinessIndustrialDetail from "./pages/BusinessIndustrialDetail";
import FoodProductionDetail from "./pages/FoodProductionDetail";
import DecorativeFloorsDetail from "./pages/DecorativeFloorsDetail";
import GaragesParkingDetail from "./pages/GaragesParkingDetail";
import TechnicalSpecialDetail from "./pages/TechnicalSpecialDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:articleId" element={<BlogArticle />} />
            {/* Specific service routes MUST be before the generic :serviceId route */}
            <Route path="/services/business-industrial" element={<BusinessIndustrialDetail />} />
            <Route path="/services/food-production" element={<FoodProductionDetail />} />
            <Route path="/services/decorative-floors" element={<DecorativeFloorsDetail />} />
            <Route path="/services/garages-parking" element={<GaragesParkingDetail />} />
            <Route path="/services/technical-specialized" element={<TechnicalSpecialDetail />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Global Components */}
          <StructuredData />
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

