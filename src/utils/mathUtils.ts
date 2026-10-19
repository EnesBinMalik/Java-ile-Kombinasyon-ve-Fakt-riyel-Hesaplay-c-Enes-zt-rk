import { CombinationResult } from '../types';

/**
 * Faktöriyel hesaplama (BigInt desteği ile taşma olmaksızın hesaplar)
 * 0! = 1, 1! = 1, n! = n * (n-1) * ... * 1
 */
export function calculateFactorial(n: number): bigint {
  if (n < 0) return 0n;
  if (n === 0 || n === 1) return 1n;

  let result = 1n;
  for (let i = 2; i <= n; i++) {
    result *= BigInt(i);
  }
  return result;
}

/**
 * Sayıyı okunabilir formata çevirir (noktalı basamak ayırıcı)
 */
export function formatBigInt(value: bigint): string {
  const str = value.toString();
  if (str.length > 35) {
    // Çok uzunsa bilimsel gösterim
    return `${str.slice(0, 5)}...×10^${str.length - 1} (${str.length} basamaklı)`;
  }
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * C(n, r) Kombinasyon Hesaplama
 * Formül: C(n,r) = n! / (r! * (n-r)!)
 */
export function calculateCombination(n: number, r: number): CombinationResult {
  // Geçerlilik kontrolleri
  if (n < 0) {
    return {
      n,
      r,
      nMinusR: 0,
      nFact: 0n,
      rFact: 0n,
      nMinusRFact: 0n,
      denominator: 0n,
      combination: 0n,
      isValid: false,
      errorMessage: 'Kümenin eleman sayısı (n) negatif olamaz!',
      steps: [],
    };
  }

  if (r < 0) {
    return {
      n,
      r,
      nMinusR: 0,
      nFact: 0n,
      rFact: 0n,
      nMinusRFact: 0n,
      denominator: 0n,
      combination: 0n,
      isValid: false,
      errorMessage: 'Grup eleman sayısı (r) negatif olamaz!',
      steps: [],
    };
  }

  if (r > n) {
    return {
      n,
      r,
      nMinusR: n - r,
      nFact: 0n,
      rFact: 0n,
      nMinusRFact: 0n,
      denominator: 0n,
      combination: 0n,
      isValid: false,
      errorMessage: `r değeri (${r}) n değerinden (${n}) büyük olamaz! n elemanlı bir kümeden ${r} elemanlı grup seçilemez. C(${n}, ${r}) = 0`,
      steps: [],
    };
  }

  const nMinusR = n - r;
  const nFact = calculateFactorial(n);
  const rFact = calculateFactorial(r);
  const nMinusRFact = calculateFactorial(nMinusR);
  const denominator = rFact * nMinusRFact;
  const combination = denominator === 0n ? 0n : nFact / denominator;

  // Matematiksel adımları oluştur
  const steps = [
    {
      title: '1. Faktöriyel Değerlerinin Hesaplanması',
      description: 'Formülde yer alan üç temel faktöriyel tek tek hesaplanır:',
      math: `n! = ${n}! = ${formatBigInt(nFact)}\nr! = ${r}! = ${formatBigInt(rFact)}\n(n - r)! = (${n} - ${r})! = ${nMinusR}! = ${formatBigInt(nMinusRFact)}`,
    },
    {
      title: '2. Paydanın Hesaplanması',
      description: 'Paydada yer alan [r! * (n-r)!] çarpımı gerçekleştirilir:',
      math: `Payda = r! × (n - r)! = ${formatBigInt(rFact)} × ${formatBigInt(nMinusRFact)} = ${formatBigInt(denominator)}`,
    },
    {
      title: '3. Formülde Yerine Koyma ve Bölme',
      description: 'n! değeri bulunan paydaya bölünerek kombinasyon sonucu elde edilir:',
      math: `C(${n}, ${r}) = \\frac{${n}!}{${r}! \\times ${nMinusR}!} = \\frac{${formatBigInt(nFact)}}{${formatBigInt(denominator)}} = ${formatBigInt(combination)}`,
    },
  ];

  return {
    n,
    r,
    nMinusR,
    nFact,
    rFact,
    nMinusRFact,
    denominator,
    combination,
    isValid: true,
    steps,
  };
}

/**
 * Küçük kümeler için kombinasyon alt gruplarını üretir (Görsel gösterim için)
 */
export function generateCombinationsList<T>(elements: T[], r: number): T[][] {
  if (r === 0) return [[]];
  if (r > elements.length) return [];
  if (elements.length > 12) return []; // UI kasmaması için max 12 eleman

  const results: T[][] = [];

  function helper(start: number, current: T[]) {
    if (current.length === r) {
      results.push([...current]);
      return;
    }
    for (let i = start; i < elements.length; i++) {
      current.push(elements[i]);
      helper(i + 1, current);
      current.pop();
    }
  }

  helper(0, []);
  return results;
}
