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
  {"title":"Örkény István Színház","meta":"1075 Budapest, Madách Imre tér 6.","url":"https://orkenyszinhaz.hu/impresszum","image":"https://welovebudapest.com/i/ee/orkeny-istvan-theater.inbox1560x1170.jpg","imageAlt":"Az Örkény István Színház bejárata a Madách téren","imageSource":"https://welovebudapest.com/hely/orkeny-istvan-szinhaz","imageSourceName":"We Love Budapest"}
];
const productions = [
  {"id":"pal","title":"A Pál utcai fiúk","venue":"Vígszínház","kind":"zenés játék","author":"Molnár Ferenc regénye, Dés László, Geszti Péter és Grecsó Krisztián színpadi változata","director":"Marton László","description":"A grundot védő pesti fiúk története Molnár Ferenc regénye nyomán.","next":"2026-11-24T19:00:00+01:00","image":"https://vigszinhaz.hu/_next/image?url=https%3A%2F%2Fvigszinhaz.hu%2Fmedia%2Fimages%2F20200817_gordoneszter_9812.original.jpg&w=3840&q=75","credit":"Gordon Eszter","url":"https://vigszinhaz.hu/hu/produkciok/a_pal_utcai_fiuk"},
  {"id":"dzsungel","title":"A dzsungel könyve","venue":"Pesti Színház","kind":"zenés játék","author":"Dés László, Geszti Péter és Békés Pál","director":"Hegedűs D. Géza","description":"Kipling történetének színpadi változatában Maugli a dzsungel és az emberek világa között keresi a helyét.","image":"https://vigszinhaz.hu/api/og/production/a_dzsungel_konyve?locale=hu&v=1bn53ti","url":"https://vigszinhaz.hu/hu/produkciok/a_dzsungel_konyve"},
  {"id":"mamma","title":"Mamma Mia!","venue":"Madách Színház","kind":"musical","author":"Benny Andersson, Björn Ulvaeus és Catherine Johnson","director":"Szirtes Tamás","description":"Sophie az esküvőjére három férfit hív meg, hogy megtudja, melyikük az apja. A történetet az ABBA dalai kísérik.","image":"https://i.madachszinhaz.hu/mammamia-3-1.exact1600w.jpg","url":"https://madachszinhaz.hu/szindarab/mamma-mia"},
  {"id":"csardas","title":"Csárdáskirálynő","venue":"Budapesti Operettszínház","kind":"operett","author":"Kálmán Imre","director":"Vidnyánszky Attila","description":"Szilvia és Edvin kapcsolatát a századelő társadalmi elvárásai teszik próbára.","image":"https://operett.hu/pixs/pix-repertoar/csardas2.jpg","url":"https://new.operett.hu/repertoar/csardaskiralyno-eid60523"},
  {"id":"bank","title":"Bánk bán","venue":"Nemzeti Színház","kind":"dráma","author":"Katona József","description":"Bánk nagyúrnak a királyné udvara körül kialakult konfliktusban a családja és az ország sorsa között kell döntenie.","image":"https://nemzetiszinhaz.hu/uploads/images_2/2026_2027/Bank_ban/net_Bank_ban_2026_eorifoto-5544(1).jpg","url":"https://nemzetiszinhaz.hu/eloadas/bank","director":"Vidnyánszky Attila","credit":"Eöri Szabó Zsolt"},
  {"id":"dio","title":"A diótörő","venue":"Magyar Állami Operaház","kind":"balett","author":"Pjotr Iljics Csajkovszkij","description":"Karácsonyi balett, amelyben egy játék diótörő vezeti a történet hősét a mese világába.","image":"https://www.opera.hu/media/images/00_Diotoro_KREA_Iyzxr3Z.max-600x400.jpg","url":"https://www.opera.hu/hu/musor/2026-2027/a-diotoro/"},
  {"id":"fair","title":"My Fair Lady","venue":"Centrál Színház","kind":"musical","author":"Alan Jay Lerner és Frederick Loewe","director":"Puskás Tamás","description":"Higgins professzor fogadást köt, hogy a virágárus Elizát a londoni előkelő társaság tagjaként tudja bemutatni.","next":"2026-11-18T19:00:00+01:00","image":"https://centralszinhaz.hu/wp-content/uploads/2025/09/my_fair_lady_listakep.jpg","url":"https://centralszinhaz.hu/eloadas/my-fair-lady/","hero":"https://centralszinhaz.hu/wp-content/uploads/2025/09/my_fair_lady_borito-2048x840.jpg"},
  {"id":"macska","title":"Macskajáték","venue":"Újszínház","kind":"tragikomédia","author":"Örkény István","director":"Vass György","description":"Orbánné és nővére, Giza történetében az öregedés, a szerelem és a testvéri ragaszkodás kerül színpadra.","image":"https://ujszinhaz.hu/wp-content/uploads/2026/08/macskajatek-eloadas-5334-scaled.webp","credit":"Kohári Dominika Atália","url":"https://ujszinhaz.hu/eloadas/macskajatek/"},
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
  {"title":"Csákányi Eszter","meta":"Örkény István Színház · színművész","url":"https://www.orkenyszinhaz.hu/tarsulat","image":"https://m.blog.hu/sz/szinhaz/image/interjuk_2017-18/orkeny/csakanyi_horvath_judit_ok.jpg","imageAlt":"Csákányi Eszter portréja","credit":"Horváth Judit","imageSource":"https://szinhaz.hu/2018/03/23/csakanyi_eszter_nagyon_hasonloak_a_gondolataink_az_izlesunk_a_celjaink","imageSourceName":"Színház.hu"}
];
const premieres = [
  {"title":"La Grange","meta":"Újszínház","author":"Kiss József","director":"Kiss József","date":"2026-11-27","displayDate":"2026. november 27., 19:00","image":"https://ujszinhaz.hu/wp-content/uploads/2026/09/la-grange-olvasoproba-7605-scaled.webp","imageAlt":"A La Grange olvasópróbája az Újszínházban","credit":"Kohári Dominika Atália","url":"https://ujszinhaz.hu/eloadas/la-grange/"},
  {"title":"Őz","meta":"Katona József Színház · Kamra","author":"Kiss-Végh Emőke","director":"Kiss-Végh Emőke","date":"2026-12-11","displayDate":"2026. december 11.","image":"https://katonajozsefszinhaz.hu/wp-content/uploads/2026/07/IMG_2651-scaled.jpg","url":"https://katonajozsefszinhaz.hu/eloadasok/oz/"},
  {"title":"Closer","meta":"Centrál Színház · Kisszínpad","author":"Patrick Marber","director":"Alföldi Róbert","date":"2026-12-11","displayDate":"2026. december 11., 19:00","image":"https://centralszinhaz.hu/wp-content/uploads/2026/10/closer_cover1-2048x840.jpg","url":"https://centralszinhaz.hu/eloadas/closer/"},
  {"title":"Cseresznyéskert","meta":"Vígszínház","author":"Anton Pavlovics Csehov","director":"Alekszandr Bargman","date":"2026-12-12","displayDate":"2026. december 12., 19:00","image":"https://vigszinhaz.hu/media/images/cseresznyeskert_olvaso__domolky_daniel_WEB_040.original.jpg","imageAlt":"A Cseresznyéskert olvasópróbája a Vígszínházban","credit":"Dömölky Dániel","url":"https://vigszinhaz.hu/hu/produkciok/cseresznyeskert"}
];

