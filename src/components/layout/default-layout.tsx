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
    <div id='2xl-faux-browser' className="page-wrapper">
      {/* TODO style this scrollbar on max screens */}
      <Navigation collapsed={collapsed} toggleCollapse={toggleCollapse} />
      <div className={`main-wrapper ${collapsed ? 'xl:ml-80 2xl:mr-0' : 'xl:ml-80 2xl:mr-0'}`}> 
        {/* removed overflow-x-hidden to for sticky onPage nav in recommends component */}
        <main className={`main ${collapsed ? 'sm:ml-32 xl:ml-0' : 'sm:ml-80 xl:ml-0'}`}> 
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
      {/* this is the faux bg/frame for 2xl screens */}
      <span
        aria-hidden="true"
        className="hidden fixed -z-50 h-dvh w-dvw top-0 left-0 2xl:grid 2xl:grid-cols-[1fr_1920px_1fr] 2xl:grid-rows-[1fr_1200px_1fr]"
      >
        <span
          aria-hidden="true"
          className="hidden 2xl:block absolute h-full w-full dot-grid 2xl:col-start-2 2xl:row-start-2 2xl:col-end-3 2xl:row-end-3 rounded-3xl"
        />
      </span>
    </div>
  );
}
