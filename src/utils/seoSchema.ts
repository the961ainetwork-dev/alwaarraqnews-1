import { Article } from '../types';
import { getAuthorProfile } from '../seoData';

/**
 * Parses diverse Arabic and English date formats into a valid ISO date string.
 * Ensures the date is strictly valid and compliant with schema.org requirements.
 */
export function parseDateToISOString(dateStr: string): string {
  if (!dateStr) return new Date().toISOString();
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    try {
      return new Date(dateStr).toISOString();
    } catch (e) {
      return new Date().toISOString();
    }
  }
  let cleaned = dateStr.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
  const arabicMonths: { [key: string]: number } = {
    'يناير': 0, 'فبراير': 1, 'مارس': 2, 'أبريل': 3, 'مايو': 4, 'يونيو': 5,
    'يوليو': 6, 'أغسطس': 7, 'سبتمبر': 8, 'أكتوبر': 9, 'نوفمبر': 10, 'ديسمبر': 11
  };
  const parts = cleaned.trim().split(/\s+/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const monthStr = parts[1];
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(year)) {
      let month = 0;
      if (arabicMonths[monthStr] !== undefined) {
        month = arabicMonths[monthStr];
      } else {
        const engIdx = new Date(`${monthStr} 1, 2000`).getMonth();
        if (!isNaN(engIdx)) month = engIdx;
      }
      try {
        return new Date(year, month, day).toISOString();
      } catch (e) {
        return new Date().toISOString();
      }
    }
  }
  const parsed = Date.parse(dateStr);
  return isNaN(parsed) ? new Date().toISOString() : new Date(parsed).toISOString();
}

/**
 * Generates Google Discover-optimized high-resolution image URLs in multiple aspect ratios (16:9, 4:3, 1:1).
 * High-resolution is required by Google (at least 1200px width) for Discover compatibility.
 */
export function getDiscoverOptimizedImages(rawImgUrl: string): string[] {
  const defaultImg = "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=600";
  const baseImg = rawImgUrl || defaultImg;
  // Strip any query parameters to dynamically append crops
  const cleanImgUrl = baseImg.split('?')[0];

  return [
    // 16:9 aspect ratio - min 1200px width for Discover
    `${cleanImgUrl}?auto=format&fit=crop&w=1600&h=900&q=80`,
    // 4:3 aspect ratio - min 1200px width
    `${cleanImgUrl}?auto=format&fit=crop&w=1200&h=900&q=80`,
    // 1:1 aspect ratio - min 1200px width
    `${cleanImgUrl}?auto=format&fit=crop&w=1200&h=1200&q=80`
  ];
}

/**
 * Checks if the article matches financial topics to use FinancialNewsArticle subclass.
 */
export function isFinancialArticle(article: Article): boolean {
  const financialCategories = ['economy', 'markets', 'arab-markets', 'lebanon-banking', 'bdl', 'deposits'];
  if (financialCategories.includes(article.category || '')) return true;
  if (article.categories?.some(cat => financialCategories.includes(cat))) return true;

  const financialKeywords = [
    'اقتصاد', 'أسواق', 'بنوك', 'عملات', 'سندات', 'دولار', 'الليرة_اللبنانية',
    'Economy', 'Markets', 'Banking', 'Finance', 'SST_Removal', 'reconstruction', 'fuel-profiteering'
  ];
  return !!article.tags?.some(tag => 
    financialKeywords.some(kw => tag.toLowerCase().includes(kw.toLowerCase()))
  );
}

/**
 * Generates and injects the JSON-LD Schema script tag into the document head.
 * Ensures the script is correctly formatted, fully compliant, and removes previous injections to prevent duplication.
 */
export function injectNewsArticleSchema(article: Article, isAr: boolean, siteName: string = 'الورّاق Al-Warraq') {
  if (!article) return;

  const title = isAr ? article.titleAr : article.titleEn;
  const summary = isAr ? (article.summaryAr || article.excerptAr || '') : (article.summaryEn || article.excerptEn || '');
  const authorProfile = getAuthorProfile(article.author?.nameEn || '', article.author?.nameAr || '');
  
  const authorName = isAr ? authorProfile.nameAr : authorProfile.nameEn;
  const authorTitle = isAr ? authorProfile.titleAr : authorProfile.titleEn;

  const schemaType = isFinancialArticle(article) ? 'FinancialNewsArticle' : 'NewsArticle';
  const canonicalUrl = `https://alwarraqnews.com/${article.category || 'news'}/${article.slug || article.id}`;
  const isoDate = parseDateToISOString(article.date);

  // Capping headline at 110 characters according to Schema.org guidelines
  const cappedHeadline = title.length > 110 ? title.substring(0, 107) + '...' : title;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    'headline': cappedHeadline,
    'description': summary.length > 160 ? summary.substring(0, 157) + '...' : summary,
    'image': getDiscoverOptimizedImages(article.imageUrl),
    'datePublished': isoDate,
    'dateModified': isoDate,
    'author': {
      '@type': 'Person',
      'name': authorName,
      'jobTitle': authorTitle,
      'url': `https://alwarraqnews.com/author/${authorProfile.id}`
    },
    'publisher': {
      '@type': 'Organization',
      'name': siteName,
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://alwarraqnews.com/logo_al_warraq_square.png'
      }
    }
  };

  // Remove existing JSON-LD script if any
  const existingScript = document.getElementById('seo-news-article-jsonld');
  if (existingScript) {
    existingScript.remove();
  }

  // Create and append the new JSON-LD script tag
  const script = document.createElement('script');
  script.id = 'seo-news-article-jsonld';
  script.type = 'application/ld+json';
  script.text = JSON.stringify(jsonLd, null, 2);
  document.head.appendChild(script);
}
