const img = document.querySelector('.imagem');

async function buscarImagens(){
   const link = 'https://joao11092005.github.io/teste-json/filme.json';
   const resultado = await fetch(link)
   const fomatacao = await resultado.json()

   img.src = await fomatacao['Imagems'][4];
}

buscarImagens()


setTimeout(() => {
   img.style.display = "none";
   const sumirVideo = document.querySelector(".video.sumir")
   sumirVideo.classList.remove('sumir')
}, 7000)
