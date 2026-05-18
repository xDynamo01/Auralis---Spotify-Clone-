export const demoUser = {
  id: 'auralis-demo',
  displayName: 'Auralis Demo',
  email: 'demo@auralis.local',
  image: '/assets/Auralis-logo.png',
  country: 'BR',
  product: 'preview'
};

export const demoProfile = {
  ...demoUser,
  followers: 1284
};

export const demoTracks = [
  {
    id: 'track-demo-01',
    name: 'Neon Pulse',
    artists: ['Auralis Signal'],
    album: 'Night Grid',
    image: '/assets/album-hit-me.jpg',
    durationMs: 214000,
    previewUrl: null,
    externalUrl: null
  },
  {
    id: 'track-demo-02',
    name: 'Ciano Sobre Preto',
    artists: ['Noite Clara'],
    album: 'Minimal Waves',
    image: '/assets/album-caju.jpg',
    durationMs: 188000,
    previewUrl: null,
    externalUrl: null
  },
  {
    id: 'track-demo-03',
    name: 'Low Light Session',
    artists: ['Orbit Room'],
    album: 'After Hours',
    image: '/assets/album-white-noise.jpg',
    durationMs: 241000,
    previewUrl: null,
    externalUrl: null
  },
  {
    id: 'track-demo-04',
    name: 'Echo de Vidro',
    artists: ['Linha Norte'],
    album: 'Reflexo',
    image: '/assets/album-escandalo.jpg',
    durationMs: 205000,
    previewUrl: null,
    externalUrl: null
  }
];

export const demoPlaylists = [
  {
    id: 'playlist-demo-01',
    name: 'Auralis Focus',
    description: 'Batidas frias, textura limpa e energia para codar sem ruído.',
    image: '/assets/cyberground.gif',
    tracksTotal: demoTracks.length,
    owner: 'Auralis',
    externalUrl: null,
    tracks: demoTracks
  },
  {
    id: 'playlist-demo-02',
    name: 'Midnight Interface',
    description: 'Um recorte escuro e minimalista para testar cards e estados.',
    image: '/assets/background GIF.gif',
    tracksTotal: 3,
    owner: 'Auralis',
    externalUrl: null,
    tracks: demoTracks.slice(1)
  },
  {
    id: 'playlist-demo-03',
    name: 'Legacy Reworked',
    description: 'Assets do projeto original reaproveitados em uma UI nova.',
    image: '/assets/Auralis-name-logo.png',
    tracksTotal: 4,
    owner: 'Auralis',
    externalUrl: null,
    tracks: demoTracks
  }
];
