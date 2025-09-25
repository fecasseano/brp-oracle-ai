'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SearchInterface } from '@/components/features/search/SearchInterface';

export default function SearchPage() {
  return (
    <MainLayout>
      <SearchInterface />
    </MainLayout>
  );
}