// A társulat és repertoár forrása: https://loupe.hu/rolunk és az előadások adatlapjai.
venues.push({ title: 'Loupe Színházi Társulás', meta: 'Független társulat · Budapest és vendégjátékok', url: 'https://loupe.hu/rolunk', image: 'https://meglepetes.hu/uploads/2025/11/lengyel-tamas-loupe-1228x1536.jpg', imageAlt: 'A Loupe Színházi Társulás négy alapítója', imageSource: 'https://meglepetes.hu/cimlapsztori/2025/11/12/gyerekei-jovoje-miatt-aggodik-lengyel-tamas-a-szorongas-neha-eluralkodik-rajtam-de-probalom-kezelni/', imageSourceName: 'Meglepetés' });
const loupeArtists = [
  ['Lengyel Tamás', 'lengyel-tamas', 'Alapító'], ['Lovas Rozi', 'lovas-rozi', 'Alapító'], ['Molnár Áron', 'molnar-aron', 'Alapító'],
  ['Mohai Tamás', 'mohai-tamas', 'Társulati tag'], ['Rusznák András', 'rusznak-andras', 'Társulati tag'],
  ['Váradi Gergely', 'varadi-gergely', 'Társulati tag'], ['Földes Eszter', 'foldes-eszter', 'Társulati tag'],
  ['Trill Beatrix', 'trill-beatrix', 'Társulati tag'], ['Rainer-Micsinyei Nóra', 'rainer-micsinyei-nora', 'Társulati tag'],
  ['Gryllus Dorka', 'gryllus-dorka', 'Társulati tag'], ['Sztarenki Dóra', 'sztarenki-dora', 'Társulati tag'],
  ['Brezovszky Dániel', 'brezovszky-daniel', 'Társulati tag'],
  ...['Sodró Eliza', 'Ullmann Mónika', 'Bánki Gergely', 'Samudovszky Adrián', 'Stefanovics Angéla', 'Takács Katalin', 'Znamenák István'].map(name => [name, '', 'Vendégművész'])
];
const loupePortraits = [
  'fb0311cd35c61385c5a491fe802d710f4a28bdbb-3648x5472', 'c17a134385dfbcc22741d8978033bb7839aa1538-3648x5472', '9be64dada5f87b36546713e888729eccf96e4905-3648x5472',
  '3934010aa4018d5ea38fe26a1217d0ea3fad599e-3551x5327', 'd2eaad8ed45d19fbecb3902b061d41129dcad8c2-3648x4239', '7b5ff0743111b652a37cf6ddc32cc2ae0f6a4599-3648x5472',
  '003bc72a240641e6102ad4ed3bfbf0c747050433-3648x5472', 'b6dc18f6fa1bae50b786076675cf4d39826dd520-3648x3920', '82c425784275c658f7aa6f53984b0d7824542035-3648x5472',
  '86422f6594556da24e9ce149c0d3e33d8f6b2e2b-3648x5472', 'faf1a50c652dc247401a09f3ce6d3e083816542c-3648x5472', 'aa10560c4c0ffd43b0b44714e4bbd16e5ed041d5-3648x5472',
  '0bb02a92b4e27bb940a1ddd8a38a50970bf7fbb1-3648x5472', 'a4e753869092d8b14c4edbdb7f032a62b5282fc6-3648x5472', 'a3c21d26ce1bb909ad2c2701bdf43ade01f41486-3648x5472',
  '6420146573082e95a441678fe74c447f549d7b80-3648x5472', '9a10bb1c80b05e52b65b2d0834d8bd177b885340-3648x5472', 'ae593cd866be7fe4bf48495cc364d96df4abc65f-3648x5472', '664cf8d90f2eea5cc8e82db8c0504114e27ba6cd-3648x5472'
];
performers.push(...loupeArtists.map(([title, id, status], index) => ({ title, meta: 'Loupe Színházi Társulás · ' + status, url: id ? 'https://loupe.hu/alkotok/' + id : 'https://loupe.hu/rolunk', image: 'https://cdn.sanity.io/images/dkxb6lca/production/' + loupePortraits[index] + '.jpg?auto=format&fit=max&w=800', imageAlt: title + ' portréja', imageSource: id ? 'https://loupe.hu/alkotok/' + id : 'https://loupe.hu/rolunk', imageSourceName: 'Loupe Színházi Társulás' })));
const loupeProductions = [
  ['loupe-arvak', 'Árvák', 'Dennis Kelly', 'arvak', ['Lovas Rozi', 'Lengyel Tamás', 'Molnár Áron'], 'Egy családi vacsorát váratlan és erőszakos esemény szakít meg; a történet előítéleteket és félelmeket vizsgál.'],
  ['loupe-412', '4:12', 'James Fritz', '4-12', ['Lengyel Tamás', 'Gryllus Dorka', 'Váradi Gergely', 'Trill Beatrix'], 'Egy kamaszról készült videó megrázza családját, és az online világ felelősségéről vet fel kérdéseket.'],
  ['loupe-becsapodas', 'Becsapódás', 'Horváth János Antal', 'becsapodas', ['Földes Eszter', 'Lengyel Tamás', 'Molnár Áron', 'Ullmann Mónika'], 'Egy háborús hír nyomán négy embernek kell döntést hoznia a jövőjéről.'],
  ['loupe-kezdet', 'A kezdet/vége', 'Horváth János Antal', 'a-kezdet-vege', ['Molnár Áron', 'Mohai Tamás', 'Földes Eszter'], 'Cirkuszi elemekkel átszőtt vígjáték egy párkapcsolat döntéseiről és felelősségéről.'],
  ['loupe-titkosszolgak', 'Titkosszolgák', 'Vinnai András', 'titkosszolgak', ['Lovas Rozi', 'Molnár Áron', 'Mohai Tamás', 'Rainer-Micsinyei Nóra', 'Rusznák András'], 'Egy újságíró egy titkosszolgálati irodában próbálja kideríteni, mi történt egy ablakból kizuhant pedagógussal. Az abszurd zenés tragikomédia társadalmi szatíra.'],
  ['loupe-lanyok', 'Lányok, fiúk', 'Dennis Kelly', 'lanyok-fiuk', ['Lovas Rozi'], 'Egyszemélyes előadás egy kapcsolat és egy család történetéről.'],
  ['loupe-barmi', 'Bármi lehetséges, ha elég erősen gondolsz rá', 'Cordelia O’Neill', 'barmi-lehetseges-ha-eleg-erosen-gondolsz-ra', ['Rusznák András', 'Trill Beatrix'], 'Két ember kapcsolatának története egy súlyos megpróbáltatás idején.'],
  ['loupe-tul-eles', 'Túl éles', 'Nathan Ellis', 'tul-eles', ['Sztarenki Dóra', 'Földes Eszter', 'Gryllus Dorka', 'Takács Katalin', 'Brezovszky Dániel'], 'Egy fiatal orvos és kollégái történetén keresztül az egészségügyi munka terheit és az emberi kapcsolatok megtartó erejét vizsgálja.'],
  ['loupe-emberek', 'Emberek, helyek és dolgok', 'Duncan MacMillan', 'emberek-helyek', ['Lovas Rozi', 'Mohai Tamás', 'Znamenák István', 'Sztarenki Dóra', 'Brezovszky Dániel'], 'Egy színésznő függőséggel és önazonossággal küzd a rehabilitáció során.'],
  ['loupe-nem-gyerekek', 'Nem vagyunk már gyerekek', 'Kenneth Lonergan', 'nem-vagyunk-mar', ['Váradi Gergely', 'Samudovszky Adrián', 'Trill Beatrix'], 'Három fiatal keresi a helyét a felnőtté válás küszöbén.'],
  ['loupe-ejjel', 'Az éjjel soha nem érhet véget', 'Horváth János Antal és Csicskár Dávid', 'az-ejjel-soha-nem-erhet-veget', ['Bánki Gergely', 'Samudovszky Adrián', 'Stefanovics Angéla', 'Znamenák István', 'Trill Beatrix'], 'Egy falusi futballtehetség sikere a családja számára a kitörés reményét jelenti.'],
  ['loupe-wass', 'Wass János', 'Fábián Péter', 'wass-janos', ['Trill Beatrix', 'Lengyel Tamás', 'Mohai Tamás', 'Rainer-Micsinyei Nóra', 'Váradi Gergely'], 'Történelmi alakoskodás és játék a történelmi emlékezettel.'],
  ['loupe-utolso', 'Az utolsó menet', 'Anthony Neilson', 'az-utolso-menet', ['Rusznák András', 'Földes Eszter'], 'Két ember története kapcsolatról, intimitásról és egymás elvesztésének félelméről.'],
  ['loupe-ellen', 'Az Ellen Babić-ügy', 'Marius von Mayenburg', 'e-babics', ['Sztarenki Dóra'], 'Egy tanár, volt diákja és egy iskolaigazgató találkozásán keresztül vizsgálja a bizalom és a hatalom kérdéseit.']
].map(([id, title, author, path, cast, description]) => ({ id, title, author, cast, description, kind: 'színházi előadás', venue: 'Loupe Színházi Társulás', url: 'https://loupe.hu/repertoar/' + path }));
const loupeImages = {
  'loupe-arvak': 'f416bde8006de0cedc0f552918f3560f52ac5775-6494x4093.jpg',
  'loupe-412': '2b7396b032d3dfd1c90e721c51388e45ab055d37-3128x2085.jpg',
  'loupe-becsapodas': '0b05bfc23944a535ea13547209152d53fd3bbcd3-4905x3270.jpg',
  'loupe-kezdet': '5a09a155cf4eeb6d40c04accec33fb47b3c19f78-4874x3249.jpg',
  'loupe-titkosszolgak': '3f98cf6e7854a280e2b91f1c8b32255b578d8f5b-2992x1995.jpg',
  'loupe-lanyok': '497f9ff7bf4fd7a91fb2921cadd6e953a2257b55-5867x3911.jpg',
  'loupe-barmi': 'c4c6f046c9fd68fb867e1bbe7d8c2c0fe477e5ba-2100x1400.jpg',
  'loupe-tul-eles': '6d1c658681a3c287055365dbac48de58e263219d-4019x2679.jpg',
  'loupe-emberek': '373ecd92ab37a3bafe7b6534ff75a08f8fa42d42-1942x809.png',
  'loupe-nem-gyerekek': 'e0fc43b37e6d3147fb87b6d5d9e4fd039d95e5f2-2048x1365.jpg',
  'loupe-ejjel': '42858b03dab005dd707f2bda30dfa53b73367989-3575x2383.jpg',
  'loupe-wass': '76adac8cf7e1ec4f5052a2add925eeb12ba75a32-1032x1104.png',
  'loupe-utolso': '32d641b12103ae35224c7c42f53ff69b66c2f151-6934x4623.jpg',
  'loupe-ellen': 'a55626e44fe67deea73b9fa19057ed893d7a2b1e-3000x2000.png'
};
for (const production of loupeProductions) {
  production.image = 'https://cdn.sanity.io/images/dkxb6lca/production/' + loupeImages[production.id] + '?auto=format&fit=max&w=1200';
}
productions.push(...loupeProductions);

