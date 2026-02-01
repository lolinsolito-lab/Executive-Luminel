import React from 'react';
import { HeroSection } from './HeroSection';
import { AwakeningSection } from './AwakeningSection';
import { WeaponSection } from './WeaponSection';
import { BlackMarketSection } from './BlackMarketSection';
import { TierSection } from './TierSection';
import { FooterSection } from './FooterSection';

export const LandingPage: React.FC = () => {
    return (
        <div className="w-full bg-white text-phoenix-ink overflow-x-hidden">
            <HeroSection />
            <AwakeningSection />
            <WeaponSection />
            <BlackMarketSection />
            <TierSection />
            <FooterSection />
        </div>
    );
};
