import React from 'react';
import { HeroSection } from './HeroSection';
import { AwakeningSection } from './AwakeningSection';
import { WeaponSection } from './WeaponSection';
import { BlackMarketSection } from './BlackMarketSection';
import { TierSection } from './TierSection';
import { FooterSection } from './FooterSection';

import { SmartNavbar } from './SmartNavbar';

interface LandingPageProps {
    onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
    return (
        <div className="w-full bg-white text-phoenix-ink overflow-x-hidden">
            <SmartNavbar onEnterApp={onEnterApp} />
            <HeroSection onEnterApp={onEnterApp} />
            <AwakeningSection />
            <WeaponSection />
            <BlackMarketSection />
            <TierSection onEnterApp={onEnterApp} />
            <FooterSection />
        </div>
    );
};
