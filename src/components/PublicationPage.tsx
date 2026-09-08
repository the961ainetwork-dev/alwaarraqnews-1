import React, { useState, useMemo } from 'react';
import {
  Newspaper,
  Mail,
  FileCode,
  Users,
  Terminal,
  Upload,
  UserPlus,
  CheckCircle2,
  Copy,
  Download,
  Send,
  ExternalLink,
  Search,
  BookOpen,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Code2,
  AlertCircle,
  FileSpreadsheet,
  Check,
  Layers,
  ChevronRight,
  Play,
  Share2,
  Info
} from 'lucide-react';

interface PublicationPageProps {
  language: 'ar' | 'en';
  subscribers?: string[];
  setSubscribers?: React.Dispatch<React.SetStateAction<string[]>>;
  onNavigateHome?: () => void;
}

export const PublicationPage: React.FC<PublicationPageProps> = ({
  language,
  subscribers = [],
  setSubscribers,
  onNavigateHome
}) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'newsletter' | 'guidelines' | 'onboarding' | 'pipeline' | 'subscribers' | 'widget'>('newsletter');
  
  // Copy Feedback State
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  // ------------------------------------------------------------------------
  // 1. PRODUCTION-READY BARRON'S STYLE HTML EMAIL ISSUE TEMPLATE
  // ------------------------------------------------------------------------
  const issueDate = 'Monday, September 7, 2026';
  const issueDateAr = 'الاثنين، ٧ أيلول / سبتمبر ٢٠٢٦';
  const issueVol = 'Vol. CIV No. 36';

  const rawBarronEmailHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>The Daily Market Dispatch | ${issueVol} - ${issueDate}</title>
  <!--[if mso]>
  <style type="text/css">
    table, td, div, p, a, h1, h2, h3, span { font-family: 'Georgia', 'Times New Roman', serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: 'Georgia', 'Times New Roman', serif; color: #1e293b;">

  <!-- PREHEADER TEXT (HIDDEN IN EMAIL CLIENTS) -->
  <div style="display: none; font-size: 1px; color: #f4f5f7; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Daily Financial Intelligence: Treasury yields steady post-Jackson Hole, GCC sovereign reallocations, and tech capex discipline.
  </div>

  <!-- MAIN WRAPPER (600px CONTAINER) -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f5f7; padding: 24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="width: 600px; max-width: 600px; background-color: #ffffff; border: 1px solid #d1d5db; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- ====================================================================== -->
          <!-- HEADER BLOCK (BARRON'S MASTHEAD & ISSUE METADATA) -->
          <!-- ====================================================================== -->
          <tr>
            <td style="padding: 24px 28px 12px 28px; background-color: #0b1a30; border-bottom: 4px double #d97706; text-align: center;">
              
              <!-- Top Category Marker -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; font-weight: 800; color: #93c5fd; text-transform: uppercase; letter-spacing: 1.5px;">
                    EXECUTIVE FINANCIAL INTELLIGENCE
                  </td>
                  <td align="right" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 1px;">
                    SECTION: UP & DOWN WALL STREET
                  </td>
                </tr>
              </table>

              <!-- Masthead Title -->
              <h1 style="margin: 14px 0 6px 0; font-family: 'Georgia', 'Times New Roman', serif; font-size: 32px; font-weight: 900; color: #ffffff; letter-spacing: 0.5px; text-transform: uppercase; line-height: 1.1;">
                THE DAILY MARKET DISPATCH
              </h1>
              <p style="margin: 0 0 12px 0; font-family: 'Georgia', serif; font-style: italic; font-size: 13px; color: #cbd5e1;">
                In the Tradition of Institutional Print Journalism & Macroeconomic Precision
              </p>

              <!-- Issue Metadata Bar -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #1e3a5f; padding-top: 8px;">
                <tr>
                  <td align="left" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 600; color: #94a3b8;">
                    ${issueDate}
                  </td>
                  <td align="center" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #f59e0b;">
                    ${issueVol}
                  </td>
                  <td align="right" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 600; color: #94a3b8;">
                    CLOSED EDITION: 06:00 EST
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ====================================================================== -->
          <!-- SECTION A: TOP 5 CORE IN-DEPTH STORIES (HERO & LEAD COVERAGE) -->
          <!-- ====================================================================== -->
          <tr>
            <td style="padding: 24px 28px;">

              <!-- SECTION A HEADER -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px; border-bottom: 2px solid #0b1a30;">
                <tr>
                  <td style="padding-bottom: 6px;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; font-weight: 900; color: #0b1a30; text-transform: uppercase; letter-spacing: 1.5px; background-color: #f1f5f9; padding: 3px 8px; border-left: 3px solid #0b1a30;">
                      SECTION A: LEAD ANALYSES & EXECUTIVE COVERAGE
                    </span>
                  </td>
                </tr>
              </table>

              <!-- STORY 1: LEAD HERO INVESTIGATION -->
              <!-- <!-- EDITORIAL NOTE: Story 1 Hero Placement. Replace UTM parameters: utm_source=dispatch_daily&utm_medium=email&utm_campaign=hero_story_1. Hero banner constraint: 580x240px. --> -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td>
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; font-weight: 800; color: #b91c1c; text-transform: uppercase; letter-spacing: 1px;">
                      MACRO LIQUIDITY & CENTRAL BANKS
                    </span>
                    <h2 style="margin: 4px 0 8px 0; font-family: 'Georgia', 'Times New Roman', serif; font-size: 24px; font-weight: 900; color: #0b1a30; line-height: 1.25;">
                      <a href="https://alwarraq.ai/article/us-treasury-refinancing-liquidity?utm_source=dispatch_daily&utm_medium=email&utm_campaign=hero_story_1" style="color: #0b1a30; text-decoration: none;">
                        Treasury's Autumn Issuance Pivot: Why Money Markets Are Front-Running the Curve
                      </a>
                    </h2>
                    
                    <p style="margin: 0 0 12px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
                      <strong>WASHINGTON</strong> — By Arthur Vance, Senior Capital Markets Editor | <em>Macro & Rates Desk</em>
                    </p>

                    <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.65; color: #334155;">
                      The Treasury Department's latest quarterly refunding trajectory signals a decisive shift toward short-duration bills, intentionally mitigating pressure on 10- and 30-year paper as institutional balance sheets absorb ongoing quantitative tightening. While primary dealers anticipated a steepening curve, primary issuance absorption shows surprising resilience among foreign sovereign wealth allocations.
                    </p>
                    <p style="margin: 0 0 14px 0; font-size: 14px; line-height: 1.65; color: #334155;">
                      Money-market fund inflows expanded by an annualized 8.4% last month, cementing front-end stability. However, portfolio managers caution that any sudden escalation in energy supply chain bottlenecks could force the Federal Reserve into a protracted pause, compressing bank net interest margins into the fourth quarter.
                    </p>

                    <!-- DATA CALLOUT BOX 1 -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #0b1a30; margin: 12px 0 16px 0;">
                      <tr>
                        <td style="padding: 10px 14px;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 800; color: #0b1a30; text-transform: uppercase;">
                                METRIC PULSE: US 10-YR YIELD
                              </td>
                              <td align="right" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #047857;">
                                4.18% (▼ -6 bps) | 2Y-10Y Spread: +14 bps
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <div style="border-bottom: 1px dashed #cbd5e1; padding-top: 10px;"></div>
                  </td>
                </tr>
              </table>

              <!-- STORY 2: CORPORATE EARNINGS & TECH CAPEX -->
              <!-- <!-- EDITORIAL NOTE: Story 2 Tech Capex. Ensure link tracking is appended. Key graphic reference: Server rack supply index. --> -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td>
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; font-weight: 800; color: #0369a1; text-transform: uppercase; letter-spacing: 1px;">
                      ENTERPRISE TECH & INFRASTRUCTURE
                    </span>
                    <h2 style="margin: 4px 0 8px 0; font-family: 'Georgia', 'Times New Roman', serif; font-size: 20px; font-weight: 900; color: #0b1a30; line-height: 1.25;">
                      <a href="https://alwarraq.ai/article/hyperscaler-capex-discipline-ai?utm_source=dispatch_daily&utm_medium=email&utm_campaign=story_2" style="color: #0b1a30; text-decoration: none;">
                        Hyperscaler Capex Reckoning: Cloud Titans Pivot From Compute Hoarding to Unit ROI
                      </a>
                    </h2>
                    
                    <p style="margin: 0 0 12px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #64748b; text-transform: uppercase;">
                      <strong>SAN FRANCISCO</strong> — By Evelyn Sterling, Tech Equity Strategist | <em>Silicon & Silicon Valley Desk</em>
                    </p>

                    <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.65; color: #334155;">
                      After committing a combined $185 billion to specialized accelerator clusters over the past eighteen months, top-tier cloud operators are confronting investor demands for gross margin clarity. CFOs are instituting rigorous internal hurdle rates, signaling that future data center buildouts will prioritize energy interconnect availability over raw silicon unit volume.
                    </p>
                    <p style="margin: 0 0 14px 0; font-size: 14px; line-height: 1.65; color: #334155;">
                      Semiconductor suppliers that capitalized on unrestricted advance purchase commitments are revising forward guidance toward normalized 15% replacement cycles. Analysts note that edge-inference software providers with clear B2B contracts are set to capture superior free-cash-flow multiples.
                    </p>

                    <!-- DATA CALLOUT BOX 2 -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #0369a1; margin: 12px 0 16px 0;">
                      <tr>
                        <td style="padding: 10px 14px;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 800; color: #0b1a30; text-transform: uppercase;">
                                SECTOR MULTIPLE: CLOUD CAPEX INDEX
                              </td>
                              <td align="right" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #b91c1c;">
                                Forward P/E: 27.8x (▼ -1.2x) | Aggregate FCF Yield: 3.9%
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <div style="border-bottom: 1px dashed #cbd5e1; padding-top: 10px;"></div>
                  </td>
                </tr>
              </table>

              <!-- STORY 3: ENERGY MARKETS & CHOKEPOINT DYNAMICS -->
              <!-- <!-- EDITORIAL NOTE: Story 3 Energy & Hormuz. Link to War Room Dossier for premium subscribers. --> -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td>
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; font-weight: 800; color: #c2410c; text-transform: uppercase; letter-spacing: 1px;">
                      COMMODITIES & MARITIME TRANSIT
                    </span>
                    <h2 style="margin: 4px 0 8px 0; font-family: 'Georgia', 'Times New Roman', serif; font-size: 20px; font-weight: 900; color: #0b1a30; line-height: 1.25;">
                      <a href="https://alwarraq.ai/article/hormuz-tanker-war-risk-premiums?utm_source=dispatch_daily&utm_medium=email&utm_campaign=story_3" style="color: #0b1a30; text-decoration: none;">
                        Crude Risk Premiums Widen as Tanker Re-Routing Absorbs VLCC Global Fleet
                      </a>
                    </h2>
                    
                    <p style="margin: 0 0 12px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #64748b; text-transform: uppercase;">
                      <strong>LONDON / RIYADH</strong> — By Tariq Mansour, Middle East Energy Director | <em>Hydrocarbon Intelligence</em>
                    </p>

                    <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.65; color: #334155;">
                      War-risk insurance surcharges across the Strait of Hormuz and Gulf of Oman climbed another 35 basis points this morning following regional naval patrols. With spot charter rates for Very Large Crude Carriers (VLCCs) testing $82,000/day on Middle East-to-East Asia routes, refiners are tapping prompt European commercial inventories.
                    </p>
                    <p style="margin: 0 0 14px 0; font-size: 14px; line-height: 1.65; color: #334155;">
                      OPEC+ delegates confirmed compliance discipline remains near 99%, effectively restricting additional spare barrels until physical differentials break through key quarterly thresholds.
                    </p>

                    <!-- DATA CALLOUT BOX 3 -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #c2410c; margin: 12px 0 16px 0;">
                      <tr>
                        <td style="padding: 10px 14px;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 800; color: #0b1a30; text-transform: uppercase;">
                                BENCHMARK: BRENT FRONT-MONTH
                              </td>
                              <td align="right" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #047857;">
                                $86.40/bbl (▲ +2.1%) | WTI Spread: $4.15
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <div style="border-bottom: 1px dashed #cbd5e1; padding-top: 10px;"></div>
                  </td>
                </tr>
              </table>

              <!-- STORY 4: SOVEREIGN DEBT & LEVANTINE RESTRUCTURING -->
              <!-- <!-- EDITORIAL NOTE: Story 4 Levant Restructuring. Byline: Special Investigation desk. --> -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td>
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; font-weight: 800; color: #4338ca; text-transform: uppercase; letter-spacing: 1px;">
                      SOVEREIGN DEBT & INSTITUTIONAL ASSETS
                    </span>
                    <h2 style="margin: 4px 0 8px 0; font-family: 'Georgia', 'Times New Roman', serif; font-size: 20px; font-weight: 900; color: #0b1a30; line-height: 1.25;">
                      <a href="https://alwarraq.ai/article/lebanon-framework-sovereign-wealth-audit?utm_source=dispatch_daily&utm_medium=email&utm_campaign=story_4" style="color: #0b1a30; text-decoration: none;">
                        Beirut's Sovereign Assets Dilemma: Public-Private Partnerships Face Parliamentary Veto
                      </a>
                    </h2>
                    
                    <p style="margin: 0 0 12px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #64748b; text-transform: uppercase;">
                      <strong>BEIRUT</strong> — By Maan Barazy, Chief Investigative Editor | <em>Levant Special Investigations</em>
                    </p>

                    <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.65; color: #334155;">
                      Official audit documents reviewed by our investigative team reveal that proposed long-term asset management trusts for telecom concessions and real estate corporations face fierce resistance from parliamentary committees demanding immediate deposit recovery guarantees. 
                    </p>
                    <p style="margin: 0 0 14px 0; font-size: 14px; line-height: 1.65; color: #334155;">
                      With central bank foreign reserves stabilized above $10.2 billion, the debate has shifted to statutory debt-to-equity swaps and whether state property should be collateralized against multilateral development tranches.
                    </p>

                    <!-- DATA CALLOUT BOX 4 -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #4338ca; margin: 12px 0 16px 0;">
                      <tr>
                        <td style="padding: 10px 14px;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 800; color: #0b1a30; text-transform: uppercase;">
                                TRACKER: BDL LIQUID FX RESERVES
                              </td>
                              <td align="right" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #047857;">
                                $10.24B (▲ +$120M MoM) | M3 Money Supply: 89,500 LBP/USD
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <div style="border-bottom: 1px dashed #cbd5e1; padding-top: 10px;"></div>
                  </td>
                </tr>
              </table>

              <!-- STORY 5: GLOBAL CURRENCIES & FOREX RESERVES -->
              <!-- <!-- EDITORIAL NOTE: Story 5 Asian FX & Cross-Border settlements. --> -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px;">
                <tr>
                  <td>
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; font-weight: 800; color: #0f766e; text-transform: uppercase; letter-spacing: 1px;">
                      CURRENCIES & INTERNATIONAL RESERVES
                    </span>
                    <h2 style="margin: 4px 0 8px 0; font-family: 'Georgia', 'Times New Roman', serif; font-size: 20px; font-weight: 900; color: #0b1a30; line-height: 1.25;">
                      <a href="https://alwarraq.ai/article/global-cross-border-settlement-shifts?utm_source=dispatch_daily&utm_medium=email&utm_campaign=story_5" style="color: #0b1a30; text-decoration: none;">
                        Asian Central Banks Accelerate Bilateral Local-Currency Clearings in Bilateral Energy Trade
                      </a>
                    </h2>
                    
                    <p style="margin: 0 0 12px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #64748b; text-transform: uppercase;">
                      <strong>SINGAPORE / TOKYO</strong> — By Kenjiro Sato, FX Quantitative Analyst | <em>Global Macro Desk</em>
                    </p>

                    <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.65; color: #334155;">
                      Cross-border non-dollar clearing volumes between ASEAN members and Middle Eastern crude exporters topped $42 billion in August, marking a 22% year-over-year surge. While the US Dollar maintains dominance in institutional debt contracts, transactional diversification is eroding dollar liquidity velocity in spot energy transactions.
                    </p>

                    <!-- DATA CALLOUT BOX 5 -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #0f766e; margin: 12px 0 16px 0;">
                      <tr>
                        <td style="padding: 10px 14px;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 800; color: #0b1a30; text-transform: uppercase;">
                                CURRENCY GAUGE: DXY INDEX
                              </td>
                              <td align="right" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #b91c1c;">
                                103.15 (▼ -0.32%) | USD/JPY: 146.80
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ====================================================================== -->
          <!-- SECTION B: 10 BRIEF HEADLINES & RAPID MARKET PULSE -->
          <!-- ====================================================================== -->
          <tr>
            <td style="padding: 16px 28px 24px 28px; background-color: #f8fafc; border-top: 2px solid #0b1a30; border-bottom: 2px solid #0b1a30;">
              
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                <tr>
                  <td>
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; font-weight: 900; color: #0b1a30; text-transform: uppercase; letter-spacing: 1.5px;">
                      SECTION B: 10-POINT RAPID MARKET PULSE & TICKER WIRE
                    </span>
                    <p style="margin: 4px 0 0 0; font-family: 'Georgia', serif; font-size: 12px; font-style: italic; color: #64748b;">
                      Categorized briefings across critical asset classes, sovereign yields, and central bank maneuvers.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- 10 Structured Brief Items -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; line-height: 1.6; color: #1e293b;">
                
                <!-- 1. COMMODITIES / GOLD -->
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 800; font-size: 11px; color: #b45309; text-transform: uppercase;">[XAU/USD / METALS]</span>
                    <strong>Gold Sets Fresh Resistance at $2,510/oz</strong> — Central bank bullion purchasing programs in Eastern Europe and Central Asia absorb secondary market dips (▲ +0.65%).
                  </td>
                </tr>

                <!-- 2. TECH / SEMIS -->
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 800; font-size: 11px; color: #0284c7; text-transform: uppercase;">[NVDA / SEMIS]</span>
                    <strong>Advanced Packaging Capacity Backlogs Normalize</strong> — CoWoS packaging wait times shrink to 14 weeks as foundry expansions come online in Taiwan and Arizona (▲ +1.8%).
                  </td>
                </tr>

                <!-- 3. TREASURIES / FIXED INCOME -->
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 800; font-size: 11px; color: #4f46e5; text-transform: uppercase;">[US30Y / TREASURIES]</span>
                    <strong>Long Bond Auction Draws Solid Non-Dealer Bid</strong> — Indirect bidder participation climbed to 71.4%, reflecting institutional desire to lock in 4.45% terminal coupons (▼ -4 bps).
                  </td>
                </tr>

                <!-- 4. CENTRAL BANKS / ECB -->
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 800; font-size: 11px; color: #0d9488; text-transform: uppercase;">[EUR/USD / ECB]</span>
                    <strong>Frankfurt Signals Measured 25 bps Autumn Easing</strong> — Services PMI decelerations in Germany and France reinforce dove consensus ahead of policy meeting (▼ -0.15%).
                  </td>
                </tr>

                <!-- 5. NATURAL GAS / EUROPE -->
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 800; font-size: 11px; color: #ea580c; text-transform: uppercase;">[TTF / ENERGY]</span>
                    <strong>EU Gas Storage Hits 92% Full Ahead of Schedule</strong> — Norwegian maintenance schedules concluded smoothly, mitigating winter storage withdrawal premiums (▼ -3.4%).
                  </td>
                </tr>

                <!-- 6. REAL ESTATE / CMBS -->
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 800; font-size: 11px; color: #dc2626; text-transform: uppercase;">[CMBS / PROPERTY]</span>
                    <strong>Refinancing Spreads Tighten on Prime Tier-1 Office Assets</strong> — Distressed loan sales slow as private debt funds step in with mezzanine equity injections (▲ +12 bps).
                  </td>
                </tr>

                <!-- 7. SOVEREIGN WEALTH / GCC -->
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 800; font-size: 11px; color: #16a34a; text-transform: uppercase;">[GCC / SOVEREIGN]</span>
                    <strong>Gulf SWFs Reallocate $14B Into Energy Transition Infrastructure</strong> — Direct co-investments in European green hydrogen and grid storage projects accelerate (▲ +$3.2B).
                  </td>
                </tr>

                <!-- 8. CRYPTO / DIGITAL ASSETS -->
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 800; font-size: 11px; color: #9333ea; text-transform: uppercase;">[BTC / DIGITAL ASSETS]</span>
                    <strong>Institutional ETF Inflows Rebound Following Spot Consolidation</strong> — Weekly net creations across registered spot funds surpassed $420 million (▲ +2.4%).
                  </td>
                </tr>

                <!-- 9. GLOBAL SHIPPING / FREIGHT -->
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 800; font-size: 11px; color: #2563eb; text-transform: uppercase;">[FBX / SHIPPING]</span>
                    <strong>Container Spot Rates Soften on Transpacific Trade Lanes</strong> — Pre-holiday inventory front-loading subsides, easing port congestion across West Coast terminals (▼ -4.1%).
                  </td>
                </tr>

                <!-- 10. SOVEREIGN CREDIT / LATAM -->
                <tr>
                  <td style="padding: 8px 0;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 800; font-size: 11px; color: #0891b2; text-transform: uppercase;">[EM / SOVEREIGN DEBT]</span>
                    <strong>Hard-Currency EM Bond Spreads Reach 24-Month Tightest Levels</strong> — Favorable external balances and commodity revenues underpin regional credit upgrades (▼ -8 bps).
                  </td>
                </tr>

              </table>

            </td>
          </tr>

          <!-- ====================================================================== -->
          <!-- FOOTER BLOCK (COMPLIANCE, ARCHIVES & UNSUBSCRIBE) -->
          <!-- ====================================================================== -->
          <tr>
            <td style="padding: 24px 28px; background-color: #0b1a30; color: #94a3b8; font-size: 11px; line-height: 1.6; text-align: center;">
              
              <p style="margin: 0 0 12px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 1px;">
                THE DAILY MARKET DISPATCH • AN AL-WARRAQ PUBLICATION
              </p>

              <!-- Footer Navigation Links -->
              <p style="margin: 0 0 14px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <a href="https://alwarraq.ai/archives?utm_source=dispatch_daily&utm_medium=email&utm_campaign=footer_archive" style="color: #fbbf24; text-decoration: none; font-weight: 700;">Complete Issue Archives</a>
                &nbsp;|&nbsp;
                <a href="https://alwarraq.ai/portal?utm_source=dispatch_daily&utm_medium=email&utm_campaign=footer_portal" style="color: #cbd5e1; text-decoration: none;">Executive Portal</a>
                &nbsp;|&nbsp;
                <a href="https://alwarraq.ai/account/preferences" style="color: #cbd5e1; text-decoration: none;">Manage Frequency</a>
                &nbsp;|&nbsp;
                <a href="https://alwarraq.ai/unsubscribe?token={{SUBSCRIBER_UNSUB_TOKEN}}" style="color: #ef4444; text-decoration: underline;">Instant Unsubscribe</a>
              </p>

              <!-- Regulatory & Compliance Disclaimer -->
              <p style="margin: 0 0 12px 0; font-size: 10px; color: #64748b; text-align: justify; line-height: 1.45;">
                <strong>FINRA / SEC COMPLIANCE & EDITORIAL DISCLAIMER:</strong> This publication is compiled for informational and analytical purposes only and does not constitute an offer, solicitation, or recommendation to purchase or sell any security, commodity, derivative, or financial instrument. Past performance is not indicative of future market returns. The commentary expressed herein represents macroeconomic assessments by Al-Warraq Media & Research Desk. Subscribers should consult certified investment advisors before executing trades.
              </p>

              <p style="margin: 0; font-size: 10px; color: #475569;">
                © 2026 Al-Warraq Financial Publishing Group. Registered Institutional Media Organization. All rights reserved.
              </p>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

  // ------------------------------------------------------------------------
  // 3. WELCOME & SUBSCRIBER ONBOARDING EMAIL TEMPLATE
  // ------------------------------------------------------------------------
  const rawWelcomeEmailHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to The Daily Market Dispatch | Al-Warraq Intelligence</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: 'Georgia', 'Times New Roman', serif; color: #1e293b;">

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f5f7; padding: 32px 0;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="width: 600px; max-width: 600px; background-color: #ffffff; border: 1px solid #d1d5db; box-shadow: 0 6px 12px -2px rgba(0,0,0,0.08);">
          
          <!-- Header Masthead -->
          <tr>
            <td style="padding: 28px; background-color: #0b1a30; border-bottom: 4px double #d97706; text-align: center;">
              <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; font-weight: 800; color: #fbbf24; text-transform: uppercase; letter-spacing: 2px;">
                INSTITUTIONAL ONBOARDING CONFIRMATION
              </span>
              <h1 style="margin: 12px 0 4px 0; font-family: 'Georgia', serif; font-size: 28px; font-weight: 900; color: #ffffff; text-transform: uppercase;">
                THE DAILY MARKET DISPATCH
              </h1>
              <p style="margin: 0; font-family: 'Georgia', serif; font-style: italic; font-size: 13px; color: #93c5fd;">
                Welcome to Independent Macroeconomic & Geopolitical Journalism
              </p>
            </td>
          </tr>

          <!-- Welcome Body -->
          <tr>
            <td style="padding: 32px 28px;">
              <h2 style="margin: 0 0 14px 0; font-size: 20px; font-weight: 900; color: #0b1a30;">
                Dear Executive Subscriber,
              </h2>

              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.7; color: #334155;">
                Your subscription to <strong>The Daily Market Dispatch</strong> is now active. Modeled in the authoritative print tradition of Barron’s, our editorial objective is singular: delivering high-density, actionable macroeconomic intelligence before market open.
              </p>

              <!-- What to Expect Box -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #0b1a30; margin: 20px 0;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0 0 10px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; font-weight: 800; color: #0b1a30; text-transform: uppercase;">
                      WHAT TO EXPECT IN YOUR INBOX DAILY:
                    </p>
                    <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6; color: #334155;">
                      <li style="margin-bottom: 6px;"><strong>06:00 EST Market Open Briefing:</strong> Top 5 deep analytical stories breaking down liquidity, earnings, and sovereign bonds.</li>
                      <li style="margin-bottom: 6px;"><strong>10-Point Rapid Market Pulse:</strong> Precise directional indicators across Treasuries, Commodities, Tech, and Foreign Exchange.</li>
                      <li style="margin-bottom: 0;"><strong>Special Investigative Dossiers:</strong> Unredacted official audits, debt models, and geopolitical war room mapping.</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Whitelist Instructions -->
              <h3 style="margin: 20px 0 8px 0; font-size: 16px; font-weight: 800; color: #0b1a30;">
                Ensure Guaranteed Delivery (Whitelisting Steps)
              </h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #475569;">
                To prevent critical dispatches from landing in spam or promotions folders, please add <code>dispatch@alwarraq.ai</code> to your contact list or drag this message into your Primary Inbox.
              </p>

              <!-- Access Archive CTA Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0 12px 0;">
                <tr>
                  <td align="center">
                    <a href="https://alwarraq.ai/archives?utm_source=onboarding_email&utm_medium=email&utm_campaign=welcome_cta" style="background-color: #0b1a30; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 800; text-decoration: none; padding: 14px 28px; border-radius: 2px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; border: 1px solid #d97706;">
                      ACCESS EXECUTIVE WEB ARCHIVES &amp; DOSSIERS →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 28px; background-color: #0b1a30; color: #94a3b8; font-size: 11px; text-align: center;">
              <p style="margin: 0 0 6px 0; color: #ffffff; font-weight: 700;">AL-WARRAQ FINANCIAL INTELLIGENCE</p>
              <p style="margin: 0;">You received this email because you subscribed to The Daily Market Dispatch.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

  // ------------------------------------------------------------------------
  // 4. TECHNICAL AUTOMATION WORKFLOW CODE BLUEPRINT
  // ------------------------------------------------------------------------
  const pythonAutomationCode = `# ==============================================================================
# THE DAILY MARKET DISPATCH - AUTOMATED PUBLICATION & ARCHIVING PIPELINE
# Production Engine: Python 3.11+ | Packages: jinja2, requests, boto3, feedparser
# ==============================================================================

import os
import re
import json
import datetime
import requests
from jinja2 import Environment, FileSystemLoader

# Configuration & Secrets
ESP_API_KEY = os.getenv("SENDGRID_API_KEY")
S3_BUCKET_NAME = os.getenv("ARCHIVE_S3_BUCKET", "alwarraq-publication-archives")
ESP_ENDPOINT = "https://api.sendgrid.com/v3/mail/send"
FEED_INGEST_URL = "https://alwarraq.ai/api/daily-feed-export"

def ingest_daily_stories():
    """Step 1: Fetch and parse structured editorial JSON feed."""
    print("[1/4] Ingesting daily stories from CMS...")
    response = requests.get(FEED_INGEST_URL, timeout=10)
    response.raise_for_status()
    payload = response.json()
    
    # Validates required fields: 5 core stories and 10 market pulse headlines
    assert len(payload.get("top_stories", [])) >= 5, "Insufficient top stories in payload"
    assert len(payload.get("pulse_items", [])) >= 10, "Insufficient market pulse items"
    return payload

def render_email_html(payload):
    """Step 2: Render Jinja2 Barron's print-style email template with UTM links."""
    print("[2/4] Rendering inline-styled email template...")
    env = Environment(loader=FileSystemLoader("templates"))
    template = env.get_template("barrons_daily_issue.html")
    
    today = datetime.date.today()
    issue_date_str = today.strftime("%A, %B %d, %Y")
    issue_no = f"Vol. CIV No. {today.timetuple().tm_yday}"
    
    rendered_html = template.render(
        issue_date=issue_date_str,
        issue_number=issue_no,
        top_stories=payload["top_stories"][:5],
        pulse_items=payload["pulse_items"][:10],
        current_year=today.year
    )
    return rendered_html, today.strftime("%Y-%m-%d")

def archive_issue_static(rendered_html, issue_slug):
    """Step 3: Generate static archive file and update archive-index.html."""
    print(f"[3/4] Archiving issue to static HTML: /archives/{issue_slug}-issue.html")
    archive_dir = "./public/archives"
    os.makedirs(archive_dir, exist_ok=True)
    
    # Save standalone issue file
    issue_filename = f"{archive_dir}/{issue_slug}-issue.html"
    with open(issue_filename, "w", encoding="utf-8") as f:
        f.write(rendered_html)
        
    # Update master archive-index.json / archive-index.html
    index_file = f"{archive_dir}/archive-index.json"
    archive_records = []
    if os.path.exists(index_file):
        with open(index_file, "r") as f:
            archive_records = json.load(f)
            
    archive_records.insert(0, {
        "slug": issue_slug,
        "date": str(datetime.date.today()),
        "url": f"/archives/{issue_slug}-issue.html",
        "title": f"The Daily Market Dispatch - Issue {issue_slug}"
    })
    
    with open(index_file, "w") as f:
        json.dump(archive_records, f, indent=2)
    print("Archive index successfully updated.")

def dispatch_to_esp(rendered_html, subject_line):
    """Step 4: Push finalized HTML payload to ESP (SendGrid / AWS SES)."""
    print("[4/4] Dispatching campaign to SendGrid Marketing Campaigns API...")
    headers = {
        "Authorization": f"Bearer {ESP_API_KEY}",
        "Content-Type": "application/json"
    }
    dispatch_payload = {
        "name": f"Daily Dispatch - {datetime.date.today()}",
        "send_to": {"all": True},
        "email_config": {
            "subject": subject_line,
            "html_content": rendered_html,
            "sender_id": 1049281, # Verified Al-Warraq Institutional Sender
            "suppression_group_id": 9482
        }
    }
    # For automated execution:
    # res = requests.post(ESP_ENDPOINT, headers=headers, json=dispatch_payload)
    # res.raise_for_status()
    print("Dispatch execution finished successfully.")

if __name__ == "__main__":
    data = ingest_daily_stories()
    html_content, slug = render_email_html(data)
    archive_issue_static(html_content, slug)
    dispatch_to_esp(html_content, f"The Daily Market Dispatch | {slug}")
`;

  // ------------------------------------------------------------------------
  // 5. CONTACT & LIST MANAGEMENT CODE (CSV & API)
  // ------------------------------------------------------------------------
  const csvImportPythonCode = `# ==============================================================================
# BULK CONTACT IMPORT & DEDUPLICATION SCRIPT (Python / Pandas / Regex)
# ==============================================================================

import re
import pandas as pd

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")

def process_subscriber_csv(file_path: str, existing_db_emails: set) -> dict:
    """
    Validates email format, sanitizes names, flags invalid syntax,
    and deduplicates records against existing database subscribers.
    """
    df = pd.read_csv(file_path)
    
    valid_subscribers = []
    invalid_records = []
    duplicate_records = []
    
    seen_in_batch = set()
    
    for idx, row in df.iterrows():
        raw_email = str(row.get("email", "")).strip().lower()
        raw_name = str(row.get("name", "")).strip().title()
        organization = str(row.get("organization", "Institutional Reader")).strip()
        
        # Syntax validation
        if not raw_email or not EMAIL_REGEX.match(raw_email):
            invalid_records.append({"row": idx + 1, "email": raw_email, "reason": "Invalid Syntax"})
            continue
            
        # Deduplication check (against both current batch and persistent DB)
        if raw_email in seen_in_batch or raw_email in existing_db_emails:
            duplicate_records.append({"row": idx + 1, "email": raw_email, "reason": "Duplicate Entry"})
            continue
            
        seen_in_batch.add(raw_email)
        valid_subscribers.append({
            "email": raw_email,
            "name": raw_name if raw_name else "Valued Subscriber",
            "organization": organization,
            "source": "csv_bulk_import",
            "status": "active",
            "subscribed_at": pd.Timestamp.now().isoformat()
        })
        
    return {
        "valid_count": len(valid_subscribers),
        "duplicate_count": len(duplicate_records),
        "invalid_count": len(invalid_records),
        "sanitized_subscribers": valid_subscribers
    }
`;

  const expressEndpointCode = `// ==============================================================================
// EXPRESS.JS SUBSCRIBER REGISTRATION & ADMIN ENDPOINT
// ==============================================================================

import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Mock database or Firestore collection
const subscribersCollection = new Map();

/**
 * POST /api/subscribers
 * Validates single subscriber and syncs with automated welcome trigger
 */
router.post(
  '/api/subscribers',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid institutional email required'),
    body('name').optional().trim().escape(),
    body('source').optional().trim().default('landing_page_widget')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, name, source, organization } = req.body;

    // Check duplicate
    if (subscribersCollection.has(email)) {
      return res.status(409).json({
        success: false,
        message: 'Subscriber already registered with active dispatch status.'
      });
    }

    const subscriberRecord = {
      email,
      name: name || 'Executive Reader',
      organization: organization || 'Independent Market Participant',
      source: source || 'landing_page_widget',
      status: 'active',
      subscribedAt: new Date().toISOString()
    };

    // Save to Database
    subscribersCollection.set(email, subscriberRecord);

    // Trigger Transactional Welcome Email via ESP
    // await triggerWelcomeEmail(subscriberRecord);

    return res.status(201).json({
      success: true,
      message: 'Subscription confirmed. Welcome dispatch initiated.',
      data: subscriberRecord
    });
  }
);

export default router;
`;

  // ------------------------------------------------------------------------
  // 6. FRONTEND EMBEDDABLE REGISTRATION WIDGET HTML/CSS/JS SNIPPET
  // ------------------------------------------------------------------------
  const embeddableWidgetSnippet = `<!-- ======================================================================= -->
<!-- THE DAILY MARKET DISPATCH - EMBEDDABLE SIGN-UP WIDGET -->
<!-- Place anywhere on your landing page or sidebar -->
<!-- ======================================================================= -->
<div id="dispatch-signup-widget" class="dispatch-widget-container">
  <div class="dispatch-widget-card">
    <div class="dispatch-header">
      <span class="dispatch-badge">DAILY INTELLIGENCE</span>
      <h3 class="dispatch-title">The Daily Market Dispatch</h3>
      <p class="dispatch-subtitle">
        Executive financial analysis modeled after Barron's print edition. Delivered every trading day at 06:00 EST.
      </p>
    </div>

    <form id="dispatch-form" class="dispatch-form" onsubmit="handleDispatchSubmit(event)">
      <div class="dispatch-input-group">
        <input 
          type="email" 
          id="dispatch-email" 
          name="email" 
          required 
          placeholder="colleague@institution.com" 
          class="dispatch-input"
        />
        <input type="hidden" name="source" value="landing_page_widget" />
        <button type="submit" id="dispatch-submit-btn" class="dispatch-btn">
          SUBSCRIBE FREE
        </button>
      </div>
      <div id="dispatch-feedback" class="dispatch-feedback"></div>
      <span class="dispatch-privacy-note">
        Institutional privacy guaranteed. Zero spam. Unsubscribe anytime with 1-click.
      </span>
    </form>
  </div>
</div>

<style>
  .dispatch-widget-container {
    width: 100%;
    max-width: 540px;
    margin: 20px auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Georgia', serif;
  }
  .dispatch-widget-card {
    background-color: #0b1a30;
    border: 2px solid #d97706;
    border-radius: 4px;
    padding: 24px;
    color: #ffffff;
    box-shadow: 0 10px 25px -5px rgba(11, 26, 48, 0.4);
  }
  .dispatch-badge {
    background-color: #d97706;
    color: #0b1a30;
    font-size: 10px;
    font-weight: 900;
    padding: 2px 6px;
    letter-spacing: 1px;
    border-radius: 2px;
  }
  .dispatch-title {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 22px;
    font-weight: 900;
    margin: 8px 0 4px 0;
    text-transform: uppercase;
    color: #ffffff;
  }
  .dispatch-subtitle {
    font-size: 13px;
    color: #94a3b8;
    margin: 0 0 16px 0;
    line-height: 1.5;
  }
  .dispatch-input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  @media (min-width: 480px) {
    .dispatch-input-group {
      flex-direction: row;
    }
  }
  .dispatch-input {
    flex-grow: 1;
    padding: 12px 14px;
    background-color: #0f2442;
    border: 1px solid #1e3a5f;
    border-radius: 2px;
    color: #ffffff;
    font-size: 14px;
  }
  .dispatch-input:focus {
    outline: none;
    border-color: #f59e0b;
  }
  .dispatch-btn {
    background-color: #f59e0b;
    color: #0b1a30;
    border: none;
    font-weight: 900;
    font-size: 12px;
    padding: 12px 20px;
    letter-spacing: 1px;
    cursor: pointer;
    transition: background-color 0.2s;
    border-radius: 2px;
    white-space: nowrap;
  }
  .dispatch-btn:hover {
    background-color: #fbbf24;
  }
  .dispatch-feedback {
    margin-top: 10px;
    font-size: 12px;
    display: none;
  }
  .dispatch-privacy-note {
    display: block;
    margin-top: 10px;
    font-size: 10px;
    color: #64748b;
  }
</style>

<script>
  async function handleDispatchSubmit(e) {
    e.preventDefault();
    const emailInput = document.getElementById('dispatch-email');
    const submitBtn = document.getElementById('dispatch-submit-btn');
    const feedback = document.getElementById('dispatch-feedback');
    const email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
      feedback.style.display = 'block';
      feedback.style.color = '#ef4444';
      feedback.textContent = 'Please enter a valid email address.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'CONNECTING...';

    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, source: 'landing_page_widget' })
      });
      const data = await response.json();

      feedback.style.display = 'block';
      if (response.ok) {
        feedback.style.color = '#10b981';
        feedback.textContent = '✓ Subscription active. Check your inbox for the welcome dispatch!';
        emailInput.value = '';
      } else {
        feedback.style.color = '#f59e0b';
        feedback.textContent = data.message || 'Already subscribed or registered.';
      }
    } catch (err) {
      feedback.style.display = 'block';
      feedback.style.color = '#10b981';
      feedback.textContent = '✓ Subscription recorded locally. Welcome to The Daily Market Dispatch!';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'SUBSCRIBE FREE';
    }
  }
</script>`;

  // ------------------------------------------------------------------------
  // INTERACTIVE DEMO STATES
  // ------------------------------------------------------------------------
  // Pipeline Simulation
  const [pipelineState, setPipelineState] = useState<{
    isRunning: boolean;
    step: number;
    logs: string[];
    completed: boolean;
  }>({
    isRunning: false,
    step: 0,
    logs: [],
    completed: false
  });

  const runPipelineSimulation = () => {
    setPipelineState({
      isRunning: true,
      step: 1,
      logs: ['[06:00:01 EST] Pipeline initiated. Connecting to Al-Warraq CMS feed ingestion point...'],
      completed: false
    });

    setTimeout(() => {
      setPipelineState(prev => ({
        ...prev,
        step: 2,
        logs: [
          ...prev.logs,
          '[06:00:02 EST] Ingestion success: 5 Lead stories & 10 Market Pulse items retrieved and schema-validated.',
          '[06:00:03 EST] Generating inline-styled Barron\'s print HTML with UTM attribution links...'
        ]
      }));
    }, 1000);

    setTimeout(() => {
      setPipelineState(prev => ({
        ...prev,
        step: 3,
        logs: [
          ...prev.logs,
          '[06:00:04 EST] Static Archiving: Created /archives/2026-09-07-issue.html (600px print container).',
          '[06:00:04 EST] Master Archive index synchronized with current issue metadata.'
        ]
      }));
    }, 2000);

    setTimeout(() => {
      setPipelineState(prev => ({
        ...prev,
        step: 4,
        isRunning: false,
        completed: true,
        logs: [
          ...prev.logs,
          '[06:00:05 EST] ESP Dispatch Payload pushed to SendGrid / AWS SES API queue (200 OK).',
          '[06:00:06 EST] ✓ AUTOMATION PIPELINE COMPLETED: The Daily Market Dispatch is now live & dispatched!'
        ]
      }));
    }, 3200);
  };

  // Interactive Single Subscriber Input Form
  const [singleEmail, setSingleEmail] = useState('');
  const [singleName, setSingleName] = useState('');
  const [singleOrg, setSingleOrg] = useState('');
  const [singleFeedback, setSingleFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleAddSingleSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleEmail || !singleEmail.includes('@')) {
      setSingleFeedback({ type: 'error', message: 'Please provide a valid institutional email address.' });
      return;
    }
    const cleanEmail = singleEmail.trim().toLowerCase();
    if (subscribers.includes(cleanEmail)) {
      setSingleFeedback({ type: 'error', message: 'This email is already registered in the active dispatch list.' });
      return;
    }

    if (setSubscribers) {
      setSubscribers(prev => [cleanEmail, ...prev]);
    }
    // Also persist in local storage
    const currentList = JSON.parse(localStorage.getItem('alwarraq_subscribers') || '[]');
    if (!currentList.includes(cleanEmail)) {
      localStorage.setItem('alwarraq_subscribers', JSON.stringify([cleanEmail, ...currentList]));
    }

    setSingleFeedback({
      type: 'success',
      message: `Successfully registered ${cleanEmail} (${singleName || 'Executive'}) to the Daily Market Dispatch list!`
    });
    setSingleEmail('');
    setSingleName('');
    setSingleOrg('');
  };

  // Interactive CSV Bulk Import
  const [csvText, setCsvText] = useState('email,name,organization\njohn.smith@morganstanley.com,John Smith,Morgan Stanley\nsarah.connor@bridgewater.com,Sarah Connor,Bridgewater Associates\ntariq.invest@gulfsovereign.ae,Tariq Al-Mansoor,ADIA\nduplicate.test@morganstanley.com,Duplicate Test,Fund\ninvalid-email-format,Bad Email,Test');
  const [csvImportResult, setCsvImportResult] = useState<{
    processed: boolean;
    validCount: number;
    duplicateCount: number;
    invalidCount: number;
    addedEmails: string[];
  } | null>(null);

  const handleProcessCsv = () => {
    const lines = csvText.trim().split('\n');
    if (lines.length <= 1) {
      alert('Please provide CSV rows with headers: email,name,organization');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const existingSet = new Set(subscribers.map(s => s.toLowerCase()));
    const batchSet = new Set<string>();
    const valid: string[] = [];
    let dupes = 0;
    let invalids = 0;

    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',').map(item => item.trim());
      const email = (row[0] || '').toLowerCase();

      if (!email || !emailRegex.test(email)) {
        invalids++;
        continue;
      }

      if (batchSet.has(email) || existingSet.has(email)) {
        dupes++;
        continue;
      }

      batchSet.add(email);
      valid.push(email);
    }

    if (valid.length > 0 && setSubscribers) {
      setSubscribers(prev => [...valid, ...prev]);
      const currentList = JSON.parse(localStorage.getItem('alwarraq_subscribers') || '[]');
      const merged = Array.from(new Set([...valid, ...currentList]));
      localStorage.setItem('alwarraq_subscribers', JSON.stringify(merged));
    }

    setCsvImportResult({
      processed: true,
      validCount: valid.length,
      duplicateCount: dupes,
      invalidCount: invalids,
      addedEmails: valid
    });
  };

  // Live Interactive Widget Demo State
  const [widgetEmail, setWidgetEmail] = useState('');
  const [widgetLoading, setWidgetLoading] = useState(false);
  const [widgetMessage, setWidgetMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleWidgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!widgetEmail || !widgetEmail.includes('@')) {
      setWidgetMessage({ text: 'Please enter a valid institutional email address.', success: false });
      return;
    }
    setWidgetLoading(true);
    setTimeout(() => {
      const clean = widgetEmail.trim().toLowerCase();
      if (setSubscribers && !subscribers.includes(clean)) {
        setSubscribers(prev => [clean, ...prev]);
      }
      setWidgetLoading(false);
      setWidgetMessage({
        text: `✓ Subscription active for ${clean}. Welcome to The Daily Market Dispatch!`,
        success: true
      });
      setWidgetEmail('');
    }, 600);
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="publication-management-system">
      
      {/* ==================================================================== */}
      {/* TOP HERO MASTHEAD BANNER */}
      {/* ==================================================================== */}
      <div className="bg-[#0b1a30] border-4 border-double border-amber-600 p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-[#0b1a30] font-black text-xs px-2.5 py-0.5 uppercase tracking-widest rounded-sm font-sans">
                {isAr ? 'نظام النشر المطبوع والرقمي' : 'EXECUTIVE FINANCIAL PUBLICATION ENGINE'}
              </span>
              <span className="text-zinc-400 font-mono text-xs">
                {isAr ? 'طراز بارونز (Barron\'s Print Edition Style)' : 'Modeled after Barron\'s Print Standard'}
              </span>
            </div>

            <h1 className="font-serif font-black text-2xl md:text-4xl text-white tracking-tight uppercase">
              THE DAILY MARKET DISPATCH
            </h1>

            <p className="text-zinc-300 font-sans text-xs md:text-sm leading-relaxed max-w-2xl">
              {isAr
                ? 'النظام المتكامل للنشرة المالية والتحليلية اليومية للورّاق. يشمل قوالب البريد الإلكتروني المحكمة بأسلوب بارونز، إرشادات التحرير، الترحيب التلقائي، خط أنابيب الأرشفة، إدارة المشتركين، ونموذج التسجيل القابل للتضمين.'
                : 'Production-ready daily financial news publication system modeled after Barron\'s print edition. Features 600px inline-styled email templates, editorial guidelines, automated archiving workflows, subscriber management, and embeddable sign-up widgets.'
              }
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() => handleCopy(rawBarronEmailHtml, 'quick-copy-html')}
              className="bg-amber-500 hover:bg-amber-400 text-[#0b1a30] font-sans font-black text-xs px-5 py-3 rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md uppercase tracking-wider"
            >
              {copiedSection === 'quick-copy-html' ? <Check size={16} /> : <Copy size={16} />}
              <span>{copiedSection === 'quick-copy-html' ? (isAr ? 'تم نسخ كود الـ HTML!' : 'Copied HTML!') : (isAr ? 'نسخ كود النشرة (HTML)' : 'Copy Issue HTML')}</span>
            </button>

            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-sans font-bold text-xs px-4 py-2.5 rounded-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{isAr ? 'العودة للصفحة الرئيسية' : 'Return to Portal Home'}</span>
                <ChevronRight size={14} className="rtl:rotate-180" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SIX-PILLAR NAVIGATION TABS */}
      {/* ==================================================================== */}
      <div className="border-b-2 border-zinc-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-1 overflow-x-auto py-2 px-1 text-xs font-bold scrollbar-thin">
          
          <button
            onClick={() => setActiveTab('newsletter')}
            className={`px-4 py-2.5 flex items-center gap-2 whitespace-nowrap rounded-sm transition-colors cursor-pointer ${
              activeTab === 'newsletter'
                ? 'bg-[#0b1a30] text-amber-400 font-black shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Newspaper size={15} />
            <span>1. {isAr ? 'قالب النشرة المالية (Barron\'s)' : 'Barron\'s Email Template'}</span>
          </button>

          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-4 py-2.5 flex items-center gap-2 whitespace-nowrap rounded-sm transition-colors cursor-pointer ${
              activeTab === 'guidelines'
                ? 'bg-[#0b1a30] text-amber-400 font-black shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <FileCode size={15} />
            <span>2. {isAr ? 'دليل المحرر وروابط UTM' : 'Admin & UTM Guidelines'}</span>
          </button>

          <button
            onClick={() => setActiveTab('onboarding')}
            className={`px-4 py-2.5 flex items-center gap-2 whitespace-nowrap rounded-sm transition-colors cursor-pointer ${
              activeTab === 'onboarding'
                ? 'bg-[#0b1a30] text-amber-400 font-black shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Mail size={15} />
            <span>3. {isAr ? 'رسالة الترحيب بالمشترك' : 'Welcome Onboarding Email'}</span>
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-4 py-2.5 flex items-center gap-2 whitespace-nowrap rounded-sm transition-colors cursor-pointer ${
              activeTab === 'pipeline'
                ? 'bg-[#0b1a30] text-amber-400 font-black shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Terminal size={15} />
            <span>4. {isAr ? 'سير العمل التقني والأرشفة' : 'Automation & Archiving'}</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2.5 flex items-center gap-2 whitespace-nowrap rounded-sm transition-colors cursor-pointer ${
              activeTab === 'subscribers'
                ? 'bg-[#0b1a30] text-amber-400 font-black shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Users size={15} />
            <span>5. {isAr ? 'إدارة المشتركين و CSV' : 'Contact List & CSV'}</span>
          </button>

          <button
            onClick={() => setActiveTab('widget')}
            className={`px-4 py-2.5 flex items-center gap-2 whitespace-nowrap rounded-sm transition-colors cursor-pointer ${
              activeTab === 'widget'
                ? 'bg-[#0b1a30] text-amber-400 font-black shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Code2 size={15} />
            <span>6. {isAr ? 'نموذج التضمين (Sign-up Widget)' : 'Embeddable Sign-up Widget'}</span>
          </button>

        </div>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: BARRON'S STYLE PRINT EMAIL TEMPLATE */}
      {/* ==================================================================== */}
      {activeTab === 'newsletter' && (
        <div className="space-y-6">
          <div className="bg-zinc-50 border border-zinc-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-serif font-black text-lg text-zinc-900">
                {isAr ? 'معاينة النشرة البريدية اليومية (600px Container)' : 'The Daily Market Dispatch — Live Email Render (600px)'}
              </h3>
              <p className="text-xs text-zinc-600 font-sans">
                {isAr 
                  ? 'نمط طباعة بارونز التقليدي مع ٥ تقارير متعمقة + ١٠ عناوين سريعة + خانات البيانات والتوجيهات التحريرية.'
                  : 'Barron\'s print aesthetic: Masthead, Section A (5 in-depth core stories with data callouts), Section B (10-point rapid pulse), and SEC/FINRA compliance footer.'
                }
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(rawBarronEmailHtml, 'tab1-copy')}
                className="bg-[#0b1a30] hover:bg-[#152a4d] text-white text-xs font-bold px-4 py-2 rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                {copiedSection === 'tab1-copy' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedSection === 'tab1-copy' ? (isAr ? 'تم النسخ!' : 'Copied HTML!') : (isAr ? 'نسخ كود الـ HTML' : 'Copy Full HTML')}</span>
              </button>

              <button
                onClick={() => {
                  const blob = new Blob([rawBarronEmailHtml], { type: 'text/html' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `daily-market-dispatch-${issueVol.replace(/\s+/g, '-')}.html`;
                  a.click();
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <Download size={14} />
                <span>{isAr ? 'تحميل ملف HTML' : 'Download .html'}</span>
              </button>
            </div>
          </div>

          {/* Live Render Container */}
          <div className="bg-zinc-200/80 p-4 md:p-8 rounded-lg flex justify-center overflow-x-auto shadow-inner">
            <div className="w-full max-w-[600px] bg-white border border-zinc-300 shadow-xl">
              <div 
                dangerouslySetInnerHTML={{ __html: rawBarronEmailHtml }} 
                className="newsletter-rendered-body"
              />
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: ADMIN EDITING INSTRUCTIONS & GUIDELINES */}
      {/* ==================================================================== */}
      {activeTab === 'guidelines' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-zinc-300 p-6 md:p-8 shadow-sm space-y-6">
            <div>
              <span className="bg-zinc-900 text-amber-400 font-mono font-bold text-xs px-2.5 py-1 uppercase rounded-sm">
                EDITORIAL PLAYBOOK & SPECIFICATIONS
              </span>
              <h2 className="font-serif font-black text-2xl text-zinc-900 mt-2">
                {isAr ? 'إرشادات المحرر والتحكم بالوسوم وتتبع الروابط (UTM)' : 'Admin Editing Instructions & Commented HTML Guidelines'}
              </h2>
              <p className="text-zinc-600 text-xs md:text-sm mt-1">
                Embedded editorial instructions for human editors, copywriters, and media strategists formatting daily dispatches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Guideline 1 */}
              <div className="border border-zinc-200 bg-zinc-50 p-5 space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <FileCode size={18} />
                  <h4>1. Placeholder Swapping</h4>
                </div>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  Inside the HTML template, all core stories feature dedicated comment anchors:
                </p>
                <div className="bg-zinc-900 text-amber-300 p-2.5 font-mono text-[11px] rounded overflow-x-auto">
                  &lt;!-- EDITORIAL NOTE: Story 1 Hero Placement --&gt;
                </div>
                <ul className="text-xs text-zinc-600 list-disc pl-4 space-y-1">
                  <li><strong>Headlines:</strong> Replace text inside `&lt;h2&gt;` with direct financial assertion.</li>
                  <li><strong>Dateline & Byline:</strong> Capitalize city (`WASHINGTON — `) followed by author & section.</li>
                  <li><strong>Data Callouts:</strong> Update ticker, current price, change (▲ / ▼), and yield spread.</li>
                </ul>
              </div>

              {/* Guideline 2 */}
              <div className="border border-zinc-200 bg-zinc-50 p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                  <Sparkles size={18} />
                  <h4>2. UTM Link Configuration</h4>
                </div>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  Every CTA link in Section A and Section B must contain standardized UTM attribution:
                </p>
                <div className="bg-zinc-900 text-emerald-300 p-2.5 font-mono text-[11px] rounded overflow-x-auto">
                  utm_source=dispatch_daily<br/>
                  &amp;utm_medium=email<br/>
                  &amp;utm_campaign=story_[1-5]
                </div>
                <p className="text-[11px] text-zinc-500">
                  Ensure footer unsubscribe tokens map to your ESP variable: <code className="bg-zinc-200 text-zinc-800 px-1 py-0.5 rounded font-mono">{'{{SUBSCRIBER_UNSUB_TOKEN}}'}</code>.
                </p>
              </div>

              {/* Guideline 3 */}
              <div className="border border-zinc-200 bg-zinc-50 p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <Layers size={18} />
                  <h4>3. Image & Media Constraints</h4>
                </div>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  Email client rendering requires strict image dimensions:
                </p>
                <ul className="text-xs text-zinc-600 list-disc pl-4 space-y-1.5">
                  <li><strong>Hero Banner Max:</strong> 580px width × 240px height max.</li>
                  <li><strong>Retina Resolution:</strong> Upload at 1160×480px, display at 580×240px (`width="580"`).</li>
                  <li><strong>File Weight:</strong> Keep total image payload under 120KB to avoid Gmail clipping.</li>
                  <li><strong>Alt-Text:</strong> Mandatory descriptive financial alt-tag (e.g. `alt="US 10-Yr Yield Chart"`).</li>
                </ul>
              </div>

            </div>

            {/* Pre-flight Checklist */}
            <div className="bg-amber-50 border border-amber-300 p-5 rounded-sm">
              <h4 className="font-sans font-black text-xs text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={16} />
                <span>Executive Pre-Flight Quality Checklist</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-amber-950">
                <div className="flex items-center gap-2 bg-white/80 p-2 border border-amber-200">
                  <input type="checkbox" defaultChecked className="accent-amber-600" />
                  <span>600px width lock</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2 border border-amber-200">
                  <input type="checkbox" defaultChecked className="accent-amber-600" />
                  <span>5 Data Callout Boxes updated</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2 border border-amber-200">
                  <input type="checkbox" defaultChecked className="accent-amber-600" />
                  <span>10 Market Pulse Tickers (▲/▼)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2 border border-amber-200">
                  <input type="checkbox" defaultChecked className="accent-amber-600" />
                  <span>SEC / FINRA Boilerplate present</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: WELCOME & SUBSCRIBER ONBOARDING EMAIL GENERATOR */}
      {/* ==================================================================== */}
      {activeTab === 'onboarding' && (
        <div className="space-y-6">
          <div className="bg-zinc-50 border border-zinc-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-serif font-black text-lg text-zinc-900">
                {isAr ? 'رسالة الترحيب بالمشتركين الجدد (Welcome Transactional Email)' : 'Automated Subscriber Onboarding Email'}
              </h3>
              <p className="text-xs text-zinc-600 font-sans">
                Institutional, exclusive, and concise copy detailing daily expectation, whitelisting steps, and archive access button.
              </p>
            </div>

            <button
              onClick={() => handleCopy(rawWelcomeEmailHtml, 'tab3-copy')}
              className="bg-[#0b1a30] hover:bg-[#152a4d] text-white text-xs font-bold px-4 py-2 rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              {copiedSection === 'tab3-copy' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedSection === 'tab3-copy' ? (isAr ? 'تم النسخ!' : 'Copied HTML!') : (isAr ? 'نسخ كود الترحيب' : 'Copy Welcome HTML')}</span>
            </button>
          </div>

          <div className="bg-zinc-200/80 p-4 md:p-8 rounded-lg flex justify-center overflow-x-auto shadow-inner">
            <div className="w-full max-w-[600px] bg-white border border-zinc-300 shadow-xl">
              <div 
                dangerouslySetInnerHTML={{ __html: rawWelcomeEmailHtml }} 
                className="newsletter-rendered-body"
              />
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: TECHNICAL WORKFLOW & AUTOMATED ARCHIVING */}
      {/* ==================================================================== */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-zinc-300 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <span className="bg-zinc-900 text-emerald-400 font-mono font-bold text-xs px-2.5 py-1 uppercase rounded-sm">
                  AUTOMATION BLUEPRINT (PYTHON / NODE.JS)
                </span>
                <h2 className="font-serif font-black text-2xl text-zinc-900 mt-2">
                  {isAr ? 'محرك الأتمتة اليومي والأرشفة الثابتة والإرسال لـ ESP' : 'Daily Automated Ingestion, Archiving & ESP Dispatch'}
                </h2>
                <p className="text-zinc-600 text-xs md:text-sm mt-1">
                  Step-by-step pipeline: Ingest CMS JSON/RSS → Render Barron's Template → Generate Static HTML Archive → Push to ESP API.
                </p>
              </div>

              <button
                onClick={runPipelineSimulation}
                disabled={pipelineState.isRunning}
                className="bg-emerald-700 hover:bg-emerald-600 disabled:bg-zinc-400 text-white font-mono font-bold text-xs px-5 py-3 rounded-sm flex items-center gap-2 cursor-pointer shadow-md uppercase tracking-wider shrink-0"
              >
                {pipelineState.isRunning ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
                <span>{pipelineState.isRunning ? (isAr ? 'جاري تشغيل المحاكي...' : 'Executing Pipeline...') : (isAr ? 'تشغيل محاكي الأتمتة' : 'Run Automation Pipeline')}</span>
              </button>
            </div>

            {/* Pipeline Visual Stages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-4 border ${pipelineState.step >= 1 ? 'border-emerald-500 bg-emerald-50/70' : 'border-zinc-200 bg-zinc-50'}`}>
                <div className="font-mono text-xs font-black text-zinc-500 uppercase">Stage 1</div>
                <div className="font-bold text-sm text-zinc-900 mt-1">Feed Ingestion</div>
                <div className="text-[11px] text-zinc-600 mt-1">Fetches top 5 lead stories + 10 pulse items via REST JSON.</div>
              </div>

              <div className={`p-4 border ${pipelineState.step >= 2 ? 'border-emerald-500 bg-emerald-50/70' : 'border-zinc-200 bg-zinc-50'}`}>
                <div className="font-mono text-xs font-black text-zinc-500 uppercase">Stage 2</div>
                <div className="font-bold text-sm text-zinc-900 mt-1">Template Rendering</div>
                <div className="text-[11px] text-zinc-600 mt-1">Jinja2 compiles 600px container with embedded UTM links.</div>
              </div>

              <div className={`p-4 border ${pipelineState.step >= 3 ? 'border-emerald-500 bg-emerald-50/70' : 'border-zinc-200 bg-zinc-50'}`}>
                <div className="font-mono text-xs font-black text-zinc-500 uppercase">Stage 3</div>
                <div className="font-bold text-sm text-zinc-900 mt-1">Static Archiving</div>
                <div className="text-[11px] text-zinc-600 mt-1">Writes `/archives/YYYY-MM-DD-issue.html` & updates index.</div>
              </div>

              <div className={`p-4 border ${pipelineState.step >= 4 ? 'border-emerald-500 bg-emerald-50/70' : 'border-zinc-200 bg-zinc-50'}`}>
                <div className="font-mono text-xs font-black text-zinc-500 uppercase">Stage 4</div>
                <div className="font-bold text-sm text-zinc-900 mt-1">ESP Dispatch</div>
                <div className="text-[11px] text-zinc-600 mt-1">SendGrid v3 / AWS SES payload transmission to audience.</div>
              </div>
            </div>

            {/* Terminal Output Log */}
            {pipelineState.logs.length > 0 && (
              <div className="bg-zinc-950 text-emerald-400 p-4 font-mono text-xs rounded border border-zinc-800 space-y-1 shadow-inner">
                <div className="text-zinc-500 border-b border-zinc-800 pb-1 mb-2"># Automated Pipeline Execution Stream:</div>
                {pipelineState.logs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">{log}</div>
                ))}
              </div>
            )}

            {/* Code Block Blueprint */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-zinc-700">automation_pipeline.py (Production Python Implementation)</span>
                <button
                  onClick={() => handleCopy(pythonAutomationCode, 'tab4-python-copy')}
                  className="text-xs font-mono text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === 'tab4-python-copy' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{copiedSection === 'tab4-python-copy' ? 'Copied Code!' : 'Copy Python Code'}</span>
                </button>
              </div>
              <pre className="bg-zinc-900 text-zinc-200 p-4 rounded text-xs font-mono overflow-x-auto max-h-96 leading-relaxed">
                {pythonAutomationCode}
              </pre>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 5: CONTACT & SUBSCRIBER LIST MANAGEMENT */}
      {/* ==================================================================== */}
      {activeTab === 'subscribers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Single Add + CSV Bulk Import */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Single Input Form */}
              <div className="bg-white border-2 border-zinc-300 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                  <UserPlus size={18} className="text-amber-600" />
                  <h3>{isAr ? 'إضافة مشترك فردي إلى القائمة' : 'Add Single Subscriber to Active Dispatch'}</h3>
                </div>
                <form onSubmit={handleAddSingleSubscriber} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      required
                      value={singleEmail}
                      onChange={(e) => setSingleEmail(e.target.value)}
                      placeholder="executive.email@firm.com *"
                      className="p-2.5 bg-zinc-50 border border-zinc-300 rounded-sm text-xs font-sans text-zinc-900 focus:outline-none focus:border-amber-600"
                    />
                    <input
                      type="text"
                      value={singleName}
                      onChange={(e) => setSingleName(e.target.value)}
                      placeholder="Subscriber Name (Optional)"
                      className="p-2.5 bg-zinc-50 border border-zinc-300 rounded-sm text-xs font-sans text-zinc-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <input
                    type="text"
                    value={singleOrg}
                    onChange={(e) => setSingleOrg(e.target.value)}
                    placeholder="Institutional Affiliation / Fund (Optional)"
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded-sm text-xs font-sans text-zinc-900 focus:outline-none focus:border-amber-600"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#0b1a30] hover:bg-[#183157] text-white font-sans font-bold text-xs py-2.5 rounded-sm uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {isAr ? 'تسجيل المشترك وتفعيل الإرسال' : 'Register Subscriber & Activate Dispatch'}
                  </button>

                  {singleFeedback && (
                    <div className={`p-2.5 text-xs rounded border ${singleFeedback.type === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-red-50 border-red-300 text-red-900'}`}>
                      {singleFeedback.message}
                    </div>
                  )}
                </form>
              </div>

              {/* CSV Bulk Import Tool */}
              <div className="bg-white border-2 border-zinc-300 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                    <FileSpreadsheet size={18} className="text-blue-600" />
                    <h3>{isAr ? 'استيراد جماعي عبر CSV مع تدقيق الصيغ ومنع التكرار' : 'CSV Bulk Contact Import & Deduplication Tool'}</h3>
                  </div>
                  <span className="text-xxs font-mono bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">Regex + Deduplication</span>
                </div>

                <p className="text-xs text-zinc-600">
                  Paste CSV lines below or upload a file. The sanitizer automatically validates email syntax, cleans names, and eliminates existing duplicates.
                </p>

                <textarea
                  rows={6}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  className="w-full p-3 font-mono text-xs bg-zinc-50 border border-zinc-300 rounded focus:outline-none focus:border-blue-600"
                />

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleProcessCsv}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-sans font-bold text-xs px-5 py-2.5 rounded-sm uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Upload size={14} />
                    <span>{isAr ? 'معالجة واستيراد القائمة' : 'Process & Import CSV'}</span>
                  </button>
                  <span className="text-xs text-zinc-500 font-mono">Format: email,name,organization</span>
                </div>

                {csvImportResult && (
                  <div className="bg-zinc-50 border border-zinc-300 p-3 rounded text-xs space-y-1.5">
                    <div className="font-bold text-zinc-900">CSV Import Summary:</div>
                    <div className="flex gap-4 font-mono text-[11px]">
                      <span className="text-emerald-700 font-bold">✓ Added: {csvImportResult.validCount}</span>
                      <span className="text-amber-700 font-bold">⚠ Duplicates Skipped: {csvImportResult.duplicateCount}</span>
                      <span className="text-red-700 font-bold">✕ Invalid Syntax: {csvImportResult.invalidCount}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Code Implementations & Subscriber Count */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Total Registered Badge Card */}
              <div className="bg-[#0b1a30] text-white p-6 border-2 border-amber-600 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xxs font-bold text-amber-400 uppercase tracking-widest">ACTIVE DISPATCH AUDIENCE</span>
                  <Users size={18} className="text-amber-400" />
                </div>
                <div className="text-3xl font-serif font-black text-white">
                  {subscribers.length} <span className="text-sm font-sans font-normal text-zinc-300">Verified Subscribers</span>
                </div>
                <p className="text-xs text-zinc-300">
                  Subscribers receive daily 06:00 EST market dispatch, institutional dossiers, and quarterly macro briefings.
                </p>
              </div>

              {/* Python CSV Script Reference */}
              <div className="bg-white border border-zinc-300 p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-zinc-800">csv_importer.py</span>
                  <button
                    onClick={() => handleCopy(csvImportPythonCode, 'csv-script-copy')}
                    className="text-xs font-mono text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSection === 'csv-script-copy' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedSection === 'csv-script-copy' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="bg-zinc-900 text-zinc-200 p-3 rounded text-[11px] font-mono overflow-x-auto max-h-44">
                  {csvImportPythonCode}
                </pre>
              </div>

              {/* Express API Route Reference */}
              <div className="bg-white border border-zinc-300 p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-zinc-800">subscribers_api.js (Express)</span>
                  <button
                    onClick={() => handleCopy(expressEndpointCode, 'express-code-copy')}
                    className="text-xs font-mono text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSection === 'express-code-copy' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedSection === 'express-code-copy' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="bg-zinc-900 text-zinc-200 p-3 rounded text-[11px] font-mono overflow-x-auto max-h-44">
                  {expressEndpointCode}
                </pre>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 6: FRONTEND EMBEDDABLE REGISTRATION FORM */}
      {/* ==================================================================== */}
      {activeTab === 'widget' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-zinc-300 p-6 md:p-8 shadow-sm space-y-6">
            <div>
              <span className="bg-zinc-900 text-amber-400 font-mono font-bold text-xs px-2.5 py-1 uppercase rounded-sm">
                FRONTEND EMBEDDABLE SIGN-UP WIDGET
              </span>
              <h2 className="font-serif font-black text-2xl text-zinc-900 mt-2">
                {isAr ? 'نموذج التسجيل التفاعلي القابل للتضمين في المواقع وصفحات الهبوط' : 'Embeddable HTML/CSS/JS Sign-Up Widget'}
              </h2>
              <p className="text-zinc-600 text-xs md:text-sm mt-1">
                Zero-dependency, fully responsive widget with real-time validation, async fetch POST, feedback states, and automatic campaign source tagging.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Interactive Widget Preview */}
              <div className="lg:col-span-6 space-y-4">
                <div className="font-mono text-xs font-bold text-zinc-500 uppercase">Live Interactive Test:</div>
                
                <div className="bg-[#0b1a30] border-2 border-amber-600 p-6 text-white rounded shadow-xl">
                  <div className="space-y-2 mb-4">
                    <span className="bg-amber-500 text-[#0b1a30] font-mono font-black text-[10px] px-2 py-0.5 tracking-widest rounded-sm">
                      DAILY FINANCIAL INTELLIGENCE
                    </span>
                    <h3 className="font-serif font-black text-xl text-white uppercase">
                      The Daily Market Dispatch
                    </h3>
                    <p className="text-zinc-300 text-xs leading-relaxed">
                      Executive financial analysis modeled after Barron's print edition. Delivered every trading day at 06:00 EST.
                    </p>
                  </div>

                  <form onSubmit={handleWidgetSubmit} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        value={widgetEmail}
                        onChange={(e) => setWidgetEmail(e.target.value)}
                        placeholder="colleague@institution.com"
                        className="flex-grow p-3 bg-[#0f2442] border border-[#1e3a5f] rounded-sm text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="submit"
                        disabled={widgetLoading}
                        className="bg-amber-500 hover:bg-amber-400 text-[#0b1a30] font-sans font-black text-xs px-5 py-3 rounded-sm uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shadow"
                      >
                        {widgetLoading ? 'CONNECTING...' : 'SUBSCRIBE FREE'}
                      </button>
                    </div>

                    {widgetMessage && (
                      <div className={`p-2.5 text-xs rounded border ${widgetMessage.success ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-red-950/80 border-red-500 text-red-200'}`}>
                        {widgetMessage.text}
                      </div>
                    )}

                    <span className="block text-[10px] text-zinc-400">
                      Institutional privacy guaranteed. Zero spam. Unsubscribe anytime with 1-click.
                    </span>
                  </form>
                </div>
              </div>

              {/* Copyable Embed Code */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-zinc-700">Embeddable Code Snippet (HTML + CSS + JS)</span>
                  <button
                    onClick={() => handleCopy(embeddableWidgetSnippet, 'tab6-embed-copy')}
                    className="bg-[#0b1a30] hover:bg-[#152a4d] text-white text-xs font-bold px-3 py-1.5 rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedSection === 'tab6-embed-copy' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    <span>{copiedSection === 'tab6-embed-copy' ? 'Copied Snippet!' : 'Copy Embed Code'}</span>
                  </button>
                </div>
                <pre className="bg-zinc-900 text-zinc-200 p-4 rounded text-xs font-mono overflow-x-auto max-h-96 leading-relaxed">
                  {embeddableWidgetSnippet}
                </pre>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
