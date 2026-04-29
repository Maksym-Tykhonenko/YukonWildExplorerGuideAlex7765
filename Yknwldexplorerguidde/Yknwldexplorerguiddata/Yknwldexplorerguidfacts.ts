export type YknwldexplorerguidFactsCategory = 'Nature' | 'Life' | 'History';

export type YknwldexplorerguidFact = {
  id: string;
  category: YknwldexplorerguidFactsCategory;
  title: string;
  body: string;
};

export const yknwldexplorerguidFacts: YknwldexplorerguidFact[] = [
  // Nature
  {
    id: 'nature-aurora-nights',
    category: 'Nature',
    title: 'Aurora Nights',
    body:
      'The Northern Lights can be seen very often in the Yukon - up to 240 nights a year. Thanks to minimal light pollution and clean air, the sky here is extremely dark, allowing you to see bright waves of green, purple and even red light. This makes the Yukon one of the best places in the world to observe this natural phenomenon.',
  },
  {
    id: 'nature-extreme-cold',
    category: 'Nature',
    title: 'Extreme Cold',
    body:
      "Winter in the Yukon is very harsh: temperatures often drop to -40°C and even lower. Such conditions affect nature, animals and people's lifestyles. Due to the cold, rivers can freeze completely, and the air becomes so dry that sound travels differently.",
  },
  {
    id: 'nature-giant-glaciers',
    category: 'Nature',
    title: 'Giant Glaciers',
    body:
      'The Yukon is home to huge glaciers that cover thousands of square kilometers. They slowly move, changing the landscape and forming valleys. Some of them are part of the largest ice massif outside the polar regions.',
  },
  {
    id: 'nature-midnight-sun',
    category: 'Nature',
    title: 'Midnight Sun',
    body:
      "In the summer, the sun hardly sets over the horizon, especially in June. This means very long days, when the light lasts until late at night. This effect affects people's biorhythms and allows them to spend more time in nature.",
  },
  {
    id: 'nature-wild-rivers',
    category: 'Nature',
    title: 'Wild Rivers',
    body:
      'The Yukon rivers are considered some of the wildest and cleanest in North America. They pass through remote areas without cities and industry, which preserves their natural state. They are ideal places for adventure and nature observation.',
  },
  {
    id: 'nature-vast-forests',
    category: 'Nature',
    title: 'Vast Forests',
    body:
      'The Yukon territory is covered with vast forests that stretch for hundreds of kilometers. Here you can find taiga with coniferous trees, which is home to many species of animals and birds.',
  },
  {
    id: 'nature-wildlife-habitat',
    category: 'Nature',
    title: 'Wildlife Habitat',
    body:
      'Yukon is home to a large number of wildlife, including bears, moose, wolves and caribou. Due to the small population, nature here has been preserved in almost its original form.',
  },
  {
    id: 'nature-clean-air',
    category: 'Nature',
    title: 'Clean Air',
    body:
      'The air in Yukon is considered one of the cleanest in the world. The absence of large cities and factories allows the natural quality of the atmosphere to be preserved.',
  },
  {
    id: 'nature-frozen-lakes',
    category: 'Nature',
    title: 'Frozen Lakes',
    body:
      'In winter, the lakes completely freeze and can withstand the weight of transport. This creates unique routes for travel and outdoor activities.',
  },
  {
    id: 'nature-seasonal-contrast',
    category: 'Nature',
    title: 'Seasonal Contrast',
    body:
      'The contrast between the seasons in Yukon is very strong: short warm summers are replaced by long cold winters. This forms a special ecosystem and rhythm of life.',
  },

  // Life
  {
    id: 'life-small-population',
    category: 'Life',
    title: 'Small Population',
    body:
      'Yukon has a very small population — fewer people live here than in many cities. Most residents are concentrated in one city, while the rest of the territory is almost uninhabited. This creates a feeling of spaciousness and isolation.',
  },
  {
    id: 'life-remote-living',
    category: 'Life',
    title: 'Remote Living',
    body:
      'Living in the Yukon often means being far from other settlements. Some people live in places that can only be reached by plane or special roads.',
  },
  {
    id: 'life-strong-community',
    category: 'Life',
    title: 'Strong Community',
    body:
      'Despite the small number of people, the communities here are very friendly and close-knit. People often help each other, especially in difficult weather conditions.',
  },
  {
    id: 'life-indigenous-culture',
    category: 'Life',
    title: 'Indigenous Culture',
    body:
      'Yukon is home to indigenous peoples who have a rich culture, traditions, and history. Their knowledge of nature is passed down from generation to generation.',
  },
  {
    id: 'life-winter-lifestyle',
    category: 'Life',
    title: 'Winter Lifestyle',
    body:
      'In winter, life adapts to the cold: people use special clothing, equipment, and transportation. It is part of their daily routine.',
  },
  {
    id: 'life-unique-transport',
    category: 'Life',
    title: 'Unique Transport',
    body:
      'Yukon often uses unusual forms of transport, such as dog sledding or snowmobiling. They are especially important in the winter.',
  },
  {
    id: 'life-high-cost-living',
    category: 'Life',
    title: 'High Cost Living',
    body:
      'Due to the remoteness, prices for goods can be significantly higher. Many products are delivered from far away, which affects their cost.',
  },
  {
    id: 'life-nature-first',
    category: 'Life',
    title: 'Nature First',
    body:
      'People here are closely connected to nature. Hunting, fishing and outdoor activities are an important part of life.',
  },
  {
    id: 'life-long-winters',
    category: 'Life',
    title: 'Long Winters',
    body:
      'Winter lasts most of the year, so residents are accustomed to darkness and cold. This forms a special way of thinking and endurance.',
  },
  {
    id: 'life-quiet-lifestyle',
    category: 'Life',
    title: 'Quiet Lifestyle',
    body:
      'Life in Yukon is calm and slow. There is no big city noise here, which makes the region ideal for those looking for silence.',
  },

  // History
  {
    id: 'history-gold-rush-era',
    category: 'History',
    title: 'Gold Rush Era',
    body:
      'Yukon became famous throughout the world during the gold rush in the late 19th century. Thousands of people came here in search of wealth.',
  },
  {
    id: 'history-klondike-discovery',
    category: 'History',
    title: 'Klondike Discovery',
    body:
      'Gold was found in the Klondike region, which caused a mass migration of prospectors. This changed the history of the territory.',
  },
  {
    id: 'history-boomtowns-rise',
    category: 'History',
    title: 'Boomtowns Rise',
    body:
      'Cities grew rapidly due to the influx of people. Some of them became important centers of trade and life.',
  },
  {
    id: 'history-harsh-journey',
    category: 'History',
    title: 'Harsh Journey',
    body:
      'The path to the Yukon was very difficult and dangerous. People passed through mountains, cold and lack of resources.',
  },
  {
    id: 'history-old-trails',
    category: 'History',
    title: 'Old Trails',
    body:
      'The old gold rush routes still exist and are popular tourist destinations.',
  },
  {
    id: 'history-historic-buildings',
    category: 'History',
    title: 'Historic Buildings',
    body:
      'Some cities have preserved buildings from those times. They allow you to feel the atmosphere of the past.',
  },
  {
    id: 'history-river-routes',
    category: 'History',
    title: 'River Routes',
    body:
      'Rivers were used as the main transport routes for transporting people and resources.',
  },
  {
    id: 'history-mining-legacy',
    category: 'History',
    title: 'Mining Legacy',
    body:
      'Gold mining left its mark on the nature and economy of the region. Some mines are still operating today.',
  },
  {
    id: 'history-cultural-shift',
    category: 'History',
    title: 'Cultural Shift',
    body:
      'The Gold Rush changed the lives of Indigenous peoples and influenced their culture.',
  },
  {
    id: 'history-preserved-history',
    category: 'History',
    title: 'Preserved History',
    body:
      'Today, the Yukon preserves its history through museums, festivals, and tourist attractions.',
  },
];
