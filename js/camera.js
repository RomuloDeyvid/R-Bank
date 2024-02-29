const botaoIniciarCamera = document.querySelector('[data-video-botao]')
const campoCamera = document.querySelector('[data-camera]')
const video  = document.querySelector('[data-video]')
const botaoTirarFoto  = document.querySelector('[data-tirar-foto]')
const mensagem = document.querySelector('[data-mensagem]')
const canvas = document.querySelector('[data-video-canvas]')
let imagemURL = ''
const botaoEnviarFoto = document.querySelector('[data-enviar]')

//Ao clicar na imagem para reconhecimento facial ele vai pedir premissão a usuário pra usar a câmera
botaoIniciarCamera.addEventListener('click', async function (){
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
    botaoIniciarCamera.style.display = 'none'
    campoCamera.style.display = 'block'

    video.srcObject = iniciarVideo
})

//Ao clicar no botão de tirar a foto, ele vai tirar a foto e desenha-la no lugar onde estava a câmera
botaoTirarFoto.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
    imagemURL = canvas.toDataURL('image/jpeg')
    campoCamera.style.display = 'none'
    mensagem.style.display = 'block'
})

//Ao clicar no botão de criar conta, vai ser enviado a foto que foi tirada pro localStorage e transfferir a tela pra página de cadastro finalizada
botaoEnviarFoto.addEventListener('click', ()=> {
    const receberDadosExistentes = localStorage.getItem('cadastro')
    const converterRetorno = JSON.parse(receberDadosExistentes)

    converterRetorno.imagem = imagemURL

    localStorage.setItem('cadastro', JSON.stringify(converterRetorno))
    window.location.href = '../pages/abrir-conta-form-3.html'
})