const slug = text => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function detailUrl(type, id) {
  return 'adatlap.html?tipus=' + type + '&id=' + encodeURIComponent(id);
}

const theatreRecords = venues.filter(entry => entry.title !== 'Pesti Színház').map(entry =>
  entry.title.endsWith(' · Kamra') ? { ...entry, title: 'Katona József Színház', meta: '1052 Budapest, Petőfi Sándor utca 6.',
    image: 'https://gotourist.hu/uploader/800px-katona-jozsef-szinhaz-portal-2009-35398-normal.jpg', imageAlt: 'A Katona József Színház bejárata', imageSource: 'https://gotourist.hu/hu/locations/katona-jozsef-szinhaz', imageSourceName: 'GoTourist' } : entry
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
workRecords.push(...loupeProductions.map(({ id, title, author, kind, url, image }) => ({ id, title, author, kind, image, meta: author || 'Loupe Színházi Társulás', url, detail: detailUrl('mu', id) })));

const theatreForVenue = title => theatreRecords.find(entry =>
  entry.title === title ||
  (title === 'Pesti Színház' && entry.title === 'Vígszínház') ||
  (title?.startsWith('Katona József Színház · ') && entry.title === 'Katona József Színház')
);

const publicVenueRecords = venues.map(entry => {
  const theatre = theatreRecords.find(theatre => theatre.title === entry.title);
  return theatre ? { ...entry, detail: theatre.detail } : entry;
});

// A prototípus pontszámai címhez kötött, jelölt mintaadatok.
function sampleRating(entry) {
  let hash = 0;
  for (const char of entry.id || entry.title) hash = (hash * 31 + char.codePointAt(0)) >>> 0;
  return (7.5 + (hash % 21) / 10).toFixed(1).replace('.', ',');
}
function workRatings(entry) {
  try {
    const current = localStorage.getItem('tapspont-work-ratings-v2:' + entry.id);
    const saved = JSON.parse(current || localStorage.getItem('tapspont-work-ratings:' + entry.id) || '{}');
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return {};
    return Object.fromEntries(Object.entries(saved).filter(([, n]) => Number.isInteger(n) && n >= 1 && n <= (current ? 5 : 10)).map(([name, n]) => [name, current ? n : Math.ceil(n / 2)]));
  } catch { return {}; }
}
function workRating(entry) {
  const votes = Object.values(workRatings(entry));
  if (votes.length) return { value: (votes.reduce((a, b) => a + b, 0) / votes.length).toFixed(1).replace('.', ','), sample: false };
  return { value: (Number(sampleRating(entry).replace(',', '.')) / 2).toFixed(1).replace('.', ','), sample: true };
}

