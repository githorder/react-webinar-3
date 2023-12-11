import en from "./locale/translations/en.json";
import ru from "./locale/translations/ru.json";

export const translations = { en, ru };

export const handleTranslation = (s, langCode) => {
  return translations[langCode][s.toLowerCase()] || s;
};

/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export const DOTS = "...";

function range(start, end) {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => start + idx);
}

export function getPaginationRange({
  currentPage,
  pageSize,
  totalItems,
  siblingCount,
}) {
  const pageCount = Math.ceil(totalItems / pageSize);

  const pageNumbers = siblingCount + 5;
  const firstPageIndex = 1;
  const lastPageIndex = pageCount;

  if (pageNumbers >= pageCount) {
    return range(firstPageIndex, lastPageIndex);
  }

  const leftSiblingPageIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingPageIndex = Math.min(currentPage + siblingCount, pageCount);

  const shouldShowLeftDots = leftSiblingPageIndex > 2;
  const shouldShowRightDots = rightSiblingPageIndex < pageCount - 1;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 2 + siblingCount;
    const leftRange = range(
      firstPageIndex,
      rightSiblingPageIndex === firstPageIndex + 3
        ? rightSiblingPageIndex
        : leftItemCount
    );
    return [...leftRange, DOTS, lastPageIndex];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 2 + siblingCount;
    const rightRange = range(
      leftSiblingPageIndex === pageCount - 3
        ? leftSiblingPageIndex
        : pageCount - rightItemCount + 1,
      pageCount
    );
    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingPageIndex, rightSiblingPageIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }
}
