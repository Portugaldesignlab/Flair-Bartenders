import { useState, useRef, useEffect, useCallback } from "react";

const TRANSLATIONS = {
  pt: {
    title: "FLAIR BARTENDING",
    subtitle: "A Arte de Misturar o Mundo",
    timeline: "LINHA DO TEMPO",
    associations: "ASSOCIAÇÕES MUNDIAIS",
    recipe: "Receita",
    ingredients: "Ingredientes",
    method: "Método",
    glass: "Taça",
    origin: "Origem",
    inventor: "Inventor",
    city: "Cidade",
    country: "País",
    bartender: "Bartender",
    era: "Era",
    description: "Descrição",
    modern: "Versão Moderna",
    close: "Fechar",
    explore: "Explorar Receita",
    scroll: "← Arraste para explorar a história →",
    langLabel: "Idioma",
    era_labels: {
      "colonial": "Era Colonial",
      "prohibition": "Proibição",
      "golden": "Era Dourada",
      "modern": "Era Moderna",
      "contemporary": "Contemporâneo"
    }
  },
  en: {
    title: "FLAIR BARTENDING",
    subtitle: "The Art of Mixing the World",
    timeline: "TIMELINE",
    associations: "WORLD ASSOCIATIONS",
    recipe: "Recipe",
    ingredients: "Ingredients",
    method: "Method",
    glass: "Glass",
    origin: "Origin",
    inventor: "Inventor",
    city: "City",
    country: "Country",
    bartender: "Bartender",
    era: "Era",
    description: "Description",
    modern: "Modern Take",
    close: "Close",
    explore: "Explore Recipe",
    scroll: "← Drag to explore history →",
    langLabel: "Language",
    era_labels: {
      "colonial": "Colonial Era",
      "prohibition": "Prohibition",
      "golden": "Golden Age",
      "modern": "Modern Era",
      "contemporary": "Contemporary"
    }
  },
  ms: {
    title: "FLAIR BARTENDING",
    subtitle: "Seni Mencampur Dunia",
    timeline: "GARIS MASA",
    associations: "PERSATUAN DUNIA",
    recipe: "Resipi",
    ingredients: "Bahan-Bahan",
    method: "Kaedah",
    glass: "Gelas",
    origin: "Asal-Usul",
    inventor: "Pencipta",
    city: "Bandar",
    country: "Negara",
    bartender: "Bartender",
    era: "Era",
    description: "Penerangan",
    modern: "Versi Moden",
    close: "Tutup",
    explore: "Jelajahi Resipi",
    scroll: "← Seret untuk meneroka sejarah →",
    langLabel: "Bahasa",
    era_labels: {
      "colonial": "Era Kolonial",
      "prohibition": "Era Larangan",
      "golden": "Zaman Keemasan",
      "modern": "Era Moden",
      "contemporary": "Kontemporari"
    }
  }
};

