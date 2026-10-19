import { JavaCodeSnippet } from '../types';

export const JAVA_CODE_SNIPPETS: JavaCodeSnippet[] = [
  {
    id: 'standard',
    title: 'Standart Çözüm (Metotlu & Modüler)',
    badge: 'Önerilen Ödev Formatı',
    fileName: 'KombinasyonHesaplayici.java',
    description:
      'Kullanıcıdan Scanner ile n ve r değerlerini alan, faktöriyel hesabını ayrı bir metotta yapan ve formülü hatasız uygulayan standart nesne yönelimli Java programı.',
    highlights: [
      'Geliştirici & İmza: Enes Öztürk',
      'faktöriyel(int sayi) metodu ile kod tekrarı önlendi',
      'n >= r >= 0 kontrolleri ile çalışma zamanı hataları engellendi',
      'Scanner nesnesi bellek sızıntısını önlemek için kapatıldı',
    ],
    code: `import java.util.Scanner;

/**
 * ============================================================================
 * ÖDEV: Java ile Kombinasyon Hesaplayan Program
 * FORMÜL: C(n, r) = n! / (r! * (n - r)!)
 * 
 * N elemanlı bir kümenin elemanları ile oluşturulacak r elemanlı
 * farklı grupların sayısı n'in r'li kombinasyonu olarak adlandırılır.
 * 
 * @author Enes Öztürk
 * ============================================================================
 */
public class KombinasyonHesaplayici {

    /**
     * Verilen bir sayının faktöriyelini hesaplayan yardımcı metot.
     * 0! = 1, 1! = 1, n! = n * (n-1) * ... * 1
     * 
     * @param sayi Faktöriyeli alınacak pozitif tam sayı
     * @return Hesaplanan faktöriyel sonucu
     */
    public static long faktoriyel(int sayi) {
        long sonuc = 1;
        for (int i = 2; i <= sayi; i++) {
            sonuc *= i;
        }
        return sonuc;
    }

    /**
     * n'in r'li kombinasyonunu C(n, r) formülü ile hesaplayan metot.
     * 
     * @param n Kümenin toplam eleman sayısı
     * @param r Oluşturulacak alt küme / grup eleman sayısı
     * @return Kombinasyon sonucu
     */
    public static long kombinasyon(int n, int r) {
        // C(n, r) = n! / (r! * (n - r)!)
        long nFaktoriyel = faktoriyel(n);
        long rFaktoriyel = faktoriyel(r);
        long nEksiRFaktoriyel = faktoriyel(n - r);

        return nFaktoriyel / (rFaktoriyel * nEksiRFaktoriyel);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("  JAVA FAKTÖRİYEL VE KOMBİNASYON HESAPLAYICI");
        System.out.println("  Geliştirici: Enes Öztürk");
        System.out.println("==================================================");

        // Kullanıcıdan n değerini alma
        System.out.print("Kümenin toplam eleman sayısını giriniz (n): ");
        int n = scanner.nextInt();

        // Kullanıcıdan r değerini alma
        System.out.print("Oluşturulacak grubun eleman sayısını giriniz (r): ");
        int r = scanner.nextInt();

        // Mantıksal kontroller
        if (n < 0 || r < 0) {
            System.out.println("\\nHATA: Eleman sayıları negatif olamaz!");
        } else if (r > n) {
            System.out.println("\\nHATA: r sayısı n sayısından büyük olamaz! (r <= n olmalıdır)");
        } else {
            // Faktöriyel değerlerini adım adım gösterme
            long nFakt = faktoriyel(n);
            long rFakt = faktoriyel(r);
            long nEksiRFakt = faktoriyel(n - r);
            long sonuc = kombinasyon(n, r);

            System.out.println("\\n------------- HESAPLAMA ADIMLARI -------------");
            System.out.println("n!      = " + n + "! = " + nFakt);
            System.out.println("r!      = " + r + "! = " + rFakt);
            System.out.println("(n-r)!  = (" + n + "-" + r + ")! = " + (n - r) + "! = " + nEksiRFakt);
            System.out.println("Formül  : C(" + n + "," + r + ") = " + n + "! / (" + r + "! * " + (n - r) + "!)");
            System.out.println("----------------------------------------------");
            System.out.println("SONUÇ   : C(" + n + "," + r + ") = " + sonuc);
            System.out.println(n + " elemanlı bir kümeden " + r + " elemanlı " + sonuc + " farklı grup oluşturulabilir.");
        }

        System.out.println("==================================================");
        System.out.println("  Program başarıyla sonlandı. - Enes Öztürk");
        System.out.println("==================================================");

        scanner.close();
    }
}`,
  },
  {
    id: 'patika',
    title: 'Kompakt Main.java (Patika / Hızlı Ödev Formatı)',
    badge: 'Tek Metotlu / Hızlı',
    fileName: 'Main.java',
    description:
      'Ödev teslim sistemlerinde tek sınıfta doğrudan çalıştırılabilen, sade ve yalın döngülü kod yapısı.',
    highlights: [
      'Geliştirici: Enes Öztürk',
      'Tek döngü içerisinde faktöriyellerin paralel hesabı',
      'Minimal bellek ve satır kullanımı',
    ],
    code: `import java.util.Scanner;

/**
 * Patika.dev / Üniversite Java Kombinasyon Ödevi
 * Formül: C(n,r) = n! / (r! * (n-r)!)
 * 
 * Hazırlayan: Enes Öztürk
 */
public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        System.out.println("--- Kombinasyon Hesaplama [Enes Öztürk] ---");
        System.out.print("n değerini giriniz: ");
        int n = input.nextInt();
        
        System.out.print("r değerini giriniz: ");
        int r = input.nextInt();
        
        if (n < 0 || r < 0 || r > n) {
            System.out.println("Geçersiz değerler girdiniz! (n >= r >= 0 olmalıdır)");
            input.close();
            return;
        }
        
        long totalN = 1;
        long totalR = 1;
        long totalNR = 1;
        
        // n! hesabı
        for (int i = 1; i <= n; i++) {
            totalN *= i;
        }
        
        // r! hesabı
        for (int i = 1; i <= r; i++) {
            totalR *= i;
        }
        
        // (n-r)! hesabı
        for (int i = 1; i <= (n - r); i++) {
            totalNR *= i;
        }
        
        // C(n,r) = n! / (r! * (n-r)!)
        long kombinasyon = totalN / (totalR * totalNR);
        
        System.out.println("C(" + n + ", " + r + ") = " + kombinasyon);
        System.out.println("İmza: Enes Öztürk");
        
        input.close();
    }
}`,
  },
  {
    id: 'recursive',
    title: 'Rekürsif (Özyinelemeli) Çözüm',
    badge: 'Algoritmik Yaklaşım',
    fileName: 'RekursifKombinasyon.java',
    description:
      'Döngü yerine kendini çağıran rekürsif faktöriyel fonksiyonu kullanan şık ve akademik çözüm.',
    highlights: [
      'Geliştirici: Enes Öztürk',
      'Matematiksel tanıma en sadık fonksiyonel yaklaşım: f(n) = n * f(n-1)',
      'Taban durum (Base Case): 0! = 1 ve 1! = 1',
    ],
    code: `import java.util.Scanner;

/**
 * Rekürsif (Özyinelemeli) Faktöriyel ile Kombinasyon Hesabı
 * 
 * @author Enes Öztürk
 */
public class RekursifKombinasyon {

    // Rekürsif faktöriyel metodu
    public static long faktoriyel(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * faktoriyel(n - 1);
    }

    // Kombinasyon formülü: C(n,r) = n! / (r! * (n-r)!)
    public static long kombinasyon(int n, int r) {
        return faktoriyel(n) / (faktoriyel(r) * faktoriyel(n - r));
    }

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("Kombinasyon Hesaplayıcı (Rekürsif) - Enes Öztürk");
        
        System.out.print("n: ");
        int n = scan.nextInt();
        
        System.out.print("r: ");
        int r = scan.nextInt();

        if (n >= 0 && r >= 0 && r <= n) {
            long sonuc = kombinasyon(n, r);
            System.out.println("C(" + n + ", " + r + ") = " + sonuc);
            System.out.println("Hazırlayan: Enes Öztürk");
        } else {
            System.out.println("Hata: n >= r >= 0 şartı sağlanmalıdır!");
        }

        scan.close();
    }
}`,
  },
  {
    id: 'biginteger',
    title: 'Büyük Sayılar & Taşma Korumalı (BigInteger)',
    badge: 'Gelişmiş Seviye',
    fileName: 'BigIntegerKombinasyon.java',
    description:
      'Java long tipi 20! üzerindeki faktöriyellerde taşma (overflow) yaşar. java.math.BigInteger kullanarak n=100 gibi devasa sayıların kombinasyonunu hatasız çözen profesyonel yaklaşım.',
    highlights: [
      'Geliştirici: Enes Öztürk',
      'java.math.BigInteger ile sınırsız basamak kapasitesi',
      'Büyük sayılarda hassasiyet kaybını ve sayı taşmasını tamamen önler',
    ],
    code: `import java.math.BigInteger;
import java.util.Scanner;

/**
 * Büyük Sayılar İçin BigInteger Destekli Kombinasyon Hesaplayıcı
 * C(n,r) = n! / (r! * (n-r)!)
 * 
 * @author Enes Öztürk
 */
public class BigIntegerKombinasyon {

    public static BigInteger faktoriyel(int sayi) {
        BigInteger carpim = BigInteger.ONE;
        for (int i = 2; i <= sayi; i++) {
            carpim = carpim.multiply(BigInteger.valueOf(i));
        }
        return carpim;
    }

    public static BigInteger kombinasyon(int n, int r) {
        BigInteger nFakt = faktoriyel(n);
        BigInteger rFakt = faktoriyel(r);
        BigInteger nEksiRFakt = faktoriyel(n - r);

        BigInteger payda = rFakt.multiply(nEksiRFakt);
        return nFakt.divide(payda);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Devasa Sayılar İçin Kombinasyon Hesabı - Enes Öztürk");
        
        System.out.print("n (örn. 50): ");
        int n = scanner.nextInt();
        
        System.out.print("r (örn. 6): ");
        int r = scanner.nextInt();

        if (n >= 0 && r >= 0 && r <= n) {
            BigInteger sonuc = kombinasyon(n, r);
            System.out.println("\\nC(" + n + ", " + r + ") = " + sonuc);
            System.out.println("Basamak Sayısı: " + sonuc.toString().length());
            System.out.println("İmza: Enes Öztürk");
        } else {
            System.out.println("Geçersiz girdi!");
        }

        scanner.close();
    }
}`,
  },
];
