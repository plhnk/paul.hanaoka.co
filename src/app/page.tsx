/* eslint-disable @next/next/no-img-element */
import { Card, Inset, Box, Container } from '@radix-ui/themes';
import Billboard from './components/ui/billboard';

export default function Home() {
  return (
    <>
      <Billboard>
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1580106815415-1d1a768d27cc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={''}
        />
      </Billboard>
    </>
  );
}
