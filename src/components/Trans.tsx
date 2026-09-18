"use client";
import { useLanguage } from '@/context/LanguageContext';

export default function Trans({ content }: { content: any }) {
  const { t } = useLanguage();
  return <>{t(content)}</>;
}
