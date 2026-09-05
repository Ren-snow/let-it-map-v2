/**
 * Development seed data.
 *
 * Places are real, so the map, Street View and Directions all behave like they
 * do in production. Coordinates are accurate to a few metres — good enough for
 * pins, and the seeder replaces them with exact values whenever the Places API
 * resolves the query.
 */

export type SeedPlace = {
  slug: string;
  query: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type SeedUser = {
  slug: string;
  name: string;
  email: string;
  image: string;
};

export type SeedPost = {
  place: string; // SeedPlace.slug
  author: string; // SeedUser.slug
  title: string;
  description: string;
  daysAgo: number;
};

export const SEED_USERS: SeedUser[] = [
  {
    slug: "ren",
    name: "Ren",
    email: "ren@seed.local",
    image: "https://i.pravatar.cc/160?u=ren",
  },
  {
    slug: "paul",
    name: "Paul H.",
    email: "paul@seed.local",
    image: "https://i.pravatar.cc/160?u=paul",
  },
  {
    slug: "george",
    name: "George T.",
    email: "george@seed.local",
    image: "https://i.pravatar.cc/160?u=george",
  },
  {
    slug: "ringo",
    name: "Ringo S.",
    email: "ringo@seed.local",
    image: "https://i.pravatar.cc/160?u=ringo",
  },
];

export const SEED_PLACES: SeedPlace[] = [
  {
    slug: "abbey-road",
    query: "Abbey Road Studios, London",
    name: "Abbey Road Studios",
    address: "3 Abbey Rd, London NW8 9AY, United Kingdom",
    latitude: 51.5319,
    longitude: -0.1777,
  },
  {
    slug: "savile-row",
    query: "3 Savile Row, London",
    name: "3 Savile Row",
    address: "3 Savile Row, London W1S 3PB, United Kingdom",
    latitude: 51.5119,
    longitude: -0.1414,
  },
  {
    slug: "cavern-club",
    query: "The Cavern Club, Liverpool",
    name: "The Cavern Club",
    address: "10 Mathew St, Liverpool L2 6RE, United Kingdom",
    latitude: 53.4048,
    longitude: -2.9873,
  },
  {
    slug: "strawberry-field",
    query: "Strawberry Field, Liverpool",
    name: "Strawberry Field",
    address: "Beaconsfield Rd, Liverpool L25 6EJ, United Kingdom",
    latitude: 53.3806,
    longitude: -2.8964,
  },
  {
    slug: "penny-lane",
    query: "Penny Lane, Liverpool",
    name: "Penny Lane",
    address: "Penny Ln, Liverpool L18, United Kingdom",
    latitude: 53.3899,
    longitude: -2.9199,
  },
  {
    slug: "mendips",
    query: "Mendips, 251 Menlove Avenue, Liverpool",
    name: "Mendips",
    address: "251 Menlove Ave, Liverpool L25 7SA, United Kingdom",
    latitude: 53.3762,
    longitude: -2.8967,
  },
  {
    slug: "beatles-story",
    query: "The Beatles Story, Albert Dock, Liverpool",
    name: "The Beatles Story",
    address: "Britannia Vaults, Royal Albert Dock, Liverpool L3 4AD, United Kingdom",
    latitude: 53.3999,
    longitude: -2.993,
  },
  {
    slug: "indra-club",
    query: "Indra Club, Hamburg",
    name: "Indra Club",
    address: "Große Freiheit 64, 22767 Hamburg, Germany",
    latitude: 53.5514,
    longitude: 9.9585,
  },
  {
    slug: "budokan",
    query: "Nippon Budokan, Tokyo",
    name: "Nippon Budokan",
    address: "2 Chome-3 Kitanomarukoen, Chiyoda City, Tokyo 102-8321, Japan",
    latitude: 35.6933,
    longitude: 139.7499,
  },
  {
    slug: "strawberry-fields-nyc",
    query: "Strawberry Fields, Central Park, New York",
    name: "Strawberry Fields",
    address: "Central Park West & 72nd St, New York, NY 10023, United States",
    latitude: 40.7756,
    longitude: -73.9761,
  },
  {
    slug: "the-dakota",
    query: "The Dakota, New York",
    name: "The Dakota",
    address: "1 W 72nd St, New York, NY 10023, United States",
    latitude: 40.7765,
    longitude: -73.9762,
  },
  {
    slug: "beatles-ashram",
    query: "Beatles Ashram, Rishikesh",
    name: "Beatles Ashram",
    address: "Swarg Ashram, Rishikesh, Uttarakhand 249304, India",
    latitude: 30.1063,
    longitude: 78.3222,
  },
];

export const SEED_POSTS: SeedPost[] = [
  {
    place: "abbey-road",
    author: "ren",
    title: "Walked the crossing at 7am",
    description:
      "Got here before the tour buses. Two other people waiting, and we took turns photographing each other. The drivers are unbelievably patient about it.",
    daysAgo: 3,
  },
  {
    place: "abbey-road",
    author: "paul",
    title: "The wall is repainted every few months",
    description:
      "Every message you see has been written over something else. I left mine near the gate and came back a year later — completely gone.",
    daysAgo: 21,
  },
  {
    place: "abbey-road",
    author: "george",
    title: "The studio shop is worth the detour",
    description:
      "You cannot get inside the studios, but the shop next door sells pressings you will not find anywhere else. Small, and closes earlier than you expect.",
    daysAgo: 47,
  },
  {
    place: "savile-row",
    author: "ren",
    title: "The rooftop is still up there",
    description:
      "It is an ordinary shopfront now and nothing marks it. Stand across the street and look up — the roofline is exactly the one from the film.",
    daysAgo: 9,
  },
  {
    place: "savile-row",
    author: "ringo",
    title: "Go on a weekday",
    description:
      "The whole street is tailors, so it is dead on Sundays and the shutters are down. Weekday lunchtime it actually feels like a working street.",
    daysAgo: 63,
  },
  {
    place: "cavern-club",
    author: "paul",
    title: "The stairs are steeper than they look",
    description:
      "It is a rebuild a few doors from the original site, but going down into that brick cellar still does something. Live music from midday.",
    daysAgo: 5,
  },
  {
    place: "cavern-club",
    author: "george",
    title: "Mathew Street at night is a different place",
    description:
      "Quiet and almost reverent in the afternoon. After 9pm it is a full street party. Pick your version.",
    daysAgo: 34,
  },
  {
    place: "cavern-club",
    author: "ren",
    title: "Free entry before the evening sets",
    description:
      "Turned up around 3pm on a Tuesday, walked straight in, no cover. A guy was playing to about eleven people and it was perfect.",
    daysAgo: 72,
  },
  {
    place: "strawberry-field",
    author: "george",
    title: "The red gates are a replica",
    description:
      "The originals are inside the visitor centre to stop them being stolen. Slightly deflating to learn, then you see the real ones and it is fine.",
    daysAgo: 12,
  },
  {
    place: "strawberry-field",
    author: "ringo",
    title: "Book the exhibition ahead",
    description:
      "The garden is free to wander but the exhibition sells out on weekends. Half an hour is enough unless you read every panel.",
    daysAgo: 55,
  },
  {
    place: "penny-lane",
    author: "ren",
    title: "The street sign keeps getting stolen",
    description:
      "They gave up on the metal one and painted the name straight onto the wall. The barber shop from the lyric is still there and still cutting hair.",
    daysAgo: 17,
  },
  {
    place: "penny-lane",
    author: "paul",
    title: "The roundabout is the shelter",
    description:
      "The shelter in the middle of the roundabout is a cafe now. Easy to walk past without realising what you are looking at.",
    daysAgo: 88,
  },
  {
    place: "mendips",
    author: "george",
    title: "Only reachable on the National Trust tour",
    description:
      "You cannot just turn up — it is a minibus tour that also covers 20 Forthlin Road. No photographs inside, which honestly helps you pay attention.",
    daysAgo: 26,
  },
  {
    place: "beatles-story",
    author: "ringo",
    title: "Better than I expected",
    description:
      "Braced myself for a tourist trap and got a genuinely well made exhibition. The Hamburg section is the strongest part.",
    daysAgo: 40,
  },
  {
    place: "beatles-story",
    author: "ren",
    title: "Two hours, plus the dock",
    description:
      "Allow two hours inside and then stay for the Albert Dock itself. The waterfront at sunset is the reason to time it late.",
    daysAgo: 95,
  },
  {
    place: "indra-club",
    author: "paul",
    title: "Still a working music venue",
    description:
      "Tiny, loud, and completely unbothered by its own history. There is a small plaque and that is the extent of the ceremony.",
    daysAgo: 14,
  },
  {
    place: "indra-club",
    author: "george",
    title: "Große Freiheit has not calmed down",
    description:
      "The street is exactly as advertised. Go with someone, go late, and the atmosphere explains a lot about those Hamburg years.",
    daysAgo: 68,
  },
  {
    place: "budokan",
    author: "ringo",
    title: "Walked a full lap of the outside",
    description:
      "No event on, so the hall was shut, but the walk around Kitanomaru Park is the good part anyway. The octagonal roof is unmistakable.",
    daysAgo: 7,
  },
  {
    place: "budokan",
    author: "ren",
    title: "Cherry blossom season is chaos",
    description:
      "Chidorigafuchi is right there, so early April the whole approach is packed. Beautiful, but give yourself an extra hour.",
    daysAgo: 51,
  },
  {
    place: "strawberry-fields-nyc",
    author: "paul",
    title: "Someone is always playing",
    description:
      "There is a musician at the Imagine mosaic almost every day. Locals bring flowers and arrange them into the letters.",
    daysAgo: 19,
  },
  {
    place: "strawberry-fields-nyc",
    author: "george",
    title: "Enter from West 72nd",
    description:
      "It is a two minute walk from the park entrance at 72nd. Early morning you can have the mosaic to yourself for about a minute.",
    daysAgo: 77,
  },
  {
    place: "the-dakota",
    author: "ringo",
    title: "It is a private building",
    description:
      "People live here. Look at the archway from the pavement, take your photo, and do not linger by the entrance.",
    daysAgo: 29,
  },
  {
    place: "beatles-ashram",
    author: "ren",
    title: "The murals make the visit",
    description:
      "The buildings are ruins reclaimed by the forest, and artists have covered the meditation huts in murals. Nothing else feels like it.",
    daysAgo: 36,
  },
  {
    place: "beatles-ashram",
    author: "paul",
    title: "Small entry fee, bring cash",
    description:
      "Inside Rajaji National Park, so there is a ticket counter and it is cash only. Two hours if you want to find every dome.",
    daysAgo: 82,
  },
  {
    place: "beatles-ashram",
    author: "george",
    title: "Go early, it gets hot",
    description:
      "Very little shade once you are wandering between the huts. We started at opening and were finished before the worst of the heat.",
    daysAgo: 110,
  },
];
