/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import FeaturedListings from './components/FeaturedListings';
import ValuationForm from './components/ValuationForm';
import Testimonials from './components/Testimonials';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import LeadsDashboard from './components/LeadsDashboard';

import { MOCK_PROPERTIES, INITIAL_LEADS } from './data';
import { Property, Lead } from './types';

export default function App() {
  // Search state
  const [searchFilters, setSearchFilters] = useState({
    type: 'all',
    city: 'all',
    beds: 'all',
    priceRange: 'all',
  });

  // Leads CRM state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Load leads from localStorage on mount
  useEffect(() => {
    const savedLeads = localStorage.getItem('sarh_realestate_leads');
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (e) {
        setLeads(INITIAL_LEADS);
      }
    } else {
      setLeads(INITIAL_LEADS);
      localStorage.setItem('sarh_realestate_leads', JSON.stringify(INITIAL_LEADS));
    }
  }, []);

  // Save leads to localStorage whenever state changes
  const saveLeadsToStorage = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem('sarh_realestate_leads', JSON.stringify(updatedLeads));
  };

  // Add inquiry from property details
  const handleAddInquiry = (newLeadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    const updated = [newLead, ...leads];
    saveLeadsToStorage(updated);
  };

  // Add valuation lead from Multi-step form
  const handleAddValuationLead = (newValLeadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const newValLead: Lead = {
      ...newValLeadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    const updated = [newValLead, ...leads];
    saveLeadsToStorage(updated);
  };

  // Update lead status from dashboard CRM
  const handleUpdateLeadStatus = (id: string, status: Lead['status']) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    saveLeadsToStorage(updated);
  };

  // Delete lead from dashboard CRM
  const handleDeleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    saveLeadsToStorage(updated);
  };

  // Create mock lead directly from the CRM panel for quick testing
  const handleAddSimulatedLead = () => {
    const mockNames = ['نوف الدوسري', 'فيصل بن حرب', 'عبدالله السديري', 'رانية الحربي', 'سلطان القحطاني'];
    const mockPhones = ['0544556677', '0566223344', '0500998877', '0555334422', '0533112233'];
    const mockCities = ['الرياض', 'جدة', 'الخبر', 'مكة'];
    const mockTypes = ['فيلا', 'شقة', 'أرض'];
    
    const randomIdx = Math.floor(Math.random() * mockNames.length);
    
    const simulatedLead: Lead = {
      id: `lead-${Date.now()}`,
      name: mockNames[randomIdx],
      phone: mockPhones[randomIdx],
      email: `test.${randomIdx}@domain.sa`,
      type: 'consultation',
      propertyType: mockTypes[Math.floor(Math.random() * mockTypes.length)],
      city: mockCities[Math.floor(Math.random() * mockCities.length)],
      notes: `طلب استشارة عاجلة بخصوص تملك وحدة في ${mockCities[Math.floor(Math.random() * mockCities.length)]}. ميزانيتي مرنة والمستندات جاهزة للتقديم.`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    const updated = [simulatedLead, ...leads];
    saveLeadsToStorage(updated);
  };

  // Reset search filters
  const handleResetFilters = () => {
    setSearchFilters({
      type: 'all',
      city: 'all',
      beds: 'all',
      priceRange: 'all',
    });
  };

  // Filter properties based on active search criteria
  const filteredProperties = MOCK_PROPERTIES.filter((property) => {
    // 1. Property Type Filter
    if (searchFilters.type !== 'all' && property.type !== searchFilters.type) {
      return false;
    }
    
    // 2. City Filter
    if (searchFilters.city !== 'all' && property.city !== searchFilters.city) {
      return false;
    }

    // 3. Bed count Filter
    if (searchFilters.beds !== 'all') {
      const neededBeds = Number(searchFilters.beds);
      if (neededBeds === 5) {
        if (property.beds < 5) return false;
      } else {
        if (property.beds !== neededBeds) return false;
      }
    }

    // 4. Price Bracket Filter
    if (searchFilters.priceRange !== 'all') {
      const price = property.price;
      if (searchFilters.priceRange === 'under1.5m' && price >= 1500000) {
        return false;
      }
      if (searchFilters.priceRange === '1.5m-3m' && (price < 1500000 || price > 3000000)) {
        return false;
      }
      if (searchFilters.priceRange === 'over3m' && price <= 3000000) {
        return false;
      }
    }

    return true;
  });

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div className="min-h-screen bg-slate-950 antialiased flex flex-col font-sans selection:bg-amber-500/30 selection:text-white text-white">
      
      {/* 1. Header/Navigation Bar */}
      <Navbar
        onOpenDashboard={() => setIsDashboardOpen(true)}
        newLeadsCount={newLeadsCount}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        
        {/* 2. Hero Section with Quick Search engine */}
        <Hero onSearch={setSearchFilters} />

        {/* 3. Stats section - "Why Us" */}
        <Stats />

        {/* 4. Featured Listings Grid section */}
        <FeaturedListings
          properties={filteredProperties}
          onAddInquiry={handleAddInquiry}
          activeFilters={searchFilters}
          onResetFilters={handleResetFilters}
        />

        {/* 5. Free Valuation Step-by-Step form section */}
        <ValuationForm onAddValuationLead={handleAddValuationLead} />

        {/* 6. Testimonials Reviews & Video section */}
        <Testimonials />

        {/* 7. Real Estate Blog & Article news */}
        <BlogSection />

      </main>

      {/* 8. Footer Contacts and visual map */}
      <Footer />

      {/* 9. Floating Admin Lead Toggler Button for absolute ease of access */}
      <button
        onClick={() => setIsDashboardOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex h-14 items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer md:hidden shadow-amber-500/20"
        title="لوحة طلبات العملاء"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
        </span>
        <span className="font-extrabold text-sm">لوحة الطلبات ({newLeadsCount})</span>
      </button>

      {/* 10. Admin CRM Sliding Portal Drawer */}
      <LeadsDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        leads={leads}
        onUpdateStatus={handleUpdateLeadStatus}
        onDeleteLead={handleDeleteLead}
        onAddSimulatedLead={handleAddSimulatedLead}
      />

    </div>
  );
}
