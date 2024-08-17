'use client';
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { useSidebarContext } from '@/components/sidebar-provider';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { collapsed, toggleCollapse } = useSidebarContext();

  return (
    <>
      <Navigation collapsed={collapsed} toggleCollapse={toggleCollapse} />
      <div
        className={`main-wrapper ${
          collapsed ? 'xl:ml-80 2xl:mx-auto' : 'xl:ml-80 2xl:mx-auto'
        }`}
      >
        {/* removed overflow-x-hidden to for sticky onPage nav in recommends component */}
        <main
          className={`main ${
            collapsed ? 'sm:ml-32 xl:ml-0 2xl:mx-0' : 'sm:ml-80 xl:ml-0 2xl:mx-0'
          }`}
        >
          {children}
        </main>
        <Footer />
      </div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          classNames: {
            title: 'text-text',
            success: 'text-element bg-card border-none', // this styles the wrapper of the success toast --> determined in navbutton
          },
        }}
      />
    </>
  );
}
