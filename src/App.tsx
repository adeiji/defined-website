import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { hotjar } from 'react-hotjar'
import ReactGA from 'react-ga'
import LiveChat from 'react-livechat'
import { Config } from './config'
import Breadcrumbs from './components/Breadcrumbs';

// Eagerly load the Home page for fast initial render
import Home from './pages/home';
import Estimator from './components/estimator';

// Lazy load all other pages to improve initial load time
const PowerWashing = lazy(() => import('./pages/powerwashing'));
const Survey = lazy(() => import('./pages/survey'));
// const Screens = lazy(() => import('./pages/screens')); // Removed - internal CRM feature
const GutterCleaning = lazy(() => import('./pages/gutter-cleaning'));
const TrackCleaning = lazy(() => import('./pages/track-cleaning'));
const SolarScreens = lazy(() => import('./pages/solar-screens'));
const CarDetailingLasVegas = lazy(() => import('./pages/car-detailing-las-vegas'));
const ScheduleAppointment = lazy(() => import('./pages/schedule-appointment'));
const ManageAppointment = lazy(() => import('./pages/manage-appointment'));

// Lazy load service area pages
const LasVegas = lazy(() => import('./pages/service-areas/las-vegas'));
const Henderson = lazy(() => import('./pages/service-areas/henderson'));
const Summerlin = lazy(() => import('./pages/service-areas/summerlin'));
const NorthLasVegas = lazy(() => import('./pages/service-areas/north-las-vegas'));
const SpringValley = lazy(() => import('./pages/service-areas/spring-valley'));
const Enterprise = lazy(() => import('./pages/service-areas/enterprise'));
const BoulderCity = lazy(() => import('./pages/service-areas/boulder-city'));
const Mesquite = lazy(() => import('./pages/service-areas/mesquite'));
const Paradise = lazy(() => import('./pages/service-areas/paradise'));
const CentennialHills = lazy(() => import('./pages/service-areas/centennial-hills'));

function App() {
  useEffect(() => {
    hotjar.initialize(2197434, 0)
    ReactGA.initialize('UA-84318222-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  return (
    <Router>
      <div style={{ backgroundColor: "#dae9f7" }}>
        <LiveChat license='11554178' />
        
        <Suspense fallback={<div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <img src="/loading.gif" alt="Loading..." style={{ width: '80px', height: '80px' }} />
        </div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/estimate" element={<>
            <Breadcrumbs />
            <Estimator />
          </>} />
          <Route path="/home" element={<Home />} />
          {/* Screens route removed - internal CRM feature */}
          <Route path="/survey" element={<>
            <Breadcrumbs />
            <Survey />
          </>} />
          <Route path="/powerwashing" element={<>
            <Breadcrumbs />
            <PowerWashing />
          </>} />
          <Route path="/gutter-cleaning" element={<>
            <Breadcrumbs />
            <GutterCleaning />
          </>} />
          <Route path="/track-cleaning" element={<>
            <Breadcrumbs />
            <TrackCleaning />
          </>} />
          <Route path="/solar-screens" element={<>
            <Breadcrumbs />
            <SolarScreens />
          </>} />
          <Route path="/car-detailing-las-vegas" element={<>
            <Breadcrumbs />
            <CarDetailingLasVegas />
          </>} />
          
          {/* Service area routes */}
          <Route path="/service-areas/las-vegas" element={<>
            <Breadcrumbs />
            <LasVegas />
          </>} />
          <Route path="/service-areas/henderson" element={<>
            <Breadcrumbs />
            <Henderson />
          </>} />
          <Route path="/service-areas/summerlin" element={<>
            <Breadcrumbs />
            <Summerlin />
          </>} />
          <Route path="/service-areas/north-las-vegas" element={<>
            <Breadcrumbs />
            <NorthLasVegas />
          </>} />
          <Route path="/service-areas/spring-valley" element={<>
            <Breadcrumbs />
            <SpringValley />
          </>} />
          <Route path="/service-areas/enterprise" element={<>
            <Breadcrumbs />
            <Enterprise />
          </>} />
          <Route path="/service-areas/boulder-city" element={<>
            <Breadcrumbs />
            <BoulderCity />
          </>} />
          <Route path="/service-areas/mesquite" element={<>
            <Breadcrumbs />
            <Mesquite />
          </>} />
          <Route path="/service-areas/paradise" element={<>
            <Breadcrumbs />
            <Paradise />
          </>} />
          <Route path="/service-areas/centennial-hills" element={<>
            <Breadcrumbs />
            <CentennialHills />
          </>} />

          {/* Public scheduling routes */}
          <Route path="/schedule" element={<>
            <Breadcrumbs />
            <ScheduleAppointment />
          </>} />
          <Route path="/schedule/:companyId" element={<>
            <Breadcrumbs />
            <ScheduleAppointment />
          </>} />

          {/* Public appointment management route */}
          <Route path="/manage/:appointmentId/:token" element={<>
            <Breadcrumbs />
            <ManageAppointment />
          </>} />
        </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;