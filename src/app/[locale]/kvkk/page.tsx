import React from 'react';
import { Shield, FileText, ChevronLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('kvkkPage');
  return {
    title: t('pageTitle'),
    description: t('pageDescription')
  };
}

export default async function KvkkPage() {
  const t = await getTranslations('kvkkPage');

  return (
    <div className="flex-1 bg-[#F0F4F8] pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Breadcrumb / Back Link */}
        <div className="mb-8 pl-4 lg:pl-0">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium">
            <ChevronLeft size={20} />
            {t('breadcrumbBack')}
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-primary mb-6 shadow-soft border border-slate-100">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#152239] mb-4 tracking-tight">{t('headerTitle')}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {t('headerDescription')}
          </p>
        </div>

        {/* Content Card */}
        <div className="glass-panel rounded-[2.5rem] shadow-soft border border-white/40 p-8 md:p-12 animate-in slide-in-from-bottom-4 duration-700">
          <article className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-[#152239] prose-headings:tracking-tight prose-p:text-slate-600 prose-li:text-slate-600">

            <h2 className="text-2xl md:text-3xl mb-8 text-center border-b-2 border-slate-100 pb-6 text-primary max-w-2xl mx-auto leading-snug">
              {t('mainHeading').split(' AYDINLATMA VE İLETİŞİM RIZA METNİ').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {i === 0 ? part : null}
                  {i === 0 ? <br className="hidden md:block" /> : null}
                  {i === 1 ? ' AYDINLATMA VE İLETİŞİM RIZA METNİ' : null}
                </React.Fragment>
              ))}
            </h2>

            <p className="lead text-lg bg-white/60 p-6 rounded-2xl border-l-4 border-primary shadow-sm font-medium text-slate-700">
              {t('introText')}
            </p>

            <div className="mt-12 space-y-10">

              <section className="bg-white/40 p-8 rounded-3xl border border-white/60 hover:shadow-md transition-shadow">
                <h3 className="flex items-center gap-3 text-xl font-black text-[#152239] mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm shrink-0">1</span>
                  {t('section1Title')}
                </h3>
                <p className="text-lg">
                  {t('section1Content')} <strong className="font-black text-[#152239] bg-primary/5 px-2 py-0.5 rounded">{t('section1Company')}</strong> {t('section1Address')}
                </p>
              </section>

              <section className="bg-white/40 p-8 rounded-3xl border border-white/60 hover:shadow-md transition-shadow">
                <h3 className="flex items-center gap-3 text-xl font-black text-[#152239] mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm shrink-0">2</span>
                  {t('section2Title')}
                </h3>
                <p className="text-lg mb-4">{t('section2Intro')}</p>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl shadow-sm border border-slate-50">
                    <CheckCircle2 className="text-primary shrink-0" size={20} />
                    <span className="font-medium text-slate-700">{t('purpose1')}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl shadow-sm border border-slate-50">
                    <CheckCircle2 className="text-primary shrink-0" size={20} />
                    <span className="font-medium text-slate-700">{t('purpose2')}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl shadow-sm border border-slate-50">
                    <CheckCircle2 className="text-primary shrink-0" size={20} />
                    <span className="font-medium text-slate-700">{t('purpose3')}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl shadow-sm border border-slate-50">
                    <CheckCircle2 className="text-primary shrink-0" size={20} />
                    <span className="font-medium text-slate-700">{t('purpose4')}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl shadow-sm border border-slate-50 sm:col-span-2">
                    <CheckCircle2 className="text-primary shrink-0" size={20} />
                    <span className="font-medium text-slate-700">{t('purpose5')}</span>
                  </div>
                </div>
                <p className="mt-6 text-lg font-medium text-slate-700 bg-blue-50/50 p-4 rounded-xl inline-block border border-blue-100">{t('section2Note')}</p>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                <section className="bg-white/40 p-8 rounded-3xl border border-white/60 hover:shadow-md transition-shadow">
                  <h3 className="flex items-center gap-3 text-xl font-black text-[#152239] mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm shrink-0">3</span>
                    {t('section3Title')}
                  </h3>
                  <p className="text-lg">
                    {t('section3Content')}
                  </p>
                </section>

                <section className="bg-white/40 p-8 rounded-3xl border border-white/60 hover:shadow-md transition-shadow">
                  <h3 className="flex items-center gap-3 text-xl font-black text-[#152239] mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm shrink-0">4</span>
                    {t('section4Title')}
                  </h3>
                  <p className="text-lg">
                    {t('section4Content')}
                  </p>
                </section>
              </div>

              <section className="bg-white/40 p-8 rounded-3xl border border-white/60 hover:shadow-md transition-shadow">
                <h3 className="flex items-center gap-3 text-xl font-black text-[#152239] mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm shrink-0">5</span>
                  {t('section5Title')}
                </h3>
                <p className="text-lg">
                  {t('section5Content')}
                </p>
              </section>

              <section className="bg-white/40 p-8 rounded-3xl border border-white/60 hover:shadow-md transition-shadow">
                <h3 className="flex items-center gap-3 text-xl font-black text-[#152239] mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm shrink-0">6</span>
                  {t('section6Title')}
                </h3>
                <p className="text-lg font-medium text-slate-700 mb-6">{t('section6Intro')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50"><div className="w-2.5 h-2.5 rounded bg-primary"></div> <span className="font-medium text-slate-700">{t('rights1')}</span></div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50"><div className="w-2.5 h-2.5 rounded bg-primary"></div> <span className="font-medium text-slate-700">{t('rights2')}</span></div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50"><div className="w-2.5 h-2.5 rounded bg-primary"></div> <span className="font-medium text-slate-700">{t('rights3')}</span></div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50"><div className="w-2.5 h-2.5 rounded bg-primary"></div> <span className="font-medium text-slate-700">{t('rights4')}</span></div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50"><div className="w-2.5 h-2.5 rounded bg-primary"></div> <span className="font-medium text-slate-700">{t('rights5')}</span></div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50"><div className="w-2.5 h-2.5 rounded bg-primary"></div> <span className="font-medium text-slate-700">{t('rights6')}</span></div>
                </div>
                <p className="text-lg font-black text-[#152239] text-center bg-slate-50 py-3 rounded-xl border border-slate-100">{t('rightsConclusion')}</p>
              </section>

              <div className="bg-white shadow-soft p-8 md:p-10 rounded-[2.5rem] border border-slate-100 mt-12 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full pointer-events-none"></div>
                <div className="absolute top-10 -right-5 w-20 h-20 bg-primary/5 rounded-full pointer-events-none delay-75"></div>

                <h4 className="text-xl font-black text-[#152239] mb-4 flex items-center gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><FileText size={24} /></div> {t('contactTitle')}
                </h4>
                <p className="text-lg mb-8 text-slate-600">{t('contactDescription')}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/50 hover:border-primary/20 transition-colors">
                    <span className="block font-bold text-primary text-xs uppercase tracking-widest mb-3">{t('officeAddressTitle')}</span>
                    <p className="font-bold text-[#152239] leading-relaxed">
                      {t('officeAddress').split(', ').map((line, i, arr) => (
                        <React.Fragment key={i}>
                          {line}{i < arr.length - 1 ? <br /> : null}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/50 hover:border-primary/20 transition-colors flex flex-col justify-center">
                    <span className="block font-bold text-primary text-xs uppercase tracking-widest mb-3">{t('electronicContactTitle')}</span>
                    <a href="mailto:support@atasa.tr" className="text-2xl font-black text-slate-800 hover:text-primary transition-colors mb-2 inline-block">{t('email')}</a>
                    <a href="tel:+908503086998" className="text-lg font-medium text-slate-600 hover:text-primary transition-colors">{t('phone')}</a>
                  </div>
                </div>
              </div>

            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
