import srData from './sr.json';
import enData from './en.json';
import ruData from './ru.json';

type Translations = Record<string, string>;

const translations: Record<string, Translations> = {
  sr: srData,
  en: enData,
  ru: ruData,
};

const STORAGE_KEY = 'rs-lang';
const DEFAULT_LANG = 'sr';

function getSavedLang(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

function saveLang(lang: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // localStorage unavailable
  }
}

function applyTranslations(lang: string): void {
  const data = translations[lang];
  if (!data) return;

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && data[key]) {
      el.textContent = data[key];
    }
  });

  document.documentElement.lang = lang === 'ru' ? 'ru' : lang === 'en' ? 'en' : 'sr';
}

function updateActiveButton(lang: string): void {
  document.querySelectorAll<HTMLElement>('.nav__lang').forEach((btn) => {
    const btnLang = btn.getAttribute('data-lang');
    btn.classList.toggle('nav__lang--active', btnLang === lang);
  });
}

export function initI18n(): void {
  const lang = getSavedLang();
  applyTranslations(lang);
  updateActiveButton(lang);

  document.querySelectorAll<HTMLElement>('.nav__lang').forEach((btn) => {
    btn.addEventListener('click', () => {
      const newLang = btn.getAttribute('data-lang');
      if (newLang && translations[newLang]) {
        saveLang(newLang);
        applyTranslations(newLang);
        updateActiveButton(newLang);
      }
    });
  });
}
