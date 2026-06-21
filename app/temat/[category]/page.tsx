import { quotes } from "../../data/quotes";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryClientPage from "./CategoryClientPage";

const categories = ["pokoj", "milosc", "nadzieja", "sila", "wiara", "wdziecznosc", "madrosc"];

const categoryMetadata: Record<string, { title: string; desc: string; h1: string; intro: string }> = {
  pokoj: {
    title: "Wersety biblijne o pokoju serca i umysłu - LosujWerset.pl",
    desc: "Szukasz wyciszenia, spokoju serca i uwolnienia od lęku? Przeczytaj wersety biblijne o pokoju Bożym, które przyniosą ukojenie Twojej duszy.",
    h1: "Wersety biblijne o pokoju",
    intro: "Słowo Boże oferuje głęboki pokój, który przewyższa wszelki umysł. Kiedy zmagasz się z niepokojem, stresem lub lękiem, te fragmenty Pisma Świętego pomogą Ci odnaleźć wewnętrzną harmonię i zaufanie Bogu."
  },
  milosc: {
    title: "Cytaty z Biblii o miłości Boga i bliźniego - LosujWerset.pl",
    desc: "Odkryj najpiękniejsze wersety o miłości w Piśmie Świętym. Poznaj głębię miłości Boga, przykazanie miłości bliźniego oraz słynny Hymn o miłości.",
    h1: "Wersety biblijne o miłości",
    intro: "Bóg jest miłością, a Pismo Święte na wielu stronach opisuje to najpiękniejsze z uczuć. Odkryj wersety mówiące o bezwarunkowej miłości Boga, miłości w małżeństwie, rodzinie i wobec drugiego człowieka."
  },
  nadzieja: {
    title: "Wersety biblijne o nadziei i pocieszeniu - LosujWerset.pl",
    desc: "Znajdź nadzieję i pocieszenie w trudnych chwilach. Zobacz budujące wersety z Pisma Świętego, które wskażą Ci drogę w ciemności i dadzą siłę na jutro.",
    h1: "Wersety biblijne o nadziei",
    intro: "Nadzieja chrześcijańska nie zawodzi. Jeśli przechodzisz przez trudny czas i potrzebujesz pocieszenia, te wersety z Biblii przypomną Ci o obietnicach Boga i Jego wierności."
  },
  sila: {
    title: "Wersety o sile i męstwie w trudnych chwilach - LosujWerset.pl",
    desc: "Potrzebujesz siły, odwagi i wsparcia? Przeczytaj motywujące wersety biblijne, które pomogą Ci pokonać każdą przeciwność losu z pomocą Boga.",
    h1: "Wersety biblijne o sile",
    intro: "Kiedy czujesz się słaby, zmęczony lub przytłoczony problemami, Bóg obiecuje być Twoją siłą. Te wersety biblijne pomogą Ci odzyskać odwagę, męstwo i zaufanie w Jego moc."
  },
  wiara: {
    title: "Wersety biblijne o wierze i zaufaniu Bogu - LosujWerset.pl",
    desc: "Jak wzmocnić swoją wiarę? Przeczytaj wersety o wierze, zaufaniu obietnicom Bożym i sile modlitwy. Zobacz, co Biblia mówi o wierze, która góry przenosi.",
    h1: "Wersety biblijne o wierze",
    intro: "Wiara jest poręką tych dóbr, których się spodziewamy. Te fragmenty Słowa Bożego pomogą Ci pogłębić osobistą relację z Bogiem, zaufać Mu bez granic i żyć pełnią wiary na co dzień."
  },
  wdziecznosc: {
    title: "Wersety o wdzięczności i dziękczynieniu - LosujWerset.pl",
    desc: "Dziękuj Panu, bo jest dobry! Poznaj wersety biblijne o wdzięczności, radości i chwaleniu Boga za Jego codzienne błogosławieństwa i wielkie dzieła.",
    h1: "Wersety biblijne o wdzięczności",
    intro: "Wdzięczność otwiera nasze serca na Boże działanie. Biblia zachęca nas, byśmy dziękowali w każdym położeniu. Te wersety pomogą Ci dostrzec Bożą dobroć i wyrazić dziękczynienie."
  },
  madrosc: {
    title: "Mądrość Boża z Biblii: wersety i cytaty - LosujWerset.pl",
    desc: "Szukasz mądrości życiowej i właściwego kierunku? Przeczytaj biblijne wersety o mądrości, roztropności i podejmowaniu dobrych decyzji w oparciu o Słowo Boże.",
    h1: "Wersety biblijne o mądrości",
    intro: "Początkiem mądrości jest bojaźń Pańska. Jeśli stoisz przed trudnym wyborem lub szukasz życiowej wskazówki, te wersety z Księgi Przysłów, Psalmów i innych ksiąg wskażą Ci Bożą mądrość."
  }
};

export function generateStaticParams() {
  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const data = categoryMetadata[category];
  if (!data) return {};

  return {
    title: data.title,
    description: data.desc,
    alternates: {
      canonical: `/temat/${category}`,
    },
    openGraph: {
      title: data.title,
      description: data.desc,
      type: "website",
      locale: "pl_PL",
    }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  if (!categories.includes(category)) {
    notFound();
  }

  const catQuotes = quotes.filter((q) => q.category === category);
  const data = categoryMetadata[category];

  return (
    <CategoryClientPage 
      category={category} 
      quotes={catQuotes} 
      title={data.h1} 
      intro={data.intro} 
    />
  );
}
