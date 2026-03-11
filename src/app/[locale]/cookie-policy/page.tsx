import React from 'react';
import { Cookie, ChevronLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('cookiePolicyPage');
  return {
    title: t('pageTitle'),
    description: t('pageDescription')
  };
}

export default async function CookiePolicyPage() {
  const t = await getTranslations('cookiePolicyPage');

  return (
    <div className="flex-1 bg-[#F0F4F8] pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Breadcrumb / Back Link */}
        <div className="mb-8 pl-4 lg:pl-0">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium">
            <ChevronLeft size={20} />
            {t('backToHome')}
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-primary mb-6 shadow-soft border border-slate-100">
            <Cookie size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#152239] mb-4 tracking-tight">{t('headerTitle')}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {t('headerDescription')}
          </p>
        </div>

        {/* Content Card */}
        <div className="glass-panel rounded-[2.5rem] shadow-soft border border-white/40 p-8 md:p-12 animate-in slide-in-from-bottom-4 duration-700">
          <article className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-[#152239] prose-headings:tracking-tight prose-p:text-slate-600 prose-li:text-slate-600">

            <p className="lead border-l-4 border-primary pl-4 bg-white/60 py-4 rounded-r-2xl font-medium text-lg text-slate-700 shadow-sm">
              {t('introText')}
            </p>

            <p className="mt-8 text-lg">
              <strong className="text-[#152239] font-black">{t('companyName')}</strong> (“{t('companyShortName')}” veya
              “Şirket”) olarak, veri sorumlusu sıfatıyla,
              <Link href="https://atasaedu.com/" className="text-primary hover:underline mx-1 font-semibold">{t('companyWebsiteText')}</Link>
              {t('companyDescription')}
            </p>

            <p className="text-lg">
              {t('lawReference')}
            </p>

            <p className="text-lg">
              {t('cookiePolicyPurpose')}
            </p>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl md:text-3xl mb-6 text-primary border-b-2 border-primary/20 pb-2 inline-block">{t('cookieTypesTitle')}</h3>
            <p className="mb-6 text-lg">{t('cookieTypesDescription')}</p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-white/60 p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-black text-[#152239] mb-4 flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</div> {t('usageDurationTitle')}</h4>
                <ul className="list-none pl-0 space-y-4">
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span><span><strong className="text-[#152239] font-bold block mb-1">{t('sessionCookiesTitle')}</strong> {t('sessionCookiesDesc')}</span></li>
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span><span><strong className="text-[#152239] font-bold block mb-1">{t('persistentCookiesTitle')}</strong> {t('persistentCookiesDesc')}</span></li>
                </ul>
              </div>
              <div className="bg-white/60 p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-black text-[#152239] mb-4 flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</div> {t('byPartyTitle')}</h4>
                <ul className="list-none pl-0 space-y-4">
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span><span><strong className="text-[#152239] font-bold block mb-1">{t('firstPartyCookiesTitle')}</strong> {t('firstPartyCookiesDesc')}</span></li>
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span><span><strong className="text-[#152239] font-bold block mb-1">{t('thirdPartyCookiesTitle')}</strong> {t('thirdPartyCookiesDesc')}</span></li>
                </ul>
              </div>
            </div>

            <h4 className="text-xl font-black text-[#152239] mt-10 mb-6 flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">3</div> {t('byPurposeTitle')}</h4>
            <ul className="list-none pl-0 space-y-6">
              <li className="bg-white/40 p-4 rounded-2xl flex items-start gap-4 hover:bg-white/60 transition-colors">
                <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0"></span>
                <div>
                  <strong className="text-[#152239] font-bold block mb-1">{t('mandatoryCookiesTitle')}</strong>
                  {t('mandatoryCookiesDesc')}
                </div>
              </li>
              <li className="bg-white/40 p-4 rounded-2xl flex items-start gap-4 hover:bg-white/60 transition-colors">
                <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0"></span>
                <div>
                  <strong className="text-[#152239] font-bold block mb-1">{t('performanceCookiesTitle')}</strong>
                  {t('performanceCookiesDesc')}
                </div>
              </li>
              <li className="bg-white/40 p-4 rounded-2xl flex items-start gap-4 hover:bg-white/60 transition-colors">
                <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0"></span>
                <div>
                  <strong className="text-[#152239] font-bold block mb-1">{t('advertisingCookiesTitle')}</strong>
                  {t('advertisingCookiesDesc')}
                </div>
              </li>
              <li className="bg-white/40 p-4 rounded-2xl flex items-start gap-4 hover:bg-white/60 transition-colors">
                <span className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0"></span>
                <div>
                  <strong className="text-[#152239] font-bold block mb-1">{t('functionalCookiesTitle')}</strong>
                  {t('functionalCookiesDesc')}
                </div>
              </li>
            </ul>

            <hr className="my-10 border-slate-200" />

            <h3 className="text-2xl md:text-3xl mb-6 text-primary border-b-2 border-primary/20 pb-2 inline-block">{t('processingPurposesTitle')}</h3>
            <ul className="list-none pl-0 space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 shrink-0"></span>
                <span><strong className="text-[#152239] font-bold">{t('mandatoryCookiesTitle').toLowerCase()}</strong> {t('mandatoryProcessingDesc').replace(/^.*?:/, '')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 shrink-0"></span>
                <span><strong className="text-[#152239] font-bold">{t('performanceCookiesTitle').toLowerCase()}</strong> {t('analyticsProcessingDesc').replace(/^.*?:/, '')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 shrink-0"></span>
                <span><strong className="text-[#152239] font-bold">{t('advertisingCookiesTitle').toLowerCase()}</strong> {t('advertisingProcessingDesc').replace(/^.*?:/, '')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 shrink-0"></span>
                <span><strong className="text-[#152239] font-bold">{t('functionalCookiesTitle').toLowerCase()}</strong> {t('functionalProcessingDesc').replace(/^.*?:/, '')}</span>
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl mt-10 mb-6 text-primary border-b-2 border-primary/20 pb-2 inline-block">{t('collectionMethodTitle')}</h3>
            <p className="text-lg">
              {t('collectionMethodDesc')}
            </p>

            <h3 className="text-2xl md:text-3xl mt-10 mb-6 text-primary border-b-2 border-primary/20 pb-2 inline-block">{t('preferencesManagementTitle')}</h3>
            <p className="text-lg bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              {t('preferencesManagementDesc')}
            </p>

            <h3 className="text-xl mt-10 mb-4 text-[#152239] font-black">{t('personalDataTransferTitle')}</h3>
            <p className="text-lg">
              {t('personalDataTransferDesc')}
            </p>

            <h3 className="text-xl mt-10 mb-4 text-[#152239] font-black">{t('rightsTitle')}</h3>
            <p className="text-lg mb-4">{t('rightsIntro')}</p>
            <ul className="list-none pl-0 space-y-3 mb-6 bg-white/40 p-6 rounded-2xl">
              <li className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">✓</div> {t('rightInfoRequest')}</li>
              <li className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">✓</div> {t('rightLearnProcessing')}</li>
              <li className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">✓</div> {t('rightCorrectionDeletion')}</li>
            </ul>
            <p className="text-lg font-medium text-slate-700">{t('rightsConclusion')}</p>

            <div className="bg-white shadow-soft p-8 rounded-[2.5rem] border border-slate-100 mt-12 relative overflow-hidden">
              {/* Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none"></div>

              <h4 className="text-xl font-black text-[#152239] mb-4 flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><FileText size={24} /></div> {t('contactInfoTitle')}
              </h4>
              <p className="text-lg mb-6 leading-relaxed">
                {t('contactInfoDesc').split('support@atasa.tr').map((part, i, arr) => i < arr.length - 1 ? <>{part}<a href="mailto:support@atasa.tr" className="text-primary hover:underline mx-2 font-bold px-3 py-1 bg-primary/5 rounded-lg">support@atasa.tr</a></> : part)}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100/80">
                <div className="bg-slate-50/80 p-5 rounded-2xl">
                  <span className="block font-bold text-primary text-xs uppercase tracking-widest mb-2">{t('dataControllerLabel')}</span>
                  <span className="font-black text-[#152239] block mb-2 text-lg">{t('dataControllerName')}</span>
                  <span className="text-slate-600 text-sm">{t('dataControllerAddress')}</span>
                </div>
                <div className="bg-slate-50/80 p-5 rounded-2xl flex flex-col justify-center">
                  <span className="block font-bold text-primary text-xs uppercase tracking-widest mb-2">{t('corporateContactLabel')}</span>
                  <a href="mailto:support@atasa.tr" className="text-slate-800 hover:text-primary transition-colors font-black text-xl mb-1">{t('corporateContactEmail')}</a>
                  <a href="tel:+908503086998" className="text-slate-600 hover:text-primary transition-colors font-medium">{t('corporateContactPhone')}</a>
                </div>
              </div>
            </div>

          </article>
        </div>
      </div>
    </div>
  );
}