const COCKTAILS = [
  {
    id: 1,
    year: 1806,
    name: { pt: "Old Fashioned", en: "Old Fashioned", ms: "Old Fashioned" },
    era: "colonial",
    country: { pt: "Estados Unidos", en: "United States", ms: "Amerika Syarikat" },
    city: { pt: "Nova York", en: "New York", ms: "New York" },
    flag: "🇺🇸",
    inventor: "Jerry Thomas",
    bartender: "Jerry Thomas — \"O Professor\"",
    color: "#C8860A",
    accent: "#FFD700",
    description: {
      pt: "O pai de todos os coquetéis modernos. O Old Fashioned foi a primeira bebida chamada oficialmente de 'cocktail' em 1806, publicada no jornal The Balance. Jerry Thomas, o lendário bartender americano, o popularizou em seu icônico livro 'How to Mix Drinks' de 1862. Simples, elegante e atemporal — o próprio DNA do flair bartending.",
      en: "The father of all modern cocktails. The Old Fashioned was the first drink officially called a 'cocktail' in 1806, published in The Balance newspaper. Jerry Thomas, the legendary American bartender, popularized it in his iconic 1862 book 'How to Mix Drinks'. Simple, elegant, and timeless — the very DNA of flair bartending.",
      ms: "Bapa kepada semua koktail moden. Old Fashioned adalah minuman pertama yang secara rasmi dipanggil 'koktail' pada tahun 1806, diterbitkan dalam akhbar The Balance. Jerry Thomas, bartender Amerika yang legenda, mempopularkannya dalam buku ikoniknya tahun 1862 'How to Mix Drinks'. Mudah, elegan, dan abadi."
    },
    recipe: {
      pt: { glass: "Copo Old Fashioned (Rocks)", ingredients: ["60ml Bourbon ou Rye Whiskey", "1 cubo de açúcar", "2-3 dashs de Angostura Bitters", "Raspa de laranja e cereja para decorar", "1 pedra grande de gelo"], method: "Coloque o cubo de açúcar no copo, adicione os bitters e um splash de água. Macere levemente. Adicione gelo grande, despeje o whiskey. Mexa delicadamente por 30 segundos. Decore com raspa de laranja flambada e cereja luxardo." },
      en: { glass: "Rocks Glass (Old Fashioned)", ingredients: ["60ml Bourbon or Rye Whiskey", "1 sugar cube", "2-3 dashes Angostura Bitters", "Orange peel and cherry for garnish", "1 large ice cube"], method: "Place sugar cube in glass, add bitters and a splash of water. Muddle gently. Add large ice cube, pour whiskey. Stir gently for 30 seconds. Garnish with flamed orange peel and luxardo cherry." },
      ms: { glass: "Gelas Rocks (Old Fashioned)", ingredients: ["60ml Bourbon atau Rye Whiskey", "1 kiub gula", "2-3 titisan Angostura Bitters", "Kulit oren dan ceri untuk hiasan", "1 kiub ais besar"], method: "Letakkan kiub gula dalam gelas, tambah bitters dan sedikit air. Tumbuk perlahan. Tambah ais besar, tuang whiskey. Kacau perlahan selama 30 saat. Hiaskan dengan kulit oren yang dibakar dan ceri luxardo." }
    },
    modern: {
      pt: "Versão contemporânea usa infusões de bourbon defumado, xarope de mel com cardamomo e guarnição de casca de laranja caramelizada. Bartenders de flair executam o 'tin-to-tin' com a rolha de gelo acesa.",
      en: "Contemporary version uses smoked bourbon infusions, cardamom honey syrup and caramelized orange peel garnish. Flair bartenders execute the 'tin-to-tin' with flaming ice roll.",
      ms: "Versi kontemporari menggunakan infusi bourbon berasap, sirap madu kardamom dan hiasan kulit oren karamel. Bartender flair melaksanakan 'tin-to-tin' dengan gulungan ais berapi."
    }
  },
  {
    id: 2,
    year: 1862,
    name: { pt: "Tom Collins", en: "Tom Collins", ms: "Tom Collins" },
    era: "colonial",
    country: { pt: "Inglaterra", en: "England", ms: "England" },
    city: { pt: "Londres", en: "London", ms: "London" },
    flag: "🇬🇧",
    inventor: "Jerry Thomas",
    bartender: "Jerry Thomas / John Collins",
    color: "#4A9D6F",
    accent: "#7FFFD4",
    description: {
      pt: "Criado na efervescente cena de bares londrinos, o Tom Collins é um clássico refrescante que começou como o 'John Collins' em homenagem ao maitre John Collins do Limmer's Hotel em Londres. Jerry Thomas documentou a receita em 1876. A bebida tornou-se fenômeno cultural em 1874, quando o 'Great Tom Collins Hoax' varou os Estados Unidos.",
      en: "Created in the effervescent London bar scene, the Tom Collins is a refreshing classic that began as the 'John Collins' honoring maitre John Collins of Limmer's Hotel in London. Jerry Thomas documented the recipe in 1876. The drink became a cultural phenomenon in 1874 during the 'Great Tom Collins Hoax' across the United States.",
      ms: "Dicipta dalam adegan bar London yang berbuih, Tom Collins adalah klasik yang menyegarkan yang bermula sebagai 'John Collins' sempena penghormatan kepada maitre John Collins dari Hotel Limmer di London. Jerry Thomas mendokumentasikan resipi pada tahun 1876."
    },
    recipe: {
      pt: { glass: "Copo Collins (Highball)", ingredients: ["60ml Gin London Dry", "30ml Suco de Limão Siciliano", "15ml Xarope Simples", "Água com Gás", "Rodela de Limão e Cereja"], method: "Misture gin, suco de limão e xarope em copo Collins com gelo. Complete com água com gás. Mexa suavemente. Decore com rodela de limão e cereja marrasquino. Sirva com canudo de bambu." },
      en: { glass: "Collins Glass (Highball)", ingredients: ["60ml London Dry Gin", "30ml Fresh Lemon Juice", "15ml Simple Syrup", "Club Soda", "Lemon slice and Cherry"], method: "Build gin, lemon juice and syrup in Collins glass over ice. Top with club soda. Stir gently. Garnish with lemon slice and maraschino cherry. Serve with bamboo straw." },
      ms: { glass: "Gelas Collins (Highball)", ingredients: ["60ml Gin London Dry", "30ml Jus Lemon Segar", "15ml Sirap Mudah", "Soda Kelab", "Hirisan lemon dan Ceri"], method: "Bina gin, jus lemon dan sirap dalam gelas Collins dengan ais. Tambah soda kelab. Kacau perlahan. Hiaskan dengan hirisan lemon dan ceri marrasquino." }
    },
    modern: {
      pt: "Modernizado com gin artesanal brasileiro, citrus shrub fermentado, e espuma de limão molecular. Apresentação com flor comestível e gelo esculpido.",
      en: "Modernized with Brazilian artisan gin, fermented citrus shrub, and molecular lemon foam. Presentation with edible flower and sculpted ice.",
      ms: "Dimodernkan dengan gin artisan Brazil, shrub sitrus fermentasi, dan buih lemon molekular. Persembahan dengan bunga boleh dimakan dan ais diukir."
    }
  },
  {
    id: 3,
    year: 1898,
    name: { pt: "Daiquiri", en: "Daiquiri", ms: "Daiquiri" },
    era: "colonial",
    country: { pt: "Cuba", en: "Cuba", ms: "Cuba" },
    city: { pt: "Santiago de Cuba", en: "Santiago de Cuba", ms: "Santiago de Cuba" },
    flag: "🇨🇺",
    inventor: "Jennings Cox",
    bartender: "Jennings Cox / Constantino Ribalaigua",
    color: "#E8C547",
    accent: "#FFF176",
    description: {
      pt: "Nascido nas minas de ferro de Daiquirí, Cuba, o engenheiro americano Jennings Cox criou esta bebida por acidente em 1898 quando faltou gin. Constantino 'Constante' Ribalaigua do famoso El Floridita em Havana o transformou em arte, sendo o favorito de Ernest Hemingway que o chamava de 'meu daiquiri duplo sem açúcar'.",
      en: "Born in the iron mines of Daiquirí, Cuba, American engineer Jennings Cox created this drink by accident in 1898 when gin ran out. Constantino 'Constante' Ribalaigua of the famous El Floridita in Havana transformed it into art, being Ernest Hemingway's favorite who called it 'my double daiquiri without sugar'.",
      ms: "Lahir di lombong besi Daiquirí, Cuba, jurutera Amerika Jennings Cox mencipta minuman ini secara tidak sengaja pada tahun 1898 apabila gin kehabisan. Constantino 'Constante' Ribalaigua dari El Floridita yang terkenal di Havana mengubahnya menjadi seni."
    },
    recipe: {
      pt: { glass: "Taça de Coquetel (Coupé)", ingredients: ["60ml Rum Branco Cubano", "30ml Suco de Limão Taiti Fresco", "15ml Xarope Simples de Cana", "Casca de Lima para decorar"], method: "Todos os ingredientes no shaker com gelo. Agite vigorosamente por 15 segundos até gelado. Faça duplo coador na taça coupé gelada. Decore com casca de lima torcida. Perfeito frio entre -3°C a -5°C." },
      en: { glass: "Cocktail Coupe Glass", ingredients: ["60ml Cuban White Rum", "30ml Fresh Lime Juice", "15ml Cane Simple Syrup", "Lime peel for garnish"], method: "All ingredients in shaker with ice. Shake vigorously for 15 seconds until chilled. Double strain into chilled coupe glass. Garnish with twisted lime peel. Perfect temperature -3°C to -5°C." },
      ms: { glass: "Gelas Koktail Coupe", ingredients: ["60ml Rum Putih Cuba", "30ml Jus Limau Segar", "15ml Sirap Tebu Mudah", "Kulit limau untuk hiasan"], method: "Semua bahan dalam shaker dengan ais. Goncang kuat selama 15 saat hingga sejuk. Tapis berganda ke dalam gelas coupe sejuk. Hiaskan dengan kulit limau dipintal." }
    },
    modern: {
      pt: "Daiquiri de banana flambada com rum envelhecido 12 anos, mel de acácia e espuma de lima. Técnica de flair: flip e spin do shaker Boston.",
      en: "Flambéed banana daiquiri with 12-year aged rum, acacia honey and lime foam. Flair technique: Boston shaker flip and spin.",
      ms: "Daiquiri pisang dibakar dengan rum berumur 12 tahun, madu akasia dan buih limau. Teknik flair: flip dan spin shaker Boston."
    }
  },
  {
    id: 4,
    year: 1915,
    name: { pt: "Singapore Sling", en: "Singapore Sling", ms: "Singapore Sling" },
    era: "prohibition",
    country: { pt: "Singapura", en: "Singapore", ms: "Singapura" },
    city: { pt: "Singapura", en: "Singapore", ms: "Singapura" },
    flag: "🇸🇬",
    inventor: "Ngiam Tong Boon",
    bartender: "Ngiam Tong Boon",
    color: "#E8507A",
    accent: "#FF8FAB",
    description: {
      pt: "Uma das bebidas mais famosas do Sudeste Asiático, criada por Ngiam Tong Boon no lendário Long Bar do Raffles Hotel em Singapura por volta de 1915. A bebida foi revolucionária pois era socialmente aceitável para mulheres beberem em público — a cor rosa a tornava parecer um suco de fruta. Rudyard Kipling e Somerset Maugham eram frequentadores assíduos.",
      en: "One of Southeast Asia's most famous drinks, created by Ngiam Tong Boon at the legendary Long Bar of Raffles Hotel in Singapore around 1915. The drink was revolutionary as it was socially acceptable for women to drink in public — the pink color made it appear to be fruit juice. Rudyard Kipling and Somerset Maugham were regular patrons.",
      ms: "Salah satu minuman paling terkenal di Asia Tenggara, dicipta oleh Ngiam Tong Boon di Long Bar yang legenda di Hotel Raffles, Singapura sekitar tahun 1915. Minuman ini revolusioner kerana ia boleh diterima secara sosial bagi wanita minum di khalayak ramai."
    },
    recipe: {
      pt: { glass: "Copo Hurricane ou Highball", ingredients: ["30ml Gin", "15ml Cherry Heering", "7.5ml Dom Bénédictine", "7.5ml Triple Sec", "120ml Suco de Abacaxi", "15ml Suco de Limão", "10ml Suco de Limão Taiti", "1 dash Angostura Bitters", "1 dash Orange Bitters", "Cereja e Abacaxi para decorar"], method: "Agite todos os ingredientes com gelo. Despeje em copo Hurricane com gelo. Decore com cereja, abacaxi e guarda-chuva colorido. O flair clássico inclui malabarismo com 3 garrafas." },
      en: { glass: "Hurricane or Highball Glass", ingredients: ["30ml Gin", "15ml Cherry Heering", "7.5ml Dom Bénédictine", "7.5ml Triple Sec", "120ml Pineapple Juice", "15ml Lemon Juice", "10ml Lime Juice", "1 dash Angostura Bitters", "1 dash Orange Bitters", "Cherry and Pineapple for garnish"], method: "Shake all ingredients with ice. Pour into Hurricane glass with ice. Garnish with cherry, pineapple and colorful umbrella. Classic flair includes 3-bottle juggling." },
      ms: { glass: "Gelas Hurricane atau Highball", ingredients: ["30ml Gin", "15ml Cherry Heering", "7.5ml Dom Bénédictine", "7.5ml Triple Sec", "120ml Jus Nenas", "15ml Jus Lemon", "10ml Jus Limau", "1 titisan Angostura Bitters", "1 titisan Orange Bitters", "Ceri dan Nenas untuk hiasan"], method: "Goncang semua bahan dengan ais. Tuang ke dalam gelas Hurricane dengan ais. Hiaskan dengan ceri, nenas dan payung warna-warni." }
    },
    modern: {
      pt: "Versão moderna com gin Hendrick's, shrub de caju asiático, espuma de coco e cereja Luxardo. Apresentado em coco fresco esculpido com dry ice.",
      en: "Modern version with Hendrick's gin, Asian cashew shrub, coconut foam and Luxardo cherry. Served in sculpted fresh coconut with dry ice.",
      ms: "Versi moden dengan gin Hendrick's, shrub gajus Asia, buih kelapa dan ceri Luxardo. Disajikan dalam kelapa segar diukir dengan ais kering."
    }
  },
  {
    id: 5,
    year: 1919,
    name: { pt: "Negroni", en: "Negroni", ms: "Negroni" },
    era: "prohibition",
    country: { pt: "Itália", en: "Italy", ms: "Itali" },
    city: { pt: "Florença", en: "Florence", ms: "Florence" },
    flag: "🇮🇹",
    inventor: "Conde Camillo Negroni",
    bartender: "Fosco Scarselli — Caffè Casoni",
    color: "#C0392B",
    accent: "#E74C3C",
    description: {
      pt: "Nascido no Caffè Casoni em Florença, quando o excêntrico Conde Camillo Negroni pediu ao bartender Fosco Scarselli para fortalecer seu Americano substituindo o sifão por gin. A bebida nasceu da audácia italiana e tornou-se símbolo da aperitivo culture europeia. O Negroni Sbagliato, criado por Mirko Stocchetto em 1972, é a variação mais famosa.",
      en: "Born at Caffè Casoni in Florence, when the eccentric Count Camillo Negroni asked bartender Fosco Scarselli to strengthen his Americano by replacing soda water with gin. The drink was born from Italian audacity and became a symbol of European aperitivo culture. The Negroni Sbagliato, created by Mirko Stocchetto in 1972, is the most famous variation.",
      ms: "Lahir di Caffè Casoni di Florence, ketika Count Camillo Negroni yang eksentrik meminta bartender Fosco Scarselli menguatkan Americano-nya dengan menggantikan air soda dengan gin. Minuman ini lahir dari keberanian Itali dan menjadi simbol budaya aperitivo Eropah."
    },
    recipe: {
      pt: { glass: "Copo Rocks com cubo de gelo gigante", ingredients: ["30ml Gin London Dry", "30ml Campari", "30ml Martini Rosso (Vermute Doce)", "Raspa de Laranja para decorar"], method: "Combine todos os ingredientes no copo com gelo grande. Mexa por 30 rotações no sentido horário. Finalize com raspa larga de laranja flambada. O segredo está no equilíbrio 1:1:1 perfeito. Flair: girar o copo na mão enquanto mexe." },
      en: { glass: "Rocks Glass with large ice cube", ingredients: ["30ml London Dry Gin", "30ml Campari", "30ml Martini Rosso (Sweet Vermouth)", "Orange peel for garnish"], method: "Combine all ingredients in glass with large ice. Stir for 30 rotations clockwise. Finish with wide flamed orange peel. The secret is the perfect 1:1:1 balance. Flair: spin the glass in hand while stirring." },
      ms: { glass: "Gelas Rocks dengan kiub ais besar", ingredients: ["30ml Gin London Dry", "30ml Campari", "30ml Martini Rosso (Vermouth Manis)", "Kulit oren untuk hiasan"], method: "Gabungkan semua bahan dalam gelas dengan ais besar. Kacau 30 pusingan mengikut arah jam. Akhiri dengan kulit oren lebar yang dibakar. Rahsianya ialah keseimbangan 1:1:1 yang sempurna." }
    },
    modern: {
      pt: "Negroni envelhecido em barril de carvalho por 30 dias com Campari artesanal. Técnica de flair: malabarismo com três garrafas iguais e despejo simultâneo.",
      en: "Oak barrel-aged Negroni for 30 days with artisanal Campari. Flair technique: three identical bottle juggling with simultaneous pour.",
      ms: "Negroni berumur tong oak selama 30 hari dengan Campari artisanal. Teknik flair: jongling tiga botol yang sama dengan tuangan serentak."
    }
  },
  {
    id: 6,
    year: 1920,
    name: { pt: "Sidecar", en: "Sidecar", ms: "Sidecar" },
    era: "prohibition",
    country: { pt: "França", en: "France", ms: "Perancis" },
    city: { pt: "Paris", en: "Paris", ms: "Paris" },
    flag: "🇫🇷",
    inventor: "Harry MacElhone",
    bartender: "Harry MacElhone — Harry's New York Bar",
    color: "#D4AC0D",
    accent: "#F7DC6F",
    description: {
      pt: "Criado durante o glamoroso período entre guerras no icônico Harry's New York Bar em Paris, por Harry MacElhone. A lenda diz que um capitão americano chegou ao bar de moto-sidecar durante a Primeira Guerra Mundial e pediu um drinque quente. A borda de açúcar crocante é sua assinatura inconfundível. Esta bebida representa a elegância parisiense e o espírito cosmopolita da Belle Époque.",
      en: "Created during the glamorous interwar period at the iconic Harry's New York Bar in Paris, by Harry MacElhone. Legend says an American captain arrived at the bar by motorbike sidecar during WWI and ordered a warming drink. The crunchy sugar rim is its unmistakable signature. This drink represents Parisian elegance and the cosmopolitan spirit of the Belle Époque.",
      ms: "Dicipta semasa tempoh antara perang yang glamor di Harry's New York Bar yang ikonik di Paris, oleh Harry MacElhone. Legenda mengatakan seorang kapten Amerika tiba di bar dengan motosikal sidecar semasa Perang Dunia I dan memesan minuman yang menghangatkan."
    },
    recipe: {
      pt: { glass: "Taça de Coquetel com borda de açúcar", ingredients: ["50ml Cognac VSOP", "20ml Cointreau ou Triple Sec", "20ml Suco de Limão Siciliano Fresco", "Açúcar para a borda", "Raspa de Limão Siciliano"], method: "Borde a taça com suco de limão e açúcar. Agite todos os ingredientes com gelo por 12 segundos enérgicos. Coe duplo na taça gelada. Finalize com raspa de limão em espiral. O cognac deve ser de qualidade superior." },
      en: { glass: "Cocktail glass with sugared rim", ingredients: ["50ml VSOP Cognac", "20ml Cointreau or Triple Sec", "20ml Fresh Lemon Juice", "Sugar for the rim", "Lemon peel"], method: "Rim glass with lemon juice and sugar. Shake all ingredients vigorously with ice for 12 seconds. Double strain into chilled glass. Finish with lemon peel spiral. The cognac must be of superior quality." },
      ms: { glass: "Gelas koktail dengan rim bergula", ingredients: ["50ml Cognac VSOP", "20ml Cointreau atau Triple Sec", "20ml Jus Lemon Segar", "Gula untuk rim", "Kulit lemon"], method: "Pinggirkan gelas dengan jus lemon dan gula. Goncang semua bahan dengan kuat dengan ais selama 12 saat. Tapis berganda ke dalam gelas sejuk. Akhiri dengan spiral kulit lemon." }
    },
    modern: {
      pt: "Sidecar com Armagnac vintage 1990, limão Amalfi desidratado e espuma de baunilha bourbon. Flair: malabarismo duplo com acrobacia do shaker entre as costas.",
      en: "Sidecar with vintage 1990 Armagnac, dehydrated Amalfi lemon and bourbon vanilla foam. Flair: double juggling with behind-the-back shaker acrobatics.",
      ms: "Sidecar dengan Armagnac vintaj 1990, lemon Amalfi kering dan buih vanila bourbon. Flair: jongling berganda dengan akrobatik shaker di belakang."
    }
  },
  {
    id: 7,
    year: 1942,
    name: { pt: "Caipirinha", en: "Caipirinha", ms: "Caipirinha" },
    era: "golden",
    country: { pt: "Brasil", en: "Brazil", ms: "Brazil" },
    city: { pt: "São Paulo / Interior SP", en: "São Paulo / Interior SP", ms: "São Paulo / Pedalaman SP" },
    flag: "🇧🇷",
    inventor: "Origem Popular Brasileira",
    bartender: "Tradição Caipira — Povo Brasileiro",
    color: "#27AE60",
    accent: "#2ECC71",
    description: {
      pt: "A alma do Brasil em um copo! A Caipirinha tem raízes no século XIX como remédio popular contra gripe com cachaça, limão e mel. Foi oficialmente declarada bebida nacional brasileira em 2003. O nome vem de 'caipira' — habitante do interior rural. Hoje é o coquetel mais internacionalmente reconhecido do Brasil, servido em mais de 100 países. Cada bartender brasileiro tem sua técnica secreta de macerar o limão.",
      en: "The soul of Brazil in a glass! The Caipirinha has roots in the 19th century as a folk remedy for flu with cachaça, lemon and honey. It was officially declared Brazil's national drink in 2003. The name comes from 'caipira' — rural interior dweller. Today it is Brazil's most internationally recognized cocktail, served in over 100 countries. Every Brazilian bartender has their secret lime muddling technique.",
      ms: "Jiwa Brazil dalam segelas! Caipirinha berakar pada abad ke-19 sebagai ubat rakyat untuk selesema dengan cachaça, lemon dan madu. Ia diisytiharkan secara rasmi sebagai minuman kebangsaan Brazil pada tahun 2003. Nama ini berasal dari 'caipira' — penduduk pedalaman luar bandar."
    },
    recipe: {
      pt: { glass: "Copo Old Fashioned (Tumbler)", ingredients: ["60ml Cachaça Artesanal", "1 Limão Taiti inteiro cortado em 8", "2 colheres de chá de açúcar Demerara", "Gelo triturado abundante"], method: "Corte o limão em 8 pedaços, retire o miolo branco. Coloque no copo com açúcar Demerara. MACERE com força pressionando e girando, liberando os óleos essenciais — nunca exprema demais. Adicione cachaça artesanal de qualidade. Cubra com gelo triturado. Mexa energicamente. Sirva imediatamente." },
      en: { glass: "Old Fashioned Glass (Tumbler)", ingredients: ["60ml Artisanal Cachaça", "1 whole lime cut into 8", "2 teaspoons Demerara sugar", "Abundant crushed ice"], method: "Cut lime into 8 pieces, remove white pith. Place in glass with Demerara sugar. MUDDLE forcefully pressing and rotating, releasing essential oils — never over-squeeze. Add quality artisanal cachaça. Cover with crushed ice. Stir energetically. Serve immediately." },
      ms: { glass: "Gelas Old Fashioned (Tumbler)", ingredients: ["60ml Cachaça Artisanal", "1 limau penuh dipotong 8", "2 sudu teh gula Demerara", "Ais hancur yang banyak"], method: "Potong limau kepada 8 bahagian, buang empulur putih. Letakkan dalam gelas dengan gula Demerara. TUMBUK dengan kuat sambil menekan dan memutar, melepaskan minyak pati — jangan peras berlebihan. Tambah cachaça artisanal berkualiti. Tutup dengan ais hancur." }
    },
    modern: {
      pt: "Caipirinha de Pitaya com cachaça envelhecida em carvalho americano, açúcar de coco e limão caviar. Flair brasileiro: técnica do copo invertido com gelo em cascata.",
      en: "Dragon fruit Caipirinha with American oak-aged cachaça, coconut sugar and finger lime. Brazilian flair: inverted glass technique with cascading ice.",
      ms: "Caipirinha buah naga dengan cachaça berumur oak Amerika, gula kelapa dan jari limau. Flair Brazil: teknik gelas terbalik dengan ais beruntun."
    }
  },
  {
    id: 8,
    year: 1945,
    name: { pt: "Mojito", en: "Mojito", ms: "Mojito" },
    era: "golden",
    country: { pt: "Cuba", en: "Cuba", ms: "Cuba" },
    city: { pt: "Havana", en: "Havana", ms: "Havana" },
    flag: "🇨🇺",
    inventor: "Tradição Africana Cubana",
    bartender: "Angel Martinez — La Bodeguita del Medio",
    color: "#1ABC9C",
    accent: "#A8D8A8",
    description: {
      pt: "O Mojito tem raízes no século XVI com a bebida africana 'El Draque', criada por escravos africanos em Cuba usando aguardente, hortelã, lima e água. Sua versão moderna foi popularizada na lendária La Bodeguita del Medio em Havana, onde Ernest Hemingway gravou sua frase imortal: 'Meu mojito en La Bodeguita, meu daiquiri en El Floridita'. O Mojito é a essência da alma cubana — alegre, vibrante e irresistível.",
      en: "The Mojito has roots in the 16th century with the African drink 'El Draque', created by African slaves in Cuba using spirits, mint, lime and water. Its modern version was popularized at the legendary La Bodeguita del Medio in Havana, where Ernest Hemingway inscribed his immortal phrase: 'My mojito in La Bodeguita, my daiquiri in El Floridita'. The Mojito is the essence of the Cuban soul — joyful, vibrant and irresistible.",
      ms: "Mojito berakar pada abad ke-16 dengan minuman Afrika 'El Draque', dicipta oleh hamba Afrika di Cuba menggunakan arak, pudina, limau dan air. Versi modernnya dipopularkan di La Bodeguita del Medio yang legenda di Havana."
    },
    recipe: {
      pt: { glass: "Copo Collins ou Highball", ingredients: ["60ml Rum Branco Cubano (Havana Club 3 anos)", "30ml Suco de Limão Taiti Fresco", "2 colheres de chá de açúcar de cana", "8-10 folhas de hortelã fresca", "Água com gás Premium", "Gelo triturado"], method: "Coloque hortelã e açúcar no copo. PALMEAR levemente — nunca esmague — para liberar aromas. Adicione suco de limão. Encha com gelo triturado. Despeje rum. Complete com água com gás. Mexa suavemente de baixo para cima. Decore com ramo de hortelã fresca." },
      en: { glass: "Collins or Highball Glass", ingredients: ["60ml Cuban White Rum (Havana Club 3yr)", "30ml Fresh Lime Juice", "2 teaspoons cane sugar", "8-10 fresh mint leaves", "Premium sparkling water", "Crushed ice"], method: "Place mint and sugar in glass. SLAP gently — never crush — to release aromas. Add lime juice. Fill with crushed ice. Pour rum. Top with sparkling water. Stir gently from bottom to top. Garnish with fresh mint sprig." },
      ms: { glass: "Gelas Collins atau Highball", ingredients: ["60ml Rum Putih Cuba (Havana Club 3thn)", "30ml Jus Limau Segar", "2 sudu teh gula tebu", "8-10 helai daun pudina segar", "Air berkilau Premium", "Ais hancur"], method: "Letakkan pudina dan gula dalam gelas. TEPUK perlahan — jangan dihancurkan — untuk melepaskan aroma. Tambah jus limau. Isi dengan ais hancur. Tuang rum. Tambah air berkilau. Kacau perlahan dari bawah ke atas." }
    },
    modern: {
      pt: "Mojito negro com rum envelhecido Zacapa 23, xarope de hortelã defumada, caviar de limão e activated charcoal. Flair: free pour com 4 garrafas simultâneas.",
      en: "Black mojito with Zacapa 23 aged rum, smoked mint syrup, lime caviar and activated charcoal. Flair: free pour with 4 simultaneous bottles.",
      ms: "Mojito hitam dengan rum berumur Zacapa 23, sirap pudina berasap, kaviar limau dan arang aktif. Flair: free pour dengan 4 botol serentak."
    }
  },
  {
    id: 9,
    year: 1953,
    name: { pt: "Pisco Sour", en: "Pisco Sour", ms: "Pisco Sour" },
    era: "golden",
    country: { pt: "Peru", en: "Peru", ms: "Peru" },
    city: { pt: "Lima", en: "Lima", ms: "Lima" },
    flag: "🇵🇪",
    inventor: "Victor Morris",
    bartender: "Victor Morris / Mario Bruiget",
    color: "#F39C12",
    accent: "#FDEBD0",
    description: {
      pt: "O coquetél nacional do Peru, criado pelo emigrante americano Victor Morris em seu Morris's Bar em Lima por volta de 1920. Mario Bruiget, bartender peruano, adicionou os toques finais: bitters de angostura e a icônica espuma de clara de ovo cru. O Pisco Sour é hoje tema de disputa cultural entre Peru e Chile — ambos reivindicam a origem do pisco. O dia 1º de fevereiro é o Dia Nacional do Pisco Sour no Peru.",
      en: "Peru's national cocktail, created by American emigrant Victor Morris at his Morris's Bar in Lima around 1920. Mario Bruiget, a Peruvian bartender, added the finishing touches: angostura bitters and the iconic raw egg white foam. The Pisco Sour is now a cultural dispute between Peru and Chile — both claim the origin of pisco. February 1st is Peru's National Pisco Sour Day.",
      ms: "Koktail kebangsaan Peru, dicipta oleh emigran Amerika Victor Morris di Morris's Bar-nya di Lima sekitar tahun 1920. Mario Bruiget, bartender Peru, menambahkan sentuhan akhir: bitters angostura dan buih putih telur mentah yang ikonik."
    },
    recipe: {
      pt: { glass: "Taça de Coquetél Sour ou Coupé", ingredients: ["60ml Pisco Quebranta Peruano", "30ml Suco de Limão Taiti Fresco", "15ml Xarope Simples", "1 Clara de Ovo Fresca", "3 gotas de Angostura Bitters"], method: "DRY SHAKE: todos os ingredientes sem gelo por 30 segundos para emulsionar a clara. Adicione gelo e agite vigorosamente por 15 segundos. Coe duplo na taça gelada. A espuma deve ser branca, densa e sustentada. Adicione 3 gotas de bitters em padrão triangular com palito." },
      en: { glass: "Sour Cocktail Glass or Coupe", ingredients: ["60ml Peruvian Quebranta Pisco", "30ml Fresh Lime Juice", "15ml Simple Syrup", "1 Fresh Egg White", "3 drops Angostura Bitters"], method: "DRY SHAKE: all ingredients without ice for 30 seconds to emulsify the egg white. Add ice and shake vigorously for 15 seconds. Double strain into chilled glass. Foam must be white, dense and sustained. Add 3 drops of bitters in triangular pattern with toothpick." },
      ms: { glass: "Gelas Koktail Sour atau Coupe", ingredients: ["60ml Pisco Quebranta Peru", "30ml Jus Limau Segar", "15ml Sirap Mudah", "1 Putih Telur Segar", "3 titisan Angostura Bitters"], method: "DRY SHAKE: semua bahan tanpa ais selama 30 saat untuk emulsikan putih telur. Tambah ais dan goncang kuat selama 15 saat. Tapis berganda ke dalam gelas sejuk. Buih mesti putih, padat dan berterusan." }
    },
    modern: {
      pt: "Pisco Sour com pisco mosto verde, espuma nítrica de maracujá, bitters artesanais de andina e pó de ouro. Flair: tin roll sobre o braço com espinado.",
      en: "Pisco Sour with mosto verde pisco, nitric passion fruit foam, Andean artisan bitters and gold dust. Flair: tin roll over arm with spin.",
      ms: "Pisco Sour dengan pisco mosto verde, buih markisa nitrik, bitters artisan Andean dan debu emas. Flair: tin roll atas lengan dengan pusingan."
    }
  },
  {
    id: 10,
    year: 1972,
    name: { pt: "Long Island Iced Tea", en: "Long Island Iced Tea", ms: "Long Island Iced Tea" },
    era: "modern",
    country: { pt: "Estados Unidos", en: "United States", ms: "Amerika Syarikat" },
    city: { pt: "Long Island, Nova York", en: "Long Island, New York", ms: "Long Island, New York" },
    flag: "🇺🇸",
    inventor: "Robert 'Rosebud' Butt",
    bartender: "Robert 'Rosebud' Butt — Oak Beach Inn",
    color: "#8B5A2B",
    accent: "#D4A76A",
    description: {
      pt: "Criado por Robert 'Rosebud' Butt durante uma competição de coquetel no Oak Beach Inn em Long Island em 1972. A regra era usar Triple Sec e o bartender decidiu combinar CINCO destilados diferentes. Apesar do poderoso teor alcoólico, a adição de cola e suco de limão cria a ilusão visual de um inócuo chá gelado. Tornou-se símbolo da cultura de bartending americano dos anos 70-80 e é o coquetel mais pedido em todo o mundo.",
      en: "Created by Robert 'Rosebud' Butt during a cocktail competition at Oak Beach Inn on Long Island in 1972. The rule was to use Triple Sec and the bartender decided to combine FIVE different spirits. Despite the powerful alcohol content, the addition of cola and lemon juice creates the visual illusion of an innocuous iced tea. It became a symbol of American bartending culture in the 70s-80s and is the world's most ordered cocktail.",
      ms: "Dicipta oleh Robert 'Rosebud' Butt semasa pertandingan koktail di Oak Beach Inn di Long Island pada tahun 1972. Peraturannya adalah menggunakan Triple Sec dan bartender memutuskan untuk menggabungkan LIMA destilat berbeza."
    },
    recipe: {
      pt: { glass: "Copo Collins ou Highball alto", ingredients: ["15ml Vodka", "15ml Rum Branco", "15ml Tequila Blanco", "15ml Gin", "15ml Triple Sec", "30ml Suco de Limão Fresco", "15ml Xarope Simples", "Cola para completar", "Rodela de Limão"], method: "Todos os destilados e suco de limão no shaker com gelo. Agite suavemente (não muito — é uma build drink). Despeje em copo Collins alto com gelo. Complete com cola até coloração de chá. Mexa suavemente. Decore com rodela de limão. O segredo: partes iguais de todos os destilados." },
      en: { glass: "Tall Collins or Highball Glass", ingredients: ["15ml Vodka", "15ml White Rum", "15ml Blanco Tequila", "15ml Gin", "15ml Triple Sec", "30ml Fresh Lemon Juice", "15ml Simple Syrup", "Cola to top", "Lemon slice"], method: "All spirits and lemon juice in shaker with ice. Shake gently (not too much — it's a build drink). Pour into tall Collins glass with ice. Top with cola until tea-colored. Stir gently. Garnish with lemon slice. The secret: equal parts of all spirits." },
      ms: { glass: "Gelas Collins atau Highball Tinggi", ingredients: ["15ml Vodka", "15ml Rum Putih", "15ml Tequila Blanco", "15ml Gin", "15ml Triple Sec", "30ml Jus Lemon Segar", "15ml Sirap Mudah", "Cola untuk tambah", "Hirisan lemon"], method: "Semua arak dan jus lemon dalam shaker dengan ais. Goncang perlahan. Tuang ke dalam gelas Collins tinggi dengan ais. Tambah cola hingga berwarna teh. Kacau perlahan. Hiaskan dengan hirisan lemon." }
    },
    modern: {
      pt: "Versão premium com vodka cristal artesanal, rum agricole, gin japonês Roku, tequila añejo e cola premium. Serviço em copo de cristal com flores comestíveis congeladas no gelo.",
      en: "Premium version with artisan crystal vodka, agricole rum, Japanese Roku gin, añejo tequila and premium cola. Served in crystal glass with edible flowers frozen in ice.",
      ms: "Versi premium dengan vodka kristal artisanal, rum agricole, gin Jepun Roku, tequila añejo dan cola premium. Disajikan dalam gelas kristal dengan bunga boleh dimakan yang dibekukan dalam ais."
    }
  },
  {
    id: 11,
    year: 1987,
    name: { pt: "Cosmopolitan", en: "Cosmopolitan", ms: "Cosmopolitan" },
    era: "modern",
    country: { pt: "Estados Unidos", en: "United States", ms: "Amerika Syarikat" },
    city: { pt: "Nova York / Miami", en: "New York / Miami", ms: "New York / Miami" },
    flag: "🇺🇸",
    inventor: "Toby Cecchini / Cheryl Cook",
    bartender: "Toby Cecchini — Odeon Bar, NYC",
    color: "#C0392B",
    accent: "#FF6B8A",
    description: {
      pt: "O símbolo do glamour novaiorquino dos anos 90! Cheryl Cook criou uma versão inicial em Miami por volta de 1985, mas foi Toby Cecchini no Odeon Bar em Nova York em 1987 quem criou a receita definitiva com vodka citroen, cointreau e cranberry. O Cosmopolitan tornou-se icônico através da série Sex and the City, onde Carrie Bradshaw e suas amigas o bebiam em taças elegantes. Madonna e Madonna não dispensam o Cosmo.",
      en: "The symbol of New York glamour in the 90s! Cheryl Cook created an initial version in Miami around 1985, but it was Toby Cecchini at the Odeon Bar in New York in 1987 who created the definitive recipe with citron vodka, cointreau and cranberry. The Cosmopolitan became iconic through the Sex and the City series, where Carrie Bradshaw and her friends drank it in elegant glasses.",
      ms: "Simbol kemewahan New York pada tahun 90-an! Cheryl Cook mencipta versi awal di Miami sekitar tahun 1985, tetapi Toby Cecchini di Odeon Bar di New York pada tahun 1987 yang mencipta resipi definitif dengan vodka citron, cointreau dan cranberry."
    },
    recipe: {
      pt: { glass: "Taça Martini V-Shape (gelada)", ingredients: ["45ml Vodka Citron", "15ml Cointreau ou Triple Sec", "15ml Suco de Limão Taiti Fresco", "30ml Cranberry Juice Premium", "Raspa de Laranja Flambada"], method: "AGITE intensamente com gelo por 15 segundos — o cosmo precisa de aeração. A cor deve ser rosa-salmão perfeita. Coe duplo na taça V gelada. Flambe raspa de laranja sobre a taça (a chama carameliza os óleos). Decore com raspa em espiral. Deve chegar gelado e luminoso." },
      en: { glass: "V-Shape Martini Glass (chilled)", ingredients: ["45ml Citron Vodka", "15ml Cointreau or Triple Sec", "15ml Fresh Lime Juice", "30ml Premium Cranberry Juice", "Flamed Orange Peel"], method: "SHAKE intensely with ice for 15 seconds — the cosmo needs aeration. The color must be perfect salmon-pink. Double strain into chilled V-glass. Flambe orange peel over the glass (flame caramelizes the oils). Garnish with spiral peel. Must arrive chilled and luminous." },
      ms: { glass: "Gelas Martini V-Shape (sejuk)", ingredients: ["45ml Vodka Citron", "15ml Cointreau atau Triple Sec", "15ml Jus Limau Segar", "30ml Jus Cranberry Premium", "Kulit Oren Dibakar"], method: "GONCANG dengan kuat dengan ais selama 15 saat — cosmo memerlukan aerasi. Warna mesti merah jambu salmon yang sempurna. Tapis berganda ke dalam gelas V yang sejuk. Bakar kulit oren di atas gelas. Hiaskan dengan kulit spiral." }
    },
    modern: {
      pt: "Cosmopolitan molecular com vodka infusionada de baunilha tailandesa, espuma de cranberry nitrificado e pétala de rosa cristalizada. Flair: double tin flip com abertura aérea.",
      en: "Molecular Cosmopolitan with Thai vanilla-infused vodka, nitrified cranberry foam and crystallized rose petal. Flair: double tin flip with aerial opening.",
      ms: "Cosmopolitan molekular dengan vodka infusi vanila Thai, buih cranberry nitrifikasi dan kelopak mawar dikristalisasikan. Flair: double tin flip dengan pembukaan udara."
    }
  },
  {
    id: 12,
    year: 2000,
    name: { pt: "Espresso Martini", en: "Espresso Martini", ms: "Espresso Martini" },
    era: "contemporary",
    country: { pt: "Inglaterra", en: "England", ms: "England" },
    city: { pt: "Londres", en: "London", ms: "London" },
    flag: "🇬🇧",
    inventor: "Dick Bradsell",
    bartender: "Dick Bradsell — Soho Brasserie",
    color: "#3D1C02",
    accent: "#8B4513",
    description: {
      pt: "A lenda diz que em 1983, uma jovem modelo (dizem ser Kate Moss) entrou no bar de Dick Bradsell em Londres e pediu algo que 'me acorde e me bêbade ao mesmo tempo'. Bradsell, considerado o 'rei dos coquetéis britânicos', criou instantaneamente o Espresso Martini usando café expresso da máquina de café do bar. Tornou-se o coquetel mais trendy dos anos 2000 e viveu um renascimento viral em 2021-2023. O clássico moderno definitivo.",
      en: "Legend says in 1983, a young model (said to be Kate Moss) walked into Dick Bradsell's bar in London and asked for something that 'wakes me up and gets me drunk at the same time'. Bradsell, considered the 'king of British cocktails', instantly created the Espresso Martini using espresso from the bar's coffee machine. It became the trendy cocktail of the 2000s and experienced a viral renaissance in 2021-2023.",
      ms: "Legenda mengatakan pada tahun 1983, seorang model muda (dikatakan Kate Moss) masuk ke bar Dick Bradsell di London dan meminta sesuatu yang 'bangunkan saya dan mabukkan saya pada masa yang sama'. Bradsell, dianggap 'raja koktail British', terus mencipta Espresso Martini."
    },
    recipe: {
      pt: { glass: "Taça de Coquetel V (Martini)", ingredients: ["50ml Vodka Premium", "30ml Licor de Café (Kahlúa ou Mr. Black)", "30ml Espresso Fresco e Quente", "5ml Xarope Simples (opcional)", "3 grãos de café para decorar"], method: "O SEGREDO: use espresso acabado de fazer — quente. Combine todos no shaker. Adicione gelo generoso. AGITE com força máxima por 20 segundos — o calor + agitação cria a espuma perfeita. A crema do café forma o creme dourado na superfície. Coe na taça gelada. Decore com 3 grãos de café." },
      en: { glass: "V Cocktail Glass (Martini)", ingredients: ["50ml Premium Vodka", "30ml Coffee Liqueur (Kahlúa or Mr. Black)", "30ml Fresh Hot Espresso", "5ml Simple Syrup (optional)", "3 coffee beans for garnish"], method: "THE SECRET: use freshly made espresso — hot. Combine all in shaker. Add generous ice. SHAKE with maximum force for 20 seconds — heat + agitation creates perfect foam. Coffee crema forms golden cream on surface. Strain into chilled glass. Garnish with 3 coffee beans." },
      ms: { glass: "Gelas V Koktail (Martini)", ingredients: ["50ml Vodka Premium", "30ml Likur Kopi (Kahlúa atau Mr. Black)", "30ml Espresso Panas Segar", "5ml Sirap Mudah (pilihan)", "3 biji kopi untuk hiasan"], method: "RAHSIA: guna espresso yang baru dibuat — panas. Gabungkan semua dalam shaker. Tambah ais yang banyak. GONCANG dengan daya maksimum selama 20 saat — haba + goncangan mencipta buih sempurna. Crema kopi membentuk krim emas di permukaan." }
    },
    modern: {
      pt: "Espresso Martini com café de origem única Ethiopia Yirgacheffe, vodka de mel artesanal, espuma nítrica de leite de aveia e crocante de café. Flair: spin do shaker com fogo.",
      en: "Espresso Martini with single-origin Ethiopia Yirgacheffe coffee, artisan honey vodka, oat milk nitric foam and coffee brittle. Flair: shaker spin with fire.",
      ms: "Espresso Martini dengan kopi asal tunggal Ethiopia Yirgacheffe, vodka madu artisanal, buih nitrik susu oat dan gula-gula kopi. Flair: pusingan shaker dengan api."
    }
  }
];

