export interface Quote {
  id: number;
  text: string;
  reference: string;
  book: string;
  chapter: number;
  verse: number;
  category: "nadzieja" | "pokoj" | "milosc" | "madrosc" | "sila" | "wiara" | "wdziecznosc";
  sourceUrl: string;
}

export const quotes: Quote[] = [
  {
    id: 1,
    text: "Pan jest moim pasterzem, nie brak mi niczego. Pozwala mi leżeć na zielonych pastwiskach. Prowadzi mnie nad wody, gdzie mogę odpocząć.",
    reference: "Księga Psalmów 23:1-2",
    book: "Księga Psalmów",
    chapter: 23,
    verse: 1,
    category: "pokoj",
    sourceUrl: "https://bible.com/pl/bible/3881/psa.23.1-2.nbg"
  },
  {
    id: 2,
    text: "Miłość cierpliwa jest, łaskawa jest. Miłość nie zazdrości, nie szuka poklasku, nie unosi się pychą; nie dopuszcza się bezwstydu, nie szuka swego, nie unosi się gniewem, nie pamięta złego.",
    reference: "1 List do Koryntian 13:4-5",
    book: "1 List do Koryntian",
    chapter: 13,
    verse: 4,
    category: "milosc",
    sourceUrl: "https://bible.com/pl/bible/3881/1co.13.4-5.nbg"
  },
  {
    id: 3,
    text: "Cóż więc na to powiemy? Jeżeli Bóg z nami, któż przeciwko nam?",
    reference: "List do Rzymian 8:31",
    book: "List do Rzymian",
    chapter: 8,
    verse: 31,
    category: "sila",
    sourceUrl: "https://bible.com/pl/bible/3881/rom.8.31.nbg"
  },
  {
    id: 4,
    text: "Czyż ci nie rozkazałem: Bądź mężny i mocny? Nie bój się i nie lękaj się, bo Pan, Bóg twój, jest z tobą wszędzie, dokądkolwiek pójdziesz.",
    reference: "Księga Jozuego 1:9",
    book: "Księga Jozuego",
    chapter: 1,
    verse: 9,
    category: "sila",
    sourceUrl: "https://bible.com/pl/bible/3881/jos.1.9.nbg"
  },
  {
    id: 5,
    text: "Lecz ci, co zaufali Panu, odzyskują siły, otrzymują skrzydła jak orły, biegną bez zmęczenia, idą bez znużenia.",
    reference: "Księga Izajasza 40:31",
    book: "Księga Izajasza",
    chapter: 40,
    verse: 31,
    category: "nadzieja",
    sourceUrl: "https://bible.com/pl/bible/3881/isa.40.31.nbg"
  },
  {
    id: 6,
    text: "Wszystko mogę w Tym, który mnie umacnia.",
    reference: "List do Filipian 4:13",
    book: "List do Filipian",
    chapter: 4,
    verse: 13,
    category: "sila",
    sourceUrl: "https://bible.com/pl/bible/3881/php.4.13.nbg"
  },
  {
    id: 7,
    text: "Z całego serca Bogu zaufaj, nie polegaj na swoim rozsądku. Myśl o Nim na każdej swej drodze, a On prostować będzie twoje ścieżki.",
    reference: "Księga Przysłów 3:5-6",
    book: "Księga Przysłów",
    chapter: 3,
    verse: 5,
    category: "wiara",
    sourceUrl: "https://bible.com/pl/bible/3881/pro.3.5-6.nbg"
  },
  {
    id: 8,
    text: "Tak bowiem Bóg umiłował świat, że Syna swego Jednorodzonego dał, aby każdy, kto w Niego wierzy, nie zginął, ale miał życie wieczne.",
    reference: "Ewangelia wg św. Jana 3:16",
    book: "Ewangelia wg św. Jana",
    chapter: 3,
    verse: 16,
    category: "milosc",
    sourceUrl: "https://bible.com/pl/bible/3881/jhn.3.16.nbg"
  },
  {
    id: 9,
    text: "Bóg, dawca nadziei, niech wam udzieli pełni radości i pokoju w wierze, abyście opływali w nadzieję mocą Ducha Świętego.",
    reference: "List do Rzymian 15:13",
    book: "List do Rzymian",
    chapter: 15,
    verse: 13,
    category: "nadzieja",
    sourceUrl: "https://bible.com/pl/bible/3881/rom.15.13.nbg"
  },
  {
    id: 10,
    text: "Bóg jest dla nas ucieczką i siłą, najpewniejszą pomocą w trudnościach.",
    reference: "Księga Psalmów 46:2",
    book: "Księga Psalmów",
    chapter: 46,
    verse: 2,
    category: "sila",
    sourceUrl: "https://bible.com/pl/bible/3881/psa.46.2.nbg"
  },
  {
    id: 11,
    text: "Wiemy też, że Bóg z tymi, którzy Go miłują, współdziała we wszystkim dla ich dobra, z tymi, którzy są powołani według Jego zamiaru.",
    reference: "List do Rzymian 8:28",
    book: "List do Rzymian",
    chapter: 8,
    verse: 28,
    category: "wiara",
    sourceUrl: "https://bible.com/pl/bible/3881/rom.8.28.nbg"
  },
  {
    id: 12,
    text: "O nic się już zbytnio nie zamartwiajcie, lecz w każdej sprawie wasze prośby przedstawiajcie Bogu w modlitwie i błaganiu z dziękczynieniem.",
    reference: "List do Filipian 4:6",
    book: "List do Filipian",
    chapter: 4,
    verse: 6,
    category: "pokoj",
    sourceUrl: "https://bible.com/pl/bible/3881/php.4.6.nbg"
  },
  {
    id: 13,
    text: "Pokój zostawiam wam, pokój mój daję wam. Nie tak jak daje świat, Ja wam daję. Niech się nie trwoży serce wasze ani się lęka!",
    reference: "Ewangelia wg św. Jana 14:27",
    book: "Ewangelia wg św. Jana",
    chapter: 14,
    verse: 27,
    category: "pokoj",
    sourceUrl: "https://bible.com/pl/bible/3881/jhn.14.27.nbg"
  },
  {
    id: 14,
    text: "Wiara zaś jest poręką tych dóbr, których się spodziewamy, dowodem tych rzeczywistości, których nie widzimy.",
    reference: "List do Hebrajczyków 11:1",
    book: "List do Hebrajczyków",
    chapter: 11,
    verse: 1,
    category: "wiara",
    sourceUrl: "https://bible.com/pl/bible/3881/heb.11.1.nbg"
  },
  {
    id: 15,
    text: "Wszystkie troski wasze przerzućcie na Niego, gdyż Jemu zależy na was.",
    reference: "1 List św. Piotra 5:7",
    book: "1 List św. Piotra",
    chapter: 5,
    verse: 7,
    category: "pokoj",
    sourceUrl: "https://bible.com/pl/bible/3881/1pe.5.7.nbg"
  },
  {
    id: 16,
    text: "Twoje słowo jest pochodnią dla moich stóp i światłem na mojej ścieżce.",
    reference: "Księga Psalmów 119:105",
    book: "Księga Psalmów",
    chapter: 119,
    verse: 105,
    category: "madrosc",
    sourceUrl: "https://bible.com/pl/bible/3881/psa.119.105.nbg"
  },
  {
    id: 17,
    text: "Jeśli zaś komuś z was brakuje mądrości, niech prosi o nią Boga, który daje wszystkim chętnie i bez wypominania, a zostanie mu dana.",
    reference: "List św. Jakuba 1:5",
    book: "List św. Jakuba",
    chapter: 1,
    verse: 5,
    category: "madrosc",
    sourceUrl: "https://bible.com/pl/bible/3881/jas.1.5.nbg"
  },
  {
    id: 18,
    text: "Przyjdźcie do Mnie wszyscy, którzy utrudzeni i obciążeni jesteście, a Ja wam dam ukojenie.",
    reference: "Ewangelia wg św. Mateusza 11:28",
    book: "Ewangelia wg św. Mateusza",
    chapter: 11,
    verse: 28,
    category: "pokoj",
    sourceUrl: "https://bible.com/pl/bible/3881/mat.11.28.nbg"
  },
  {
    id: 19,
    text: "Pan moim światłem i zbawieniem moim: kogo mam się lękać? Pan obroną mojego życia: przed kim mam się trwożyć?",
    reference: "Księga Psalmów 27:1",
    book: "Księga Psalmów",
    chapter: 27,
    verse: 1,
    category: "sila",
    sourceUrl: "https://bible.com/pl/bible/3881/psa.27.1.nbg"
  },
  {
    id: 20,
    text: "Owocem zaś Ducha jest: miłość, radość, pokój, cierpliwość, uprzejmość, dobroć, wierność, łagodność, opanowanie.",
    reference: "List do Galacjan 5:22-23",
    book: "List do Galacjan",
    chapter: 5,
    verse: 22,
    category: "milosc",
    sourceUrl: "https://bible.com/pl/bible/3881/gal.5.22-23.nbg"
  },
  {
    id: 21,
    text: "Nie daj się zwyciężyć złu, ale zło dobrem zwyciężaj.",
    reference: "List do Rzymian 12:21",
    book: "List do Rzymian",
    chapter: 12,
    verse: 21,
    category: "madrosc",
    sourceUrl: "https://bible.com/pl/bible/3881/rom.12.21.nbg"
  },
  {
    id: 22,
    text: "Wszystko ma swój czas i jest wyznaczona godzina na każdą sprawę pod niebem.",
    reference: "Księga Koheleta 3:1",
    book: "Księga Koheleta",
    chapter: 3,
    verse: 1,
    category: "madrosc",
    sourceUrl: "https://bible.com/pl/bible/3881/ecc.3.1.nbg"
  },
  {
    id: 23,
    text: "Powierz Panu swoją drogę, zaufaj Mu, a On sam będzie działał.",
    reference: "Księga Psalmów 37:5",
    book: "Księga Psalmów",
    chapter: 37,
    verse: 5,
    category: "wiara",
    sourceUrl: "https://bible.com/pl/bible/3881/psa.37.5.nbg"
  },
  {
    id: 24,
    text: "Z całą pilnością strzeż swego serca, bo z niego tryska źródło życia.",
    reference: "Księga Przysłów 4:23",
    book: "Księga Przysłów",
    chapter: 4,
    verse: 23,
    category: "madrosc",
    sourceUrl: "https://bible.com/pl/bible/3881/pro.4.23.nbg"
  },
  {
    id: 25,
    text: "W miłości nie ma lęku, lecz doskonała miłość usuwa lęk, ponieważ lęk kojarzy się z karą. Ten zaś, kto się lęka, nie wydoskonalił się w miłości.",
    reference: "1 List św. Jana 4:18",
    book: "1 List św. Jana",
    chapter: 4,
    verse: 18,
    category: "milosc",
    sourceUrl: "https://bible.com/pl/bible/3881/1jn.4.18.nbg"
  },
  {
    id: 26,
    text: "Nie bój się, bo Ja jestem z tobą; nie lękaj się, bo Ja jestem twoim Bogiem. Umocnię cię, a także ci pomogę, podeprę cię sprawiedliwą prawicą moją.",
    reference: "Księga Izajasza 41:10",
    book: "Księga Izajasza",
    chapter: 41,
    verse: 10,
    category: "sila",
    sourceUrl: "https://bible.com/pl/bible/3881/isa.41.10.nbg"
  },
  {
    id: 27,
    text: "Jestem bowiem świadomy zamiarów, jakie żywię co do was – wyrocznia Pana – zamiarów pełnych pokoju, a nie zguby, by zapewnić wam przyszłość, jakiej oczekujecie.",
    reference: "Księga Jeremiasza 29:11",
    book: "Księga Jeremiasza",
    chapter: 29,
    verse: 11,
    category: "nadzieja",
    sourceUrl: "https://bible.com/pl/bible/3881/jer.29.11.nbg"
  },
  {
    id: 28,
    text: "Albowiem nie dał nam Bóg ducha bojaźni, ale mocy i miłości, i trzeźwego myślenia.",
    reference: "2 List do Tymoteusza 1:7",
    book: "2 List do Tymoteusza",
    chapter: 1,
    verse: 7,
    category: "sila",
    sourceUrl: "https://bible.com/pl/bible/3881/2ti.1.7.nbg"
  },
  {
    id: 29,
    text: "Wznoszę oczy moje ku górom: skąd nadejdzie mi pomoc? Pomoc moja od Pana, który stworzył niebo i ziemię.",
    reference: "Księga Psalmów 121:1-2",
    book: "Księga Psalmów",
    chapter: 121,
    verse: 1,
    category: "wiara",
    sourceUrl: "https://bible.com/pl/bible/3881/psa.121.1-2.nbg"
  },
  {
    id: 30,
    text: "Weselcie się nadzieją! W ucisku bądźcie cierpliwi, w modlitwie – wytrwali!",
    reference: "List do Rzymian 12:12",
    book: "List do Rzymian",
    chapter: 12,
    verse: 12,
    category: "nadzieja",
    sourceUrl: "https://bible.com/pl/bible/3881/rom.12.12.nbg"
  },
  {
    id: 31,
    text: "Pan jest blisko ludzi o skruszonym sercu, ocala tych, których duch jest złamany.",
    reference: "Księga Psalmów 34:19",
    book: "Księga Psalmów",
    chapter: 34,
    verse: 19,
    category: "pokoj",
    sourceUrl: "https://bible.com/pl/bible/3881/psa.34.19.nbg"
  },
  {
    id: 32,
    text: "Nie troszczcie się więc zbytnio o jutro, bo jutrzejszy dzień sam o siebie troszczyć się będzie. Dosyć ma dzień swojej biedy.",
    reference: "Ewangelia wg św. Mateusza 6:34",
    book: "Ewangelia wg św. Mateusza",
    chapter: 6,
    verse: 34,
    category: "pokoj",
    sourceUrl: "https://bible.com/pl/bible/3881/mat.6.34.nbg"
  },
  {
    id: 33,
    text: "A Bóg mój zaspokoi każdą waszą potrzebę według swego bogactwa w chwale, w Chrystusie Jezusie.",
    reference: "List do Filipian 4:19",
    book: "List do Filipian",
    chapter: 4,
    verse: 19,
    category: "wiara",
    sourceUrl: "https://bible.com/pl/bible/3881/php.4.19.nbg"
  },
  {
    id: 34,
    text: "Na to wszystko zaś przyobleczcie miłość, która jest spoiwem doskonałości.",
    reference: "List do Kolosan 3:14",
    book: "List do Kolosan",
    chapter: 3,
    verse: 14,
    category: "milosc",
    sourceUrl: "https://bible.com/pl/bible/3881/col.3.14.nbg"
  },
  {
    id: 35,
    text: "Dasz mi poznać ścieżkę życia, pełnię radości u Twego oblicza, rozkosze na wieki po Twojej prawicy.",
    reference: "Księga Psalmów 16:11",
    book: "Księga Psalmów",
    chapter: 16,
    verse: 11,
    category: "madrosc",
    sourceUrl: "https://bible.com/pl/bible/3881/psa.16.11.nbg"
  },
  {
    id: 36,
    text: "Błogosławieni, którzy wprowadzają pokój, albowiem oni będą nazwani synami Bożymi.",
    reference: "Ewangelia wg św. Mateusza 5:9",
    book: "Ewangelia wg św. Mateusza",
    chapter: 5,
    verse: 9,
    category: "pokoj",
    sourceUrl: "https://bible.com/pl/bible/3881/mat.5.9.nbg"
  },
  {
    id: 37,
    text: "Nikt nie ma większej miłości od tej, gdy ktoś życie swoje oddaje za przyjaciół swoich.",
    reference: "Ewangelia wg św. Jana 15:13",
    book: "Ewangelia wg św. Jana",
    chapter: 15,
    verse: 13,
    category: "milosc",
    sourceUrl: "https://bible.com/pl/bible/3881/jhn.15.13.nbg"
  },
  {
    id: 38,
    text: "Jednie w Bogu spokój znajduje moja dusza, od Niego pochodzi moje zbawienie.",
    reference: "Księga Psalmów 62:2",
    book: "Księga Psalmów",
    chapter: 62,
    verse: 2,
    category: "pokoj",
    sourceUrl: "https://bible.com/pl/bible/3881/psa.62.2.nbg"
  },
  {
    id: 39,
    text: "Powierz Panu swoje dzieła, a spełnią się twoje zamiary.",
    reference: "Księga Przysłów 16:3",
    book: "Księga Przysłów",
    chapter: 16,
    verse: 3,
    category: "wiara",
    sourceUrl: "https://bible.com/pl/bible/3881/pro.16.3.nbg"
  },
  {
    id: 40,
    text: "Wszystkie wasze sprawy niech się dzieją w miłości.",
    reference: "1 List do Koryntian 16:14",
    book: "1 List do Koryntian",
    chapter: 16,
    verse: 14,
    category: "milosc",
    sourceUrl: "https://bible.com/pl/bible/3881/1co.16.14.nbg"
  },
  {
    id: 41,
    text: "On leczy złamanych na duchu i przewiązuje ich rany.",
    reference: "Księga Psalmów 147:3",
    book: "Księga Psalmów",
    chapter: 147,
    verse: 3,
    category: "nadzieja",
    sourceUrl: "https://bible.com/pl/bible/3881/psa.147.3.nbg"
  },
  {
    id: 42,
    text: "Pan, twój Bóg jest pośród ciebie, Mocarz, który zbawia, uniesie się weselem nad tobą, odnowi swą miłość, wzniesie okrzyk radości.",
    reference: "Księga Sofoniasza 3:17",
    book: "Księga Sofoniasza",
    chapter: 3,
    verse: 17,
    category: "milosc",
    sourceUrl: "https://bible.com/pl/bible/3881/zep.3.17.nbg"
  },
  {
    id: 43,
    text: "U ludzi to niemożliwe, ale nie u Boga; bo u Boga wszystko jest możliwe.",
    reference: "Ewangelia wg św. Marka 10:27",
    book: "Ewangelia wg św. Marka",
    chapter: 10,
    verse: 27,
    category: "wiara",
    sourceUrl: "https://bible.com/pl/bible/3881/mrk.10.27.nbg"
  },
  {
    id: 44,
    text: "I jestem pewien, że ani śmierć, ani życie, ani aniołowie, ani Zwierzchności, ani rzeczy teraźniejsze, ani przyszłe, ani Moce, ani co wysokie, ani co głębokie, ani jakiekolwiek inne stworzenie nie zdoła nas odłączyć od miłości Boga, która jest w Chrystusie Jezusie, Panu naszym.",
    reference: "List do Rzymian 8:38-39",
    book: "List do Rzymian",
    chapter: 8,
    verse: 38,
    category: "milosc",
    sourceUrl: "https://bible.com/pl/bible/3881/rom.8.38-39.nbg"
  },
  {
    id: 45,
    text: "Bądźcie dla siebie nawzajem łagodni i miłosierni, przebaczając sobie nawzajem, tak jak i Bóg wam przebaczył w Chrystusie.",
    reference: "List do Efezjan 4:32",
    book: "List do Efezjan",
    chapter: 4,
    verse: 32,
    category: "milosc",
    sourceUrl: "https://bible.com/pl/bible/3881/eph.4.32.nbg"
  },
  {
    id: 46,
    text: "Dziękuję Ci, że mnie stworzyłeś tak cudownie, godne podziwu są Twoje dzieła, a moja dusza wie o tym bardzo dobrze.",
    reference: "Księga Psalmów 139:14",
    book: "Księga Psalmów",
    chapter: 139,
    verse: 14,
    category: "wdziecznosc",
    sourceUrl: "https://bible.com/pl/bible/3881/psa.139.14.nbg"
  },
  {
    id: 47,
    text: "Zawsze się radujcie, nieustannie się módlcie! W każdym położeniu dziękujcie, taka jest bowiem wola Boża w Chrystusie Jezusie względem was.",
    reference: "1 List do Tesaloniczan 5:16-18",
    book: "1 List do Tesaloniczan",
    chapter: 5,
    verse: 16,
    category: "wdziecznosc",
    sourceUrl: "https://bible.com/pl/bible/3881/1th.5.16-18.nbg"
  },
  {
    id: 48,
    text: "Proście, a będzie wam dane; szukajcie, a znajdziecie; kołaczcie, a otworzą wam. Każdy bowiem, kto prosi, otrzymuje; kto szuka, znajduje; a kołaczącemu otworzą.",
    reference: "Ewangelia wg św. Mateusza 7:7-8",
    book: "Ewangelia wg św. Mateusza",
    chapter: 7,
    verse: 7,
    category: "wiara",
    sourceUrl: "https://bible.com/pl/bible/3881/mat.7.7-8.nbg"
  },
  {
    id: 49,
    text: "Błogosław, duszo moja, Pana, i nie zapominaj o wszystkich Jego dobrodziejstwach! On odpuszcza wszystkie twoje winy, On leczy wszystkie twoje choroby.",
    reference: "Księga Psalmów 103:2-3",
    book: "Księga Psalmów",
    chapter: 103,
    verse: 2,
    category: "wdziecznosc",
    sourceUrl: "https://bible.com/pl/bible/3881/psa.103.2-3.nbg"
  },
  {
    id: 50,
    text: "Ja jestem światłością świata. Kto idzie za Mną, nie będzie chodził w ciemności, lecz będzie miał światło życia.",
    reference: "Ewangelia wg św. Jana 8:12",
    book: "Ewangelia wg św. Jana",
    chapter: 8,
    verse: 12,
    category: "madrosc",
    sourceUrl: "https://bible.com/pl/bible/3881/jhn.8.12.nbg"
  }
];
