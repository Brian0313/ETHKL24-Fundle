import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, CampaignDetails, CreateCampaign, Profile } from './pages';
import { Navbar } from './components';

const App = () => {
  return (
    <div className='relative sm:p-8 p-4 bg-[#705144] flex flex-row min-h-screen'>
      <div className='sm:flex hidden mr-10 relative'>
      </div>
      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/create-campaign' element={<CreateCampaign />}/>
          <Route path='/campaign-details/:id' element={<CampaignDetails />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App