const ASSOCIATIONS = [
  { name: "World Flair Association (WFA)", country: { pt: "Internacional", en: "International", ms: "Antarabangsa" }, flag: "🌍", founded: 1997, description: { pt: "Maior organização mundial de flair bartending, organiza o WFA World Flair Championship anualmente.", en: "World's largest flair bartending organization, hosts the annual WFA World Flair Championship.", ms: "Organisasi flair bartending terbesar di dunia, menganjurkan Kejohanan Flair Dunia WFA tahunan." }, members: "50+ países" },
  { name: "Flair Bartenders' Association (FBA)", country: { pt: "Internacional", en: "International", ms: "Antarabangsa" }, flag: "🌐", founded: 1991, description: { pt: "Pioneira no movimento global de flair, reconhece e certifica bartenders de flair em todo o mundo.", en: "Pioneer in the global flair movement, recognizes and certifies flair bartenders worldwide.", ms: "Pelopor dalam gerakan flair global, mengiktiraf dan mensertifikasi bartender flair di seluruh dunia." }, members: "40+ países" },
  { name: "International Bartenders Association (IBA)", country: { pt: "Internacional", en: "International", ms: "Antarabangsa" }, flag: "🏆", founded: 1951, description: { pt: "Fundada em 1951 em Torquay, Inglaterra. Define os coquetéis oficiais e organiza o Campeonato Mundial de Bartending.", en: "Founded in 1951 in Torquay, England. Defines official cocktails and organizes the World Cocktail Championship.", ms: "Ditubuhkan pada 1951 di Torquay, England. Mentakrifkan koktail rasmi dan menganjurkan Kejohanan Koktail Dunia." }, members: "60+ países" },
  { name: "European Flair Association (EFA)", country: { pt: "Europa", en: "Europe", ms: "Eropah" }, flag: "🇪🇺", founded: 2003, description: { pt: "Promove o flair bartending em toda a Europa, realizando competições em mais de 20 países europeus.", en: "Promotes flair bartending across Europe, running competitions in over 20 European countries.", ms: "Mempromosikan flair bartending di seluruh Eropah, menjalankan pertandingan di lebih 20 negara Eropah." }, members: "20+ países" },
  { name: "Brazilian Bartenders Guild (ABB)", country: { pt: "Brasil", en: "Brazil", ms: "Brazil" }, flag: "🇧🇷", founded: 1994, description: { pt: "Maior associação de bartenders da América Latina, responsável por promover a cultura do coquetel brasileiro globalmente.", en: "Largest bartenders association in Latin America, responsible for promoting Brazilian cocktail culture globally.", ms: "Persatuan bartender terbesar di Amerika Latin, bertanggungjawab mempromosikan budaya koktail Brazil secara global." }, members: "5.000+ membros" },
  { name: "Malaysian Bartenders Guild (MBG)", country: { pt: "Malásia", en: "Malaysia", ms: "Malaysia" }, flag: "🇲🇾", founded: 2008, description: { pt: "Representa os bartenders profissionais da Malásia, organizando o Malaysia National Bartending Championship.", en: "Represents professional bartenders in Malaysia, organizing the Malaysia National Bartending Championship.", ms: "Mewakili bartender profesional di Malaysia, menganjurkan Kejohanan Bartending Kebangsaan Malaysia." }, members: "500+ membros" },
  { name: "Tales of the Cocktail Foundation", country: { pt: "Estados Unidos", en: "United States", ms: "Amerika Syarikat" }, flag: "🇺🇸", founded: 2002, description: { pt: "Festival e fundação educacional de Nova Orleans, considerado o Oscar da indústria de bebidas. Distribui o Spirited Awards.", en: "New Orleans festival and educational foundation, considered the Oscars of the drinks industry. Distributes the Spirited Awards.", ms: "Festival dan yayasan pendidikan New Orleans, dianggap Oscar industri minuman. Mengagihkan Spirited Awards." }, members: "Global" },
  { name: "Bartenders' Association of India (BAI)", country: { pt: "Índia", en: "India", ms: "India" }, flag: "🇮🇳", founded: 1951, description: { pt: "Uma das mais antigas associações de bartending da Ásia, promovendo a mixologia indiana e técnicas de flair tradicionais.", en: "One of the oldest bartending associations in Asia, promoting Indian mixology and traditional flair techniques.", ms: "Salah satu persatuan bartending tertua di Asia, mempromosikan mixologi India dan teknik flair tradisional." }, members: "2.000+ membros" }
];

