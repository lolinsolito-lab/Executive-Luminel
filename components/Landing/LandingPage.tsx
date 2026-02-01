import React from 'react';
import { HeroSection } from './HeroSection';
import { AwakeningSection } from './AwakeningSection';
import { WeaponSection } from './WeaponSection';
import { BlackMarketSection } from './BlackMarketSection';
import { TierSection } from './TierSection';
import { FooterSection } from './FooterSection';

interface LandingPageProps {
    onCtaClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onCtaClick }) => {
    return (
        <div className="w-full bg-white text-phoenix-ink overflow-x-hidden">
            <HeroSection onEnterApp={onCtaClick} />
            <AwakeningSection />
            <WeaponSection />
            <BlackMarketSection />
            <TierSection onEnterApp={onCtaClick} />
            <FooterSection />
        </div>
    );
};
