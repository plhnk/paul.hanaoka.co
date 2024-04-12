'use client';
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';

interface ModeToggleProps {
    className?: string;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ className }) => {
    const { setTheme, resolvedTheme } = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(resolvedTheme === 'dark');
    }, [resolvedTheme]);

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
        setTheme(isDarkMode ? 'light' : 'dark');
    };

    return (
        <div className={className}>
            <span>{'Mode'}</span>
            <Switch checked={isDarkMode} onCheckedChange={handleToggle} />
        </div>
    );
};

export default ModeToggle;
