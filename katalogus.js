const venues = [
  {"title":"Vígszínház","meta":"1137 Budapest, Szent István körút 14.","url":"https://vigszinhaz.hu/hu/a-szinhaz/vigszinhaz","image":"https://vigszinhaz.hu/media/images/photo_vigszinhaz_ratonyigabor_2022__18_6jpg.original.jpg","credit":"Rátonyi Gábor"},
  {"title":"Pesti Színház","meta":"1052 Budapest, Váci utca 9.","url":"https://vigszinhaz.hu/hu/a-szinhaz/pesti-szinhaz","image":"https://vigszinhaz.hu/_next/image?url=https%3A%2F%2Fvigszinhaz.hu%2Fmedia%2Fimages%2Fpestiszinhaz_ratonyigabor_1_3sB81Mz.original.jpg&w=1920&q=75","credit":"Rátonyi Gábor"},
  {"title":"Madách Színház","meta":"1073 Budapest, Erzsébet körút 29–33.","url":"https://madachszinhaz.hu/epulet","image":"https://i.madachszinhaz.hu/epulet-008-3.inbox640x360.jpg"},
  {"title":"Budapesti Operettszínház","meta":"1065 Budapest, Nagymező utca 17.","url":"https://operett.hu/a-budapesti-operettszinhaz","image":"https://operett.hu/pixs/pix-page-cover/nevtelen-terv-2025-08-08t144733810-646f4788e3.png"},
  {"title":"Nemzeti Színház","meta":"1095 Budapest, Bajor Gizi park 1.","url":"https://nemzetiszinhaz.hu/hol-talal-minket","image":"https://baratsagklub.hu/sites/baratsagklub.hu/files/budapest_nemzeti_szinhaz_8.jpg","imageAlt":"A Nemzeti Színház nézőtere és kék kupolája"},
  {"title":"Magyar Állami Operaház","meta":"1061 Budapest, Andrássy út 22.","url":"https://jegy.opera.hu/venue/magyar-allami-operahaz/contact?lang=hu","image":"https://tour.opera.hu/media/images/00_N5A9881_resize.2e16d0ba.fill-800x450.jpegquality-80.jpg","imageAlt":"A Magyar Állami Operaház nézőtere"},
  {"title":"Centrál Színház","meta":"1065 Budapest, Révay utca 18.","url":"https://centralszinhaz.hu/kapcsolat/","image":"https://pb2.jegy.hu/imgs/system-4/venue/000/000/299/central-szinhaz-original-128803.jpg","imageAlt":"A Centrál Színház nézőtere"},
  {"title":"Újszínház","meta":"1061 Budapest, Paulay Ede utca 35.","url":"https://ujszinhaz.hu/epulettortenet/","image":"https://pb2.jegy.hu/imgs/system-4/venue/000/000/023/uj-szinhaz-original-196743.jpg","imageAlt":"Az Újszínház nézőtere és karzata"},
  {"title":"Katona József Színház · Kamra","meta":"1053 Budapest, Ferenciek tere 4.","url":"https://katonajozsefszinhaz.hu/kapcsolat/","image":"https://kep.cdn.indexvas.hu/1/0/4667/46670/466700/46670074_76c2ebe5277f693974c96822775a54f0_wm.jpg","imageAlt":"A Kamra belső tere a Magányos emberek előadáshoz berendezve"},
  {"title":"Örkény István Színház","meta":"1075 Budapest, Madách Imre tér 6.","url":"https://orkenyszinhaz.hu/impresszum","logo":"https://ic.ittlakunk.hu/354701/orkeny_istvan_szinhaz_logo.jpg/cfd733de6b885f0d.webp"}
];
const productions = [
  {"id":"pal","title":"A Pál utcai fiúk","venue":"Vígszínház","kind":"zenés játék","author":"Molnár Ferenc regénye, Dés László, Geszti Péter és Grecsó Krisztián színpadi változata","director":"Marton László","description":"A grundot védő pesti fiúk története Molnár Ferenc regénye nyomán.","next":"2026-11-24T19:00:00+01:00","image":"https://vigszinhaz.hu/_next/image?url=https%3A%2F%2Fvigszinhaz.hu%2Fmedia%2Fimages%2F20200817_gordoneszter_9812.original.jpg&w=3840&q=75","credit":"Gordon Eszter","url":"https://vigszinhaz.hu/hu/produkciok/a_pal_utcai_fiuk"},
  {"id":"dzsungel","title":"A dzsungel könyve","venue":"Pesti Színház","kind":"zenés játék","author":"Dés László, Geszti Péter és Békés Pál","director":"Hegedűs D. Géza","description":"Kipling történetének színpadi változatában Maugli a dzsungel és az emberek világa között keresi a helyét.","image":"https://vigszinhaz.hu/api/og/production/a_dzsungel_konyve?locale=hu&v=1bn53ti","url":"https://vigszinhaz.hu/hu/produkciok/a_dzsungel_konyve"},
  {"id":"mamma","title":"Mamma Mia!","venue":"Madách Színház","kind":"musical","author":"Benny Andersson, Björn Ulvaeus és Catherine Johnson","director":"Szirtes Tamás","description":"Sophie az esküvőjére három férfit hív meg, hogy megtudja, melyikük az apja. A történetet az ABBA dalai kísérik.","image":"https://i.madachszinhaz.hu/mammamia-3-1.exact1600w.jpg","url":"https://madachszinhaz.hu/szindarab/mamma-mia"},
  {"id":"csardas","title":"Csárdáskirálynő","venue":"Budapesti Operettszínház","kind":"operett","author":"Kálmán Imre","director":"Vidnyánszky Attila","description":"Szilvia és Edvin kapcsolatát a századelő társadalmi elvárásai teszik próbára.","image":"https://operett.hu/pixs/pix-repertoar/csardas2.jpg","url":"https://new.operett.hu/repertoar/csardaskiralyno-eid60523"},
  {"id":"bank","title":"Bánk bán","venue":"Nemzeti Színház","kind":"dráma","author":"Katona József","description":"Bánk nagyúrnak a királyné udvara körül kialakult konfliktusban a családja és az ország sorsa között kell döntenie.","image":"https://nemzetiszinhaz.hu/uploads/images_2/2026_2027/Bank_ban/net_Bank_ban_2026_eorifoto-5544(1).jpg","url":"https://nemzetiszinhaz.hu/eloadas/bank","director":"Vidnyánszky Attila","credit":"Eöri Szabó Zsolt"},
  {"id":"dio","title":"A diótörő","venue":"Magyar Állami Operaház","kind":"balett","author":"Pjotr Iljics Csajkovszkij","description":"Karácsonyi balett, amelyben egy játék diótörő vezeti a történet hősét a mese világába.","image":"https://www.opera.hu/media/images/00_Diotoro_KREA_Iyzxr3Z.max-600x400.jpg","url":"https://www.opera.hu/hu/musor/2026-2027/a-diotoro/"},
  {"id":"fair","title":"My Fair Lady","venue":"Centrál Színház","kind":"musical","author":"Alan Jay Lerner és Frederick Loewe","director":"Puskás Tamás","description":"Higgins professzor fogadást köt, hogy a virágárus Elizát a londoni előkelő társaság tagjaként tudja bemutatni.","next":"2026-11-18T19:00:00+01:00","image":"https://centralszinhaz.hu/wp-content/uploads/2025/09/my_fair_lady_listakep.jpg","url":"https://centralszinhaz.hu/eloadas/my-fair-lady/","hero":"https://centralszinhaz.hu/wp-content/uploads/2025/09/my_fair_lady_borito-2048x840.jpg"},
  {"id":"macska","title":"Macskajáték","venue":"Újszínház","kind":"tragikomédia","author":"Örkény István","director":"Vass György","description":"Orbánné és nővére, Giza történetében az öregedés, a szerelem és a testvéri ragaszkodás kerül színpadra.","image":"https://ujszinhaz.hu/wp-content/uploads/2026/08/web_1920_1080-100-1200x630.jpg","url":"https://ujszinhaz.hu/eloadas/macskajatek/"},
  {"id":"gep","title":"Gépnarancs","venue":"Katona József Színház · Kamra","kind":"színpadi adaptáció","author":"Anthony Burgess","director":"Sándor Dániel Máté","description":"A Kamra audiovizuális előadása Alex útját követi az erőszaktól a kényszerű átnevelésig.","image":"https://katonajozsefszinhaz.hu/wp-content/uploads/2026/07/DSC00224-1-scaled-e1791466360113.jpg","url":"https://katonajozsefszinhaz.hu/eloadasok/gepnarancs/"},
  {"id":"tyuk","title":"Anyám tyúkja (1.)","venue":"Örkény István Színház","kind":"színpadi versválogatás","author":"Válogatta Várady Szabolcs","director":"Mácsai Pál","description":"Ismert magyar versekből összeállított színházi est az Örkény társulatával.","image":"https://files.jegyx1.hu/uploads/posters/aty1.jpg","url":"https://orkenyszinhaz.hu/jegyvasarlas/eloadas/253/anyam-tyukja"},
  {"id":"tiszta","title":"Tiszta őrület","venue":"Centrál Színház","kind":"vígjáték","author":"Woody Allen","description":"Egy baráti vacsora terve felborul, amikor a házigazda volt partnere bejelentkezik Woody Allen egyfelvonásos komédiájában.","image":"https://centralszinhaz.hu/wp-content/uploads/2026/07/Tiszta_orulet_ea_listakep.jpg","url":"https://centralszinhaz.hu/eloadas/tiszta-orulet/","director":"Puskás Tamás","credit":"Horváth Judit"}
];
const audienceReviews = [
  { productionId: 'fair', date: '2026-11-15', quote: '„A szereposztás kiváló!”' },
  { productionId: 'tiszta', date: '2026-11-12', quote: '„Pörgő előadás kitűnő színészekkel!”' },
];

