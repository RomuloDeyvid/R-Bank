import eUmCPF from "./verifica-cpf.js"
import eMaiorDeIdade from "./validade-idade.js"
const camposDoFormulario = document.querySelectorAll("[required]")
const formulario = document.querySelector("[data-formulario]")

formulario.addEventListener("submit", (e) =>{
    e.preventDefault()
    const listaResposta = {
        "nome": e.target.elements["nome"].value,
        "cpf": e.target.elements["cpf"].value,
        "rg": e.target.elements["rg"].value,
        "email": e.target.elements["email"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("Cadastro", JSON.stringify(listaResposta))

    window.location.href = '../pages/abrir-conta-form-2.html'
})

camposDoFormulario.forEach((campo) =>{
    campo.addEventListener("blur", ()=> verificaCampo(campo))
    campo.addEventListener("invalid", evento => evento.preventDefault())
})

const tiposDeErros = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo){
    let mensagem = ''

    campo.setCustomValidity('') //Retira a mensagem de erro ao consertar o cpf

    //Faz a verificação de qual o nome do campo para poder seguir com as validações expecificas de cada um
    if(campo.name == "cpf" && campo.value.length >= 11){
        eUmCPF(campo)
    }if (campo.name == "aniversario" && campo.value != ""){
        eMaiorDeIdade(campo)
    }

    //Passa por todos os tipos de erros e verifica se esses erros estão presente no campo, se estiver faz a impressão na tela com a mensagem customizada pra cada erro
    tiposDeErros.forEach(erro => {
        if(campo.validity[erro]){
            mensagem = mensagens[campo.name][erro]
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro')
    const validadorInput = campo.checkValidity()

    if(!validadorInput){
        mensagemErro.textContent = mensagem
    }else{
        mensagemErro.textContent = ''
    }

}