/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Property {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  price: number;
  location: string;
  city: 'Riyadh' | 'Jeddah' | 'Khobar' | 'Makkah' | string;
  cityAr: 'الرياض' | 'جدة' | 'الخبر' | 'مكة' | string;
  type: 'villa' | 'apartment' | 'land' | string;
  typeAr: 'فيلا' | 'شقة' | 'أرض' | string;
  beds: number;
  baths: number;
  size: number; // in sqm (متر مربع)
  imageUrl: string;
  features: string[];
  isFeatured: boolean;
  isPopular?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  type: 'consultation' | 'valuation' | 'inquiry';
  propertyType?: string;
  city?: string;
  notes?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'completed' | 'archived';
  valDetails?: {
    area: number;
    age: number;
    finishing: string;
    estimatedValue: string;
  };
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  author: string;
  imageUrl: string;
  category: string;
}
