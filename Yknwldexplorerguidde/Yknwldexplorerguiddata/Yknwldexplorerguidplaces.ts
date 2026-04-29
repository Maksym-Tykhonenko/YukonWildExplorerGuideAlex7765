export type YknwldexplorerguidCategory =
  | 'Parks'
  | 'Aurora'
  | 'Waters'
  | 'Heritage'
  | 'Winter';

export type YknwldexplorerguidPlace = {
  id: string;
  category: YknwldexplorerguidCategory;
  emoji: string;
  title: string;
  description: string;
  coordinates: {lat: number; lng: number};
  image?: unknown;
};

export const yknwldexplorerguidPlaces: YknwldexplorerguidPlace[] = [
  {
    id: 'parks-kluane',
    category: 'Parks',
    emoji: '🌲',
    title: 'Kluane National Park and Reserve',
    coordinates: {lat: 60.75, lng: -138.5},
    description:
      "One of Canada's most impressive national parks, known for its vast glaciers, mountain ranges, and pristine wilderness. It is home to the country's highest point, Mount Logan. The park's terrain is largely untouched by humans, making it an ideal place for true adventure: trekking, camping, and wildlife viewing, including bears, eagles, and caribou.",
    image: require('../../assets/i/yknwldexploroloc1.png'),
  },
  {
    id: 'parks-tombstone',
    category: 'Parks',
    emoji: '🌲',
    title: 'Tombstone Territorial Park',
    coordinates: {lat: 64.5, lng: -138.25},
    description:
      'The park is known for its dramatic tombstone-like mountain peaks, which gave it its name. The landscape here is unique—a combination of tundra, rocky peaks, and open spaces. It is a popular spot for hiking, photography, and viewing the northern lights, especially due to its clear skies and remoteness from cities.',
    image: require('../../assets/i/yknwldexploroloc2.png'),
  },
  {
    id: 'parks-kusawa',
    category: 'Parks',
    emoji: '🌲',
    title: 'Kusawa Territorial Park',
    coordinates: {lat: 60.3, lng: -137.0},
    description:
      'This park is located around the picturesque Kusawa Lake, surrounded by mountains and forests. It has a peaceful atmosphere, perfect for camping, fishing and boating. In the summer it is a great place to relax in nature, and in the winter the area turns into a snowy space for quiet winter adventures.',
    image: require('../../assets/i/yknwldexploroloc3.png'),
  },
  {
    id: 'parks-pine-lake',
    category: 'Parks',
    emoji: '🌲',
    title: 'Pine Lake Territorial Park',
    coordinates: {lat: 60.58, lng: -135.05},
    description:
      'A small but very popular park among locals and tourists. Located near the city of Whitehorse, it offers great conditions for family recreation. There is a sandy shore, picnic areas and warm lake waters in the summer, making it the perfect place for quiet relaxation.',
    image: require('../../assets/i/yknwldexploroloc4.png'),
  },
  {
    id: 'parks-coal-river-springs',
    category: 'Parks',
    emoji: '🌲',
    title: 'Coal River Springs Territorial Park',
    coordinates: {lat: 60.05, lng: -128.75},
    description:
      'This park is known for its hot springs, which remain warm even in the coldest months of the year. The water is rich in minerals, making it popular with tourists looking for rest and rejuvenation. The surrounding nature adds to the feeling of isolation and tranquility.',
    image: require('../../assets/i/yknwldexploroloc5.png'),
  },
  {
    id: 'parks-herschel-island',
    category: 'Parks',
    emoji: '🌲',
    title: 'Herschel Island Territorial Park',
    coordinates: {lat: 69.57, lng: -139.05},
    description:
      'Located in the Arctic Ocean, this park is a unique Arctic destination with a rich history. Here you can see the remains of old whaling stations, as well as enjoy the harsh but beautiful Arctic landscapes. This is a place for those looking for true remoteness and an unusual experience.',
    image: require('../../assets/i/yknwldexploroloc6.png'),
  },

  {
    id: 'aurora-whitehorse-viewing-area',
    category: 'Aurora',
    emoji: '🌌',
    title: 'Whitehorse Northern Lights Viewing Area',
    coordinates: {lat: 60.72, lng: -135.05},
    description:
      'This is one of the most popular spots to see the Northern Lights near Whitehorse. Its proximity to the city and low light pollution make it an ideal location for tourists. In the winter, tours are often organized here, where you can comfortably observe the bright waves of light in the sky.',
    image: require('../../assets/i/yknwldexploroloc7.png'),
  },
  {
    id: 'aurora-fish-lake',
    category: 'Aurora',
    emoji: '🌌',
    title: 'Fish Lake',
    coordinates: {lat: 60.63, lng: -135.17},
    description:
      'A small lake near Whitehorse, which is one of the best places for night observations. The open terrain and lack of artificial lighting create ideal conditions for seeing the aurora in all its glory, especially when it is reflected in the water or on the frozen surface of the lake.',
    image: require('../../assets/i/yknwldexploroloc8.png'),
  },
  {
    id: 'aurora-takhini-hot-springs',
    category: 'Aurora',
    emoji: '🌌',
    title: 'Takhini Hot Springs',
    coordinates: {lat: 60.87, lng: -135.37},
    description:
      'This is a unique place where you can combine observing the northern lights with relaxing in hot springs. The contrast between the cold air and warm water creates an unforgettable experience. On clear nights, bright colored waves of light often appear above the springs.',
    image: require('../../assets/i/yknwldexploroloc9.png'),
  },
  {
    id: 'aurora-southern-lakes-region',
    category: 'Aurora',
    emoji: '🌌',
    title: 'Southern Lakes Region',
    coordinates: {lat: 60.1, lng: -134.8},
    description:
      'This region includes several large lakes and open spaces, which makes it ideal for night observations. The absence of cities and artificial light allows you to see the lights as clearly as possible, and the reflection in the lakes adds even more atmosphere.',
    image: require('../../assets/i/yknwldexploroloc10.png'),
  },
  {
    id: 'aurora-dawson-city',
    category: 'Aurora',
    emoji: '🌌',
    title: 'Dawson City',
    coordinates: {lat: 64.06, lng: -139.43},
    description:
      'A historic city that is also a great place to observe the aurora. Due to its northern location, the chance of seeing the lights here is very high. At night, the sky above the city is often filled with bright moving ribbons of light.',
    image: require('../../assets/i/yknwldexploroloc11.png'),
  },
  {
    id: 'aurora-dempster-highway',
    category: 'Aurora',
    emoji: '🌌',
    title: 'Dempster Highway',
    coordinates: {lat: 64.0, lng: -138.5},
    description:
      'This is one of the most remote roads in Canada, passing through wilderness areas without any lighting. Along this road, there are ideal points for observing the northern lights, where the night sky looks as clear and deep as possible.',
    image: require('../../assets/i/yknwldexploroloc12.png'),
  },

  {
    id: 'waters-yukon-river',
    category: 'Waters',
    emoji: '💧',
    title: 'Yukon River',
    coordinates: {lat: 60.72, lng: -135.05},
    description:
      'One of the most famous rivers in North America, it flows through the entire Yukon. It played a key role during the gold rush and still remains a symbol of the region. Today it is a popular place for canoeing, rafting and multi-day expeditions, where you can fully immerse yourself in the wilderness.',
    image: require('../../assets/i/yknwldexploroloc13.png'),
  },
  {
    id: 'waters-emerald-lake',
    category: 'Waters',
    emoji: '💧',
    title: 'Emerald Lake',
    coordinates: {lat: 60.58, lng: -136.18},
    description:
      'This is one of the most beautiful lakes in the Yukon, known for its bright turquoise water. The unusual shade is created by minerals that reflect light. The lake is surrounded by mountains and forests, which makes it an ideal place for photos and a quiet rest.',
    image: require('../../assets/i/yknwldexploroloc14.png'),
  },
  {
    id: 'waters-lake-laberge',
    category: 'Waters',
    emoji: '💧',
    title: 'Lake Laberge',
    coordinates: {lat: 61.23, lng: -135.05},
    description:
      'A large and impressive lake that is often mentioned in Yukon history. It is part of the Yukon River system and is known for its cold waters and strong winds. It is a great place for fishing, camping and wildlife watching.',
    image: require('../../assets/i/yknwldexploroloc15.png'),
  },
  {
    id: 'waters-kusawa-lake',
    category: 'Waters',
    emoji: '💧',
    title: 'Kusawa Lake',
    coordinates: {lat: 60.3, lng: -137.0},
    description:
      'A long mountain lake that stretches for dozens of kilometers. Its crystal clear water and remote location make it ideal for those seeking peace and unity with nature. Boating, fishing and camping are popular here.',
    image: require('../../assets/i/yknwldexploroloc16.png'),
  },
  {
    id: 'waters-kathleen-lake',
    category: 'Waters',
    emoji: '💧',
    title: 'Kathleen Lake',
    coordinates: {lat: 60.6, lng: -138.35},
    description:
      'Located in Kluane National Park and Reserve, this lake is known for its clear waters and panoramic mountain views. In the summer, you can enjoy hiking trails, and in the winter, you can admire the snowy landscapes.',
    image: require('../../assets/i/yknwldexploroloc17.png'),
  },
  {
    id: 'waters-tagish-lake',
    category: 'Waters',
    emoji: '💧',
    title: 'Tagish Lake',
    coordinates: {lat: 60.28, lng: -134.35},
    description:
      'One of the largest lakes in the Yukon, it has a complex coastline with numerous bays and islands. It is popular with fishermen and nature lovers. Due to its scale and remoteness, this place gives a feeling of the true wild North.',
    image: require('../../assets/i/yknwldexploroloc18.png'),
  },

  {
    id: 'heritage-dawson-city',
    category: 'Heritage',
    emoji: '🏛️',
    title: 'Dawson City',
    coordinates: {lat: 64.06, lng: -139.43},
    description:
      'A historic city that became the center of the Klondike Gold Rush. It has preserved wooden buildings, old saloons and streets that have hardly changed since the 19th century. Walking through the city, you can literally feel the atmosphere of the gold rush era and see what life was like in those days.',
    image: require('../../assets/i/yknwldexploroloc19.png'),
  },
  {
    id: 'heritage-ss-klondike',
    category: 'Heritage',
    emoji: '🏛️',
    title: 'SS Klondike National Historic Site',
    coordinates: {lat: 60.72, lng: -135.05},
    description:
      'This is a historic steamship that was used to transport goods on the Yukon River. Today it is a museum where you can learn about transportation and trade during the gold rush. The ship is well preserved and gives an idea of ​​​​life on the water in the past.',
    image: require('../../assets/i/yknwldexploroloc20.png'),
  },
  {
    id: 'heritage-klondike-gold-fields',
    category: 'Heritage',
    emoji: '🏛️',
    title: 'Klondike Gold Fields',
    coordinates: {lat: 64.0, lng: -139.2},
    description:
      'The area where gold was discovered, which caused a mass migration of people to the Yukon. Here you can still see the remains of old mines, equipment and even try your hand at being a gold prospector. This place is of great historical importance for all of Canada.',
    image: require('../../assets/i/yknwldexploroloc21.png'),
  },
  {
    id: 'heritage-old-crow',
    category: 'Heritage',
    emoji: '🏛️',
    title: 'Old Crow',
    coordinates: {lat: 67.57, lng: -139.83},
    description:
      'One of the most remote settlements in the Yukon, which preserves the traditions of indigenous peoples. This place has no road connection and is only accessible by plane. Here you can learn more about the culture, lifestyle and history of local communities.',
    image: require('../../assets/i/yknwldexploroloc22.png'),
  },
  {
    id: 'heritage-forty-mile',
    category: 'Heritage',
    emoji: '🏛️',
    title: 'Forty Mile Historic Site',
    coordinates: {lat: 64.39, lng: -140.17},
    description:
      'This is the oldest permanent settlement of non-indigenous people in the Yukon. It was an important trading post before the gold rush. Today it is a historical site that demonstrates the early development of the region.',
    image: require('../../assets/i/yknwldexploroloc23.png'),
  },
  {
    id: 'heritage-dredge-no-4',
    category: 'Heritage',
    emoji: '🏛️',
    title: 'Dredge No. 4',
    coordinates: {lat: 64.05, lng: -139.42},
    description:
      'One of the largest gold mining machines in the world, used for gold mining. This massive structure has survived to this day and is a popular tourist attraction. It shows the scale of the industry and technology of the time.',
    image: require('../../assets/i/yknwldexploroloc24.png'),
  },

  {
    id: 'winter-mount-sima',
    category: 'Winter',
    emoji: '❄️',
    title: 'Mount Sima Ski Resort',
    coordinates: {lat: 60.6, lng: -135.02},
    description:
      'A major ski resort near Whitehorse, offering trails for all skill levels. In winter, it is a popular destination for skiers and snowboarders, as well as those who want to spend their time actively among the snow-capped mountains. The resort has modern infrastructure and magnificent views.',
    image: require('../../assets/i/yknwldexploroloc25.png'),
  },
  {
    id: 'winter-fish-lake',
    category: 'Winter',
    emoji: '❄️',
    title: 'Fish Lake',
    coordinates: {lat: 60.63, lng: -135.17},
    description:
      'In winter, this lake turns into a snowy plain, ideal for quiet walks, photography and nature observation. Here you can often see animal tracks, as well as enjoy the silence and clean air away from the city noise.',
    image: require('../../assets/i/yknwldexploroloc26.png'),
  },
  {
    id: 'winter-takhini-hot-springs',
    category: 'Winter',
    emoji: '❄️',
    title: 'Takhini Hot Springs',
    coordinates: {lat: 60.87, lng: -135.37},
    description:
      'One of the most popular winter destinations in the Yukon. Hot springs allow you to relax even in very low temperatures. Swimming in warm water under the open sky, when there is snow all around, creates a unique and unforgettable experience.',
    image: require('../../assets/i/yknwldexploroloc27.png'),
  },
  {
    id: 'winter-yukon-wildlife-preserve',
    category: 'Winter',
    emoji: '❄️',
    title: 'Yukon Wildlife Preserve',
    coordinates: {lat: 60.89, lng: -135.2},
    description:
      'This is a nature reserve where you can see local animals in winter conditions. Moose, bison, wolves and other species live here. In winter, the area looks especially atmospheric, and visitors can explore it on foot or by special transport.',
    image: require('../../assets/i/yknwldexploroloc28.png'),
  },
  {
    id: 'winter-dempster-highway',
    category: 'Winter',
    emoji: '❄️',
    title: 'Dempster Highway',
    coordinates: {lat: 64.0, lng: -138.5},
    description:
      'This road becomes a real adventure in winter. It passes through snowy expanses, tundra and mountains. It is a popular route for trips by car or snowmobile, where you can see wildlife and feel the scale of the northern territories.',
    image: require('../../assets/i/yknwldexploroloc29.png'),
  },
  {
    id: 'winter-carcross-desert',
    category: 'Winter',
    emoji: '❄️',
    title: 'Carcross Desert',
    coordinates: {lat: 60.17, lng: -134.7},
    description:
      'The smallest desert in the world is covered in snow in winter, creating an unusual contrast. This place attracts tourists with its uniqueness, because the combination of sand and snow looks very rare and photogenic.',
    image: require('../../assets/i/yknwldexploroloc30.png'),
  },
];

export function yknwldexplorerguidGetPlaceById(
  yknwldexplorerguidId: string,
): YknwldexplorerguidPlace | undefined {
  return yknwldexplorerguidPlaces.find(p => p.id === yknwldexplorerguidId);
}
