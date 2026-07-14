import { useEffect } from 'react';
import { Article } from '../types';
import { injectNewsArticleSchema } from '../utils/seoSchema';

interface SEOMetadataManagerProps {
  article: Article | null;
  siteName?: string;
  language?: 'ar' | 'en';
}

export default function SEOMetadataManager({ article, siteName = 'الورّاق Al-Warraq', language = 'ar' }: SEOMetadataManagerProps) {
  useEffect(() => {
    if (!article) {
      // Restore default metadata
      document.title = siteName;
      updateMetaTag('name', 'description', 'جريدة الورّاق - منصة التحليلات السيادية والاستقصاء الإخباري لمنطقة الشرق الأوسط ولبنان.');
      removeMetaTag('property', 'og:title');
      removeMetaTag('property', 'og:description');
      removeMetaTag('property', 'og:image');
      removeMetaTag('property', 'og:type');
      removeMetaTag('name', 'twitter:card');
      removeJsonLd();
      return;
    }

    const isAr = language === 'ar';
    const title = isAr ? article.titleAr : article.titleEn;
    const summary = isAr ? article.summaryAr : article.summaryEn;

    // 1. Dynamic Page title (Max 60 chars optimal for Google SERPs)
    const rawTitle = `${title} | ${siteName}`;
    document.title = rawTitle.length > 60 ? rawTitle.substring(0, 57) + '...' : rawTitle;

    // 2. Click-driving Meta Description (Max 160 characters)
    let descriptionText = summary || '';
    if (descriptionText.length > 155) {
      descriptionText = descriptionText.substring(0, 152) + '...';
    }
    updateMetaTag('name', 'description', descriptionText);

    // 3. Open Graph (og:tags) for discoverability & social embeds
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', summary);
    updateMetaTag('property', 'og:image', article.imageUrl);
    updateMetaTag('property', 'og:type', 'article');
    updateMetaTag('name', 'twitter:card', 'summary_large_image');

    // 4. Inject Dynamic JSON-LD structured schema for Google Discover/News compliance
    injectNewsArticleSchema(article, isAr, siteName);

    return () => {
      // Cleanup
      removeJsonLd();
    };
  }, [article, language, siteName]);

  return null;
}

// Helper methods to clean up and update the actual index.html DOM meta tags
function updateMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function removeMetaTag(attributeName: 'name' | 'property', attributeValue: string) {
  const element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (element) {
    element.remove();
  }
}

function removeJsonLd() {
  const script = document.getElementById('seo-news-article-jsonld');
  if (script) {
    script.remove();
  }
}
