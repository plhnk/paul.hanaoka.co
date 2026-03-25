import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectCard from '@/components/ui/projectcard';

describe('ProjectCard', () => {
  it('renders the title, labels, and both theme image sources', () => {
    render(
      <ProjectCard
        cover={{
          light: '/projects/demo/cover-light.jpg',
          dark: '/projects/demo/cover-dark.jpg',
        }}
        labels={['Enterprise', 'Platform']}
        subtitle="Subtitle"
        title="Demo Project"
      />
    );

    expect(screen.getByText('Demo Project')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
    expect(screen.getByText('Platform')).toBeInTheDocument();
    expect(screen.getAllByAltText('Demo Project Subtitle')).toHaveLength(2);
  });
});