const performers = [
  {"title":"Wunderlich József","meta":"Vígszínház · Boka szerepében","url":"https://vigszinhaz.hu/hu/produkciok/a_pal_utcai_fiuk","image":"https://vigszinhaz.hu/_next/image?url=https%3A%2F%2Fvigszinhaz.hu%2Fmedia%2Fimages%2Fvig_26_tarsulat_honlap_610x406px_49_wunderlich_.original.jpg&w=828&q=75"},
  {"title":"Balla Eszter","meta":"Centrál Színház · Eliza Doolittle szerepében","url":"https://centralszinhaz.hu/tarsulat/balla_eszter/","image":"https://centralszinhaz.hu/wp-content/uploads/2025/09/balla_eszter.jpg"},
  {"title":"Trill Zsolt","meta":"Nemzeti Színház · Kossuth- és Jászai Mari-díjas színművész","url":"https://nemzetiszinhaz.hu/muvesz/trill-zsolt","image":"https://nemzetiszinhaz.hu/image?src=uploads/images_2/Portre_2025/Portre4-1358.jpg&w=365&h=550&zc=donot&a=t"},
  {"title":"Mahó Andrea","meta":"Madách Színház · színművész","url":"https://madachszinhaz.hu/munkatars/maho-andrea","image":"https://i.madachszinhaz.hu/portre-maho-andrea.inbox366x366.jpg"},
  {"title":"Szendy Szilvi","meta":"Budapesti Operettszínház · színművész","url":"https://operett.hu/tarsulat/szendy-szilvi-70","image":"https://operett.hu/pixs/pix-tarsulat/nevtelen-terv-94-9b2ec554a2.png"},
  {"title":"Jánosi Dávid","meta":"Újszínház · Erkel Ferenc a La Grange-ban","url":"https://ujszinhaz.hu/szinesz/janosi-david/","image":"https://ujszinhaz.hu/wp-content/uploads/2026/06/1f68817afb210c6bedb606bae6eb8c12-720x900.webp"},
  {"title":"Pálmai Anna","meta":"Katona József Színház · színművész","url":"https://katonajozsefszinhaz.hu/tarsulat/palmai-anna/","image":"https://katonajozsefszinhaz.hu/wp-content/uploads/2026/08/sRGB_1PalmaiA-819x1024.jpg"},
  {"title":"Medveczky Balázs","meta":"Pesti Színház · A dzsungel könyve szereplője","url":"https://vigszinhaz.hu/hu/szemelyek/medveczky_balazs","image":"https://vigszinhaz.hu/media/images/vig_26_tarsulat_honlap_610x406px_27_medveczky_2.original.jpg"},
  {"title":"Csákányi Eszter","meta":"Örkény István Színház · színművész","url":"https://www.orkenyszinhaz.hu/tarsulat"}
];
const premieres = [
  {"title":"La Grange","meta":"Újszínház","author":"Kiss József","director":"Kiss József","date":"2026-11-27","displayDate":"2026. november 27., 19:00","image":"https://ujszinhaz.hu/wp-content/uploads/2026/09/la-grange-fejlec-szoveges.webp","url":"https://ujszinhaz.hu/eloadas/la-grange/"},
  {"title":"Őz","meta":"Katona József Színház · Kamra","author":"Kiss-Végh Emőke","director":"Kiss-Végh Emőke","date":"2026-12-11","displayDate":"2026. december 11.","image":"https://katonajozsefszinhaz.hu/wp-content/uploads/2026/07/IMG_2651-scaled.jpg","url":"https://katonajozsefszinhaz.hu/eloadasok/oz/"},
  {"title":"Closer","meta":"Centrál Színház · Kisszínpad","author":"Patrick Marber","director":"Alföldi Róbert","date":"2026-12-11","displayDate":"2026. december 11., 19:00","image":"https://centralszinhaz.hu/wp-content/uploads/2026/10/closer_cover1-2048x840.jpg","url":"https://centralszinhaz.hu/eloadas/closer/"},
  {"title":"Cseresznyéskert","meta":"Vígszínház","author":"Anton Pavlovics Csehov","director":"Alekszandr Bargman","date":"2026-12-12","displayDate":"2026. december 12., 19:00","image":"https://vigszinhaz.hu/_next/image?url=https%3A%2F%2Fvigszinhaz.hu%2Fmedia%2Fimages%2Fweb_indexkep_25_26_vig.original.jpg&w=3840&q=75","url":"https://vigszinhaz.hu/hu/produkciok/cseresznyeskert"}
];

