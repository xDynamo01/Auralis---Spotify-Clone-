document.addEventListener('DOMContentLoaded', () => {

    const artistData = [
        { name: 'Henrique & Juliano', Image: './assets/artista-henrique-juliano.jpg' },
        { name: 'Jorge & Mateus', Image: './assets/artista-jorge-mateus.jpg' },
        { name: 'Zé Neto & Cristiano', Image: './assets/artista-ze-neto.jpg' },
        { name: 'Gutavo Lima', Image: './assets/artista-gustavo-limma.jpg' },
        { name: 'Luan Santana', Image: './assets/artista-luan-santana.jpg' },
        { name: 'Mateus & Kauan', Image: './assets/artista-mateus-kauan.jpg' }
    ];

    const albumsData = [
        { name: 'white Noise (Sleep & Relaxation Sounds)', artist: 'Sleepy John', Image: './assets/album-white-noise.jpg' },
        { name: 'O Céu Explica Tudo (ao Vivo)', artist: 'Henrique & Juliano', Image: './assets/album-ceu-explica.jpg' },
        { name: 'Nada como um dia após o outro', artist: 'Racionais', Image: './assets/album-vida-loka.jpg' },
        { name: 'HIT ME HARD AND SOFT', artist: 'Billie Eilish', Image: './assets/album-hit-me.jpg' },
        { name: 'CAJU', artist: 'Liniker', Image: './assets/album-caju.jpg' },
        { name: 'Escândalo Íntimo', artist: 'Luísa Sonza', Image: './assets/album-escandalo.jpg' },
    ];


    const artistGrid = document.querySelector('.artists-grid')
    const albumsGrid = document.querySelector('.albums-grid')

    artistData.forEach(artist => {
        const artistCard = document.createElement('div')
        artistCard.classList.add('artist-card')

        artistCard.innerHTML = `
          <img src="${artist.Image}" 
          <h3>${artist.name}</h3>
          <p>artista</p>
        `

        artistGrid.appendChild(artistCard)

    })

        albumsData.forEach(album => {
        const albumCard = document.createElement('div')
        albumCard.classList.add('album-card')

        albumCard.innerHTML = `
          <img src="${album.Image}" 
          <h3>${album.name}</h3>
          <p>${album.artist}</p>
        `

        albumsGrid.appendChild(albumCard)

    })



})

