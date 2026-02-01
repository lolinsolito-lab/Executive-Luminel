import React from 'react';
import { HeroSection } from './HeroSection';
import { AwakeningSection } from './AwakeningSection';
import { WeaponSection } from './WeaponSection';
import { BlackMarketSection } from './BlackMarketSection';
import { TierSection } from './TierSection';
import { FooterSection } from './FooterSection';

import { SubscriptionTier } from '../../types';

interface LandingPageProps {
    onCtaClick: () => void;
    onSelectPlan?: (plan: SubscriptionTier) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onCtaClick, onSelectPlan }) => {
    return (
        <div className="w-full bg-white text-phoenix-ink overflow-x-hidden">
            <HeroSection onEnterApp={onCtaClick} />
            <AwakeningSection />
            <WeaponSection />
            <BlackMarketSection />
            <TierSection onEnterApp={onCtaClick} onSelectPlan={onSelectPlan} />
            <FooterSection />
        </div>
    );
};