const ERA_COLORS = {
  colonial: { bg: "#2C1810", accent: "#C8860A", label: "#FFD700" },
  prohibition: { bg: "#1A1A2E", accent: "#8B0000", label: "#FF6B6B" },
  golden: { bg: "#0D2B1F", accent: "#1E8449", label: "#58D68D" },
  modern: { bg: "#1B2631", accent: "#1A5276", label: "#5DADE2" },
  contemporary: { bg: "#2D1B69", accent: "#7D3C98", label: "#C39BD3" }
};

export default function FlairBartendingTimeline() {
  const [lang, setLang] = useState("pt");
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("recipe");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [view, setView] = useState("timeline");
  const timelineRef = useRef(null);
  const t = TRANSLATIONS[lang];

  const onMouseDown = useCallback((e) => {
    if (selected) return;
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  }, [selected]);

  const onMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    timelineRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const stopDrag = useCallback(() => setIsDragging(false), []);

  const eraConfig = selected ? ERA_COLORS[selected.era] : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050505",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#F5F0E8",
      overflow: "hidden",
      position: "relative"
    }}>

      {/* Animated background particles */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: i % 3 === 0 ? "2px" : "1px",
            height: i % 3 === 0 ? "2px" : "1px",
            background: `rgba(200, 134, 10, ${0.1 + (i % 5) * 0.06})`,
            left: `${(i * 17 + 5) % 100}%`,
            top: `${(i * 23 + 10) % 100}%`,
            borderRadius: "50%",
            animation: `float${i % 3} ${3 + (i % 4)}s ease-in-out infinite`,
            boxShadow: `0 0 ${4 + i % 8}px rgba(200, 134, 10, 0.3)`
          }} />
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap');

        * { box-sizing: border-box; }

        body { margin: 0; }

        .flair-title { font-family: 'Cinzel', serif; }
        .flair-body { font-family: 'Crimson Pro', serif; }

        @keyframes float0 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-20px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-35px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-15px)} }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(200,134,10,0.3); }
          50% { box-shadow: 0 0 40px rgba(200,134,10,0.7); }
        }

        .timeline-container {
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0 80px 60px;
          cursor: grab;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(200,134,10,0.5) rgba(10,10,10,0.5);
        }
        .timeline-container:active { cursor: grabbing; }
        .timeline-container::-webkit-scrollbar { height: 4px; }
        .timeline-container::-webkit-scrollbar-track { background: rgba(10,10,10,0.5); }
        .timeline-container::-webkit-scrollbar-thumb { background: rgba(200,134,10,0.5); border-radius: 2px; }

        .cocktail-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .cocktail-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .lang-btn {
          background: transparent;
          border: 1px solid rgba(200,134,10,0.4);
          color: rgba(200,134,10,0.7);
          padding: 6px 14px;
          cursor: pointer;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 1px;
          transition: all 0.2s;
          border-radius: 2px;
        }
        .lang-btn.active {
          background: rgba(200,134,10,0.15);
          border-color: #C8860A;
          color: #FFD700;
        }
        .lang-btn:hover { border-color: #C8860A; color: #FFD700; }

        .nav-btn {
          background: transparent;
          border: none;
          color: rgba(200,134,10,0.6);
          cursor: pointer;
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 2px;
          padding: 8px 16px;
          transition: all 0.2s;
          position: relative;
        }
        .nav-btn.active { color: #FFD700; }
        .nav-btn.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 1px;
          background: #C8860A;
        }
        .nav-btn:hover { color: #FFD700; }

        .tab-btn {
          background: transparent;
          border: none;
          color: rgba(245,240,232,0.5);
          cursor: pointer;
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          padding: 8px 16px;
          transition: all 0.2s;
          border-bottom: 1px solid transparent;
        }
        .tab-btn.active {
          color: #FFD700;
          border-bottom-color: #C8860A;
        }
        .tab-btn:hover { color: #F5F0E8; }

        .assoc-card {
          transition: all 0.3s ease;
          border: 1px solid rgba(200,134,10,0.15);
        }
        .assoc-card:hover {
          border-color: rgba(200,134,10,0.5);
          transform: translateY(-4px);
          background: rgba(200,134,10,0.05) !important;
        }

        .close-btn {
          background: rgba(200,134,10,0.1);
          border: 1px solid rgba(200,134,10,0.3);
          color: #C8860A;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          border-radius: 50%;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .close-btn:hover {
          background: rgba(200,134,10,0.25);
          border-color: #C8860A;
        }

        .ingredient-item::before {
          content: '◆';
          color: #C8860A;
          margin-right: 8px;
          font-size: 8px;
        }
      `}</style>

      {/* HEADER */}
      <div style={{ position: "relative", zIndex: 10, padding: "24px 40px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>

          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
              <h1 className="flair-title" style={{
                margin: 0,
                fontSize: "clamp(24px, 4vw, 42px)",
                fontWeight: 900,
                letterSpacing: "6px",
                background: "linear-gradient(90deg, #8B6008, #C8860A, #FFD700, #C8860A, #8B6008)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s linear infinite"
              }}>
                {t.title}
              </h1>
              <span style={{
                fontSize: "10px",
                letterSpacing: "3px",
                color: "rgba(200,134,10,0.5)",
                fontFamily: "'Cinzel', serif",
                textTransform: "uppercase",
                borderLeft: "1px solid rgba(200,134,10,0.3)",
                paddingLeft: "12px"
              }}>WORLD EDITION</span>
            </div>
            <p className="flair-body" style={{
              margin: "4px 0 0",
              fontSize: "15px",
              color: "rgba(245,240,232,0.5)",
              fontStyle: "italic",
              letterSpacing: "1px"
            }}>{t.subtitle}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
            <div style={{ display: "flex", gap: "6px" }}>
              {["pt", "en", "ms"].map(l => (
                <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)}>
                  {l === "pt" ? "PT" : l === "en" ? "EN" : "MY"}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0" }}>
              <button className={`nav-btn ${view === "timeline" ? "active" : ""}`} onClick={() => setView("timeline")}>
                {t.timeline}
              </button>
              <button className={`nav-btn ${view === "associations" ? "active" : ""}`} onClick={() => setView("associations")}>
                {t.associations}
              </button>
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,134,10,0.6), transparent)" }} />
          <span style={{ color: "rgba(200,134,10,0.4)", fontSize: "12px" }}>✦</span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,134,10,0.6), transparent)" }} />
        </div>
      </div>

      {/* TIMELINE VIEW */}
      {view === "timeline" && (
        <div style={{ position: "relative", zIndex: 5, marginTop: "40px" }}>

          {/* Era legend */}
          <div style={{ display: "flex", gap: "20px", padding: "0 80px", marginBottom: "32px", flexWrap: "wrap" }}>
            {Object.entries(ERA_COLORS).map(([era, cfg]) => (
              <div key={era} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: cfg.label, boxShadow: `0 0 8px ${cfg.label}` }} />
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "1px", color: "rgba(245,240,232,0.5)" }}>
                  {t.era_labels[era]}
                </span>
              </div>
            ))}
          </div>

          {/* Timeline axis */}
          <div style={{ position: "relative" }}>
            {/* Central line */}
            <div style={{
              position: "absolute",
              left: 80, right: 80,
              top: "50%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(200,134,10,0.15), rgba(200,134,10,0.5), rgba(200,134,10,0.15), transparent)",
              pointerEvents: "none",
              zIndex: 1
            }} />

            <div
              ref={timelineRef}
              className="timeline-container"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
            >
              {/* Spacer */}
              <div style={{ flexShrink: 0, width: "20px" }} />

              {COCKTAILS.map((c, idx) => {
                const era = ERA_COLORS[c.era];
                const isAbove = idx % 2 === 0;
                return (
                  <div key={c.id} style={{
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginRight: "60px",
                    position: "relative"
                  }}>
                    {/* Card */}
                    <div
                      className="cocktail-card"
                      onClick={() => { setSelected(c); setActiveTab("recipe"); }}
                      style={{
                        width: "240px",
                        background: `linear-gradient(145deg, ${era.bg}, #0A0A0A)`,
                        border: `1px solid rgba(${era.label === "#FFD700" ? "200,134,10" : era.label.replace("#","").match(/.{2}/g).map(h=>parseInt(h,16)).join(",")}, 0.35)`,
                        borderRadius: "2px",
                        padding: "20px",
                        marginBottom: isAbove ? "0" : "240px",
                        marginTop: isAbove ? "240px" : "0",
                        order: isAbove ? 1 : -1,
                        position: "relative",
                        overflow: "hidden",
                        animation: "fadeIn 0.6s ease forwards",
                        animationDelay: `${idx * 0.1}s`,
                        opacity: 0
                      }}
                    >
                      {/* Corner accent */}
                      <div style={{
                        position: "absolute", top: 0, right: 0,
                        width: "40px", height: "40px",
                        background: `linear-gradient(135deg, transparent 50%, ${era.accent}22 50%)`
                      }} />

                      {/* Year badge */}
                      <div style={{
                        position: "absolute", top: "12px", right: "12px",
                        fontFamily: "'Cinzel', serif",
                        fontSize: "10px",
                        color: era.label,
                        letterSpacing: "1px"
                      }}>{c.year}</div>

                      <div style={{ fontSize: "28px", marginBottom: "8px" }}>{c.flag}</div>

                      <h3 className="flair-title" style={{
                        margin: "0 0 4px",
                        fontSize: "15px",
                        fontWeight: 600,
                        letterSpacing: "1px",
                        color: "#F5F0E8",
                        lineHeight: 1.2
                      }}>{c.name[lang]}</h3>

                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                        <div style={{
                          width: "6px", height: "6px", borderRadius: "50%",
                          background: era.label,
                          boxShadow: `0 0 6px ${era.label}`
                        }} />
                        <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: "11px", color: "rgba(245,240,232,0.5)", letterSpacing: "0.5px" }}>
                          {c.city[lang]}, {c.country[lang]}
                        </span>
                      </div>

                      <div style={{
                        borderTop: `1px solid rgba(200,134,10,0.15)`,
                        paddingTop: "10px",
                        marginTop: "4px"
                      }}>
                        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", color: "rgba(200,134,10,0.6)", letterSpacing: "1.5px", marginBottom: "3px" }}>
                          {t.inventor.toUpperCase()}
                        </div>
                        <div className="flair-body" style={{ fontSize: "12px", color: "rgba(245,240,232,0.7)", fontStyle: "italic" }}>
                          {c.inventor}
                        </div>
                      </div>

                      <div style={{
                        marginTop: "14px",
                        padding: "7px 12px",
                        background: `rgba(200,134,10,0.08)`,
                        border: "1px solid rgba(200,134,10,0.2)",
                        borderRadius: "2px",
                        fontFamily: "'Cinzel', serif",
                        fontSize: "9px",
                        letterSpacing: "1.5px",
                        color: "rgba(200,134,10,0.8)",
                        textAlign: "center",
                        cursor: "pointer"
                      }}>
                        {t.explore} →
                      </div>
                    </div>

                    {/* Timeline connector */}
                    <div style={{
                      width: "1px",
                      height: "40px",
                      background: `linear-gradient(${isAbove ? "to bottom" : "to top"}, ${era.accent}80, transparent)`,
                      order: 0,
                      position: "relative"
                    }} />

                    {/* Timeline dot */}
                    <div style={{
                      width: "14px", height: "14px",
                      borderRadius: "50%",
                      background: era.label,
                      border: `2px solid ${era.bg}`,
                      boxShadow: `0 0 12px ${era.label}90`,
                      order: 0,
                      zIndex: 2,
                      position: "relative",
                      flexShrink: 0
                    }}>
                      <div style={{
                        position: "absolute",
                        inset: "-4px",
                        borderRadius: "50%",
                        border: `1px solid ${era.label}40`,
                        animation: "pulse-ring 2s ease-out infinite"
                      }} />
                    </div>

                    {/* Year label on axis */}
                    <div style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "9px",
                      color: "rgba(200,134,10,0.5)",
                      letterSpacing: "1px",
                      order: 0,
                      marginTop: "4px"
                    }}>{c.year}</div>
                  </div>
                );
              })}

              <div style={{ flexShrink: 0, width: "80px" }} />
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{
            textAlign: "center",
            fontFamily: "'Cinzel', serif",
            fontSize: "10px",
            letterSpacing: "2px",
            color: "rgba(200,134,10,0.3)",
            marginTop: "8px",
            animation: "float0 2s ease-in-out infinite"
          }}>{t.scroll}</div>
        </div>
      )}

      {/* ASSOCIATIONS VIEW */}
      {view === "associations" && (
        <div style={{ padding: "40px", animation: "fadeIn 0.5s ease" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
            maxWidth: "1400px",
            margin: "0 auto"
          }}>
            {ASSOCIATIONS.map((assoc, i) => (
              <div key={i} className="assoc-card" style={{
                background: "linear-gradient(145deg, #0D0D0D, #050505)",
                borderRadius: "2px",
                padding: "24px",
                position: "relative",
                overflow: "hidden",
                animation: "fadeIn 0.5s ease forwards",
                animationDelay: `${i * 0.08}s`,
                opacity: 0
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, rgba(200,134,10,0.6), transparent)"
                }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                  <div>
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>{assoc.flag}</div>
                    <h3 className="flair-title" style={{
                      margin: 0,
                      fontSize: "14px",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      color: "#F5F0E8",
                      lineHeight: 1.3
                    }}>{assoc.name}</h3>
                  </div>
                  <div style={{
                    background: "rgba(200,134,10,0.1)",
                    border: "1px solid rgba(200,134,10,0.2)",
                    padding: "4px 10px",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "10px",
                    color: "rgba(200,134,10,0.8)",
                    letterSpacing: "1px",
                    borderRadius: "2px",
                    flexShrink: 0,
                    marginLeft: "12px"
                  }}>Est. {assoc.founded}</div>
                </div>

                <div style={{
                  fontFamily: "'Crimson Pro', serif",
                  fontSize: "14px",
                  color: "rgba(245,240,232,0.65)",
                  lineHeight: 1.6,
                  marginBottom: "16px",
                  fontStyle: "italic"
                }}>{assoc.description[lang]}</div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", color: "rgba(200,134,10,0.5)", letterSpacing: "1.5px" }}>
                    {assoc.country[lang].toUpperCase()}
                  </div>
                  <div style={{
                    fontFamily: "'Crimson Pro', serif",
                    fontSize: "12px",
                    color: "rgba(200,134,10,0.7)"
                  }}>{assoc.members}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {selected && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(0,0,0,0.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          animation: "fadeIn 0.3s ease"
        }} onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>

          <div style={{
            width: "100%",
            maxWidth: "820px",
            maxHeight: "90vh",
            background: `linear-gradient(145deg, ${eraConfig.bg} 0%, #080808 100%)`,
            border: `1px solid ${selected.color}40`,
            borderRadius: "4px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            animation: "slideLeft 0.3s ease"
          }}>

            {/* Modal Header */}
            <div style={{
              padding: "28px 32px 20px",
              borderBottom: `1px solid rgba(200,134,10,0.15)`,
              background: `linear-gradient(180deg, ${eraConfig.bg}, transparent)`,
              flexShrink: 0
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "36px" }}>{selected.flag}</span>
                    <div>
                      <div style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "10px",
                        letterSpacing: "3px",
                        color: eraConfig.label,
                        marginBottom: "4px",
                        opacity: 0.8
                      }}>{selected.year} · {t.era_labels[selected.era]}</div>
                      <h2 className="flair-title" style={{
                        margin: 0,
                        fontSize: "clamp(22px, 4vw, 32px)",
                        fontWeight: 900,
                        letterSpacing: "3px",
                        color: "#F5F0E8"
                      }}>{selected.name[lang]}</h2>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginTop: "10px" }}>
                    {[
                      [t.country, selected.country[lang]],
                      [t.city, selected.city[lang]],
                      [t.inventor, selected.inventor]
                    ].map(([label, val]) => (
                      <div key={label}>
                        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "1.5px", color: "rgba(200,134,10,0.5)", marginBottom: "2px" }}>{label.toUpperCase()}</div>
                        <div style={{ fontFamily: "'Crimson Pro', serif", fontSize: "13px", color: "rgba(245,240,232,0.8)", fontStyle: "italic" }}>{val}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", letterSpacing: "1.5px", color: "rgba(200,134,10,0.5)", marginBottom: "2px" }}>{t.bartender.toUpperCase()}</div>
                    <div style={{ fontFamily: "'Crimson Pro', serif", fontSize: "13px", color: "rgba(245,240,232,0.8)", fontStyle: "italic" }}>{selected.bartender}</div>
                  </div>
                </div>

                <button className="close-btn" onClick={() => setSelected(null)}>×</button>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: "0", marginTop: "20px", borderBottom: "1px solid rgba(200,134,10,0.1)" }}>
                {[
                  ["recipe", t.recipe],
                  ["description", t.description],
                  ["modern", t.modern]
                ].map(([tab, label]) => (
                  <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
                    {label.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ overflow: "auto", flex: 1, padding: "24px 32px 32px" }}>

              {activeTab === "description" && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <p className="flair-body" style={{
                    fontSize: "16px",
                    lineHeight: "1.8",
                    color: "rgba(245,240,232,0.8)",
                    margin: 0
                  }}>{selected.description[lang]}</p>
                </div>
              )}

              {activeTab === "recipe" && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <div style={{ marginBottom: "20px" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "2px", color: "rgba(200,134,10,0.6)", marginBottom: "8px" }}>
                      {t.glass.toUpperCase()}
                    </div>
                    <div style={{
                      display: "inline-block",
                      padding: "6px 16px",
                      border: "1px solid rgba(200,134,10,0.25)",
                      background: "rgba(200,134,10,0.05)",
                      fontFamily: "'Crimson Pro', serif",
                      fontSize: "14px",
                      color: "rgba(245,240,232,0.8)",
                      fontStyle: "italic",
                      borderRadius: "2px"
                    }}>🥃 {selected.recipe[lang].glass}</div>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "2px", color: "rgba(200,134,10,0.6)", marginBottom: "12px" }}>
                      {t.ingredients.toUpperCase()}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      {selected.recipe[lang].ingredients.map((ing, i) => (
                        <div key={i} className="ingredient-item" style={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "'Crimson Pro', serif",
                          fontSize: "14px",
                          color: "rgba(245,240,232,0.75)",
                          padding: "6px 0",
                          borderBottom: "1px solid rgba(200,134,10,0.08)"
                        }}>{ing}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "2px", color: "rgba(200,134,10,0.6)", marginBottom: "12px" }}>
                      {t.method.toUpperCase()}
                    </div>
                    <p className="flair-body" style={{
                      fontSize: "15px",
                      lineHeight: "1.8",
                      color: "rgba(245,240,232,0.8)",
                      margin: 0,
                      padding: "16px",
                      background: "rgba(200,134,10,0.04)",
                      border: "1px solid rgba(200,134,10,0.12)",
                      borderRadius: "2px",
                      borderLeft: `3px solid ${selected.color}`
                    }}>{selected.recipe[lang].method}</p>
                  </div>
                </div>
              )}

              {activeTab === "modern" && (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <div style={{
                    padding: "24px",
                    background: `linear-gradient(145deg, ${eraConfig.accent}08, transparent)`,
                    border: `1px solid ${eraConfig.accent}25`,
                    borderRadius: "2px",
                    marginBottom: "20px"
                  }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "2px", color: "rgba(200,134,10,0.6)", marginBottom: "12px" }}>
                      ✦ CONTEMPORARY FLAIR EDITION
                    </div>
                    <p className="flair-body" style={{
                      fontSize: "16px",
                      lineHeight: "1.8",
                      color: "rgba(245,240,232,0.8)",
                      margin: 0
                    }}>{selected.modern[lang]}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        position: "relative",
        zIndex: 5,
        textAlign: "center",
        padding: "16px",
        borderTop: "1px solid rgba(200,134,10,0.1)"
      }}>
        <span style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "9px",
          letterSpacing: "2px",
          color: "rgba(200,134,10,0.25)"
        }}>✦ FLAIR BARTENDING WORLD EDUCATIONAL PLATFORM ✦</span>
      </div>
    </div>
  );
}