const slug = text => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function detailUrl(type, id) {
  return 'adatlap.html?tipus=' + type + '&id=' + encodeURIComponent(id);
}

const theatreRecords = venues.filter(entry => entry.title !== 'Pesti Színház').map(entry =>
  entry.title.endsWith(' · Kamra') ? { ...entry, title: 'Katona József Színház', meta: '',
    image: '', imageAlt: '' } : entry
).map(entry => ({ ...entry, id: slug(entry.title), detail: detailUrl('szinhaz', slug(entry.title)) }));

const artistRecords = performers.map(entry => ({
  ...entry, id: slug(entry.title), detail: detailUrl('szinesz', slug(entry.title))
}));

// A mű saját adatai külön állnak az egyes színpadi változatoktól.
const workRecords = [
  ['pal', 'Molnár Ferenc', 'Ifjúsági regény'],
  ['dzsungel', 'Rudyard Kipling', 'Elbeszélésgyűjtemény'],
  ['mamma', 'Benny Andersson, Björn Ulvaeus és Catherine Johnson', 'Musical'],
  ['csardas', 'Kálmán Imre', 'Operett'],
  ['bank', 'Katona József', 'Dráma'],
  ['dio', 'Pjotr Iljics Csajkovszkij', 'Balett'],
  ['fair', 'Alan Jay Lerner és Frederick Loewe', 'Musical'],
  ['macska', 'Örkény István', 'Dráma'],
  ['gep', 'Anthony Burgess', 'Regény'],
  ['tyuk', 'Válogatta Várady Szabolcs', 'Versválogatás'],
  ['tiszta', 'Woody Allen', 'Vígjáték'],
].map(([id, author, kind]) => {
  const { title, url, image, credit } = productions.find(entry => entry.id === id);
  return { id, title, author, kind, meta: author, url, image, credit, detail: detailUrl('mu', id) };
});

const theatreForVenue = title => theatreRecords.find(entry =>
  entry.title === title ||
  (title === 'Pesti Színház' && entry.title === 'Vígszínház') ||
  (title?.startsWith('Katona József Színház · ') && entry.title === 'Katona József Színház')
);

const publicVenueRecords = venues.map(entry => {
  const theatre = theatreRecords.find(theatre => theatre.title === entry.title);
  return theatre ? { ...entry, detail: theatre.detail } : entry;
});
