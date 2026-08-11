// Selecionar a Seção about
const about = document.querySelector("#about")

// Selecionar a Seção Projects
const swiperWrapper = document.querySelector(".swiper-wrapper")

// Formulário
const formulario = document.querySelector('#formulario')
 
// Expressão Regular de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

//Função para construir a seção about
async function getAboutGithub(){
    try{

        const resposta = await fetch('https://api.github.com/users/quelbarch')

        const perfil = await resposta.json()

        about.innerHTML = ''

        about.innerHTML = `

          <!-- Imagem da seção About -->
            <figure class="about-image">
                <img 
                 src="${perfil.avatar_url}"
                 alt= "${perfil.name}"
                >
            </figure>

            <!-- Conteúdo da seção About -->
            <article class="about-content">
                <h2>Sobre mim</h2>
                <p>
                 Olá! Sou a Raquel Barcheta, desenvolvedora Java Full Stack em formação e graduanda em Análise e Desenvolvimento de Sistemas.
                 Minha paixão por tecnologia começou ainda na escola, quando tive meu primeiro contato com lógica de programação e robótica. Desde os 15 anos, construí uma trajetória profissional diversa — atuando em áreas administrativas, financeiras e de logística.
                 Essa bagagem me deu uma visão prática sobre negócios, além de habilidades sólidas em comunicação, organização e resolução de problemas complexos.
                 Hoje, uno essa experiência à prática técnica intensiva do bootcamp da Generation Brasil e à faculdade, desenvolvendo soluções completas do backend ao frontend com Java, Spring Boot, SQL, HTML, CSS, JavaScript e React.
                 Busco minha primeira oportunidade na área de Tecnologia para aplicar meu conhecimento, evoluir continuamente e gerar impacto real em equipe.
                </p>

                <!-- Links (GitHub, Currículo e Dados do GitHub) -->
                <div class="about-buttons-data">

                    <!-- Links -->
                    <div class="buttons-container">
                        <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
                        <a href="#" target="_blank" class="botao-outline">Currículo</a>
                    </div>

                    <!-- Dados - Repositório GitHub -->
                    <div class="data-container">

                        <!-- Número de seguidores -->
                        <div class="data-item">
                            <span class="data-number">${perfil.followers}</span>
                            <span class="data-label">Seguidores</span>
                        </div>

                        <!-- Número de repositórios -->
                        <div class="data-item">
                            <span class="data-number">${perfil.public_repos}</span>
                            <span class="data-label">Repositórios</span>
                        </div>

                    </div>

                </div>

            </article>

        `

    }catch(error){
        console.error("Erro ao buscar dados no GitHub", error)
    }
}

//Função para construção do carrossel com o Swipper
async function getProjectsGitHub() {
    try{

        const resposta = await fetch('https://api.github.com/users/quelbarch/repos?sort=update&per_page=6')

        const repositorios = await resposta.json()

        swiperWrapper.innerHTML = ''

        // Ícones das linguagens
        const linguagens = {
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'Python': 'python',
            'Java': 'java',
            'HTML': 'html',
            'CSS': 'css',
            'PHP': 'php',
            'C#': 'csharp',
            'Go': 'go',
            'Kotlin': 'kotlin',
            'Swift': 'swift',
            'C': 'c',
            'C++': 'c_plus',
            'GitHub': 'github',
        }

        repositorios.forEach( (repositorio) => {

            //Seleciona o nome da linguagem padrão do repositório
            const linguagem = repositorio.language || 'GitHub'

            //Seleciona o ícone da linguagem padrão
            const icone = linguagens[linguagem] ?? linguagens['GitHub']

            //Construir o link do ícone
            const urlIcone = `./assets/icons/languages/${icone}.svg`

            // Formata o Nome do Repositório
            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ') // Substitui hifens e underlines por espaços em branco
                .replace(/[^a-zA-Z0-9\s]/g, '') // Remove Caracteres especiais
                .replace(/\s+t[a-z0-9]+$/i, '') // Remove a identificação de turma
                .toUpperCase() // Converte a string em letras maiúsculas

            // Função para truncar texto
            const truncar = (texto, limite) => texto.length > limite
                ? texto.substring(0, limite) + '...'
                : texto

            const descricao = repositorio.description
              ? truncar(repositorio.description, 100)
              : 'Projeto desenvolvido no GitHub'
            
            // tags
            const tags = repositorio.topics?.length > 0
              ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
              : `<span class="tag">${linguagem}</span>`

            //Cria o botao Deploy
            const botaoDeploy = repositorio.homepage
              ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
              : ''

            // Botões de ação
            const botoesAcao = `
                <div class="project-buttons">
                    <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
                        GitHub
                    </a>
                    ${botaoDeploy}
                </div>
            `

            // Constrói o Card
            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <article class="project-card">

                        <!-- Ícone da Tecnologia padrão do projeto -->
                        <figure class="project-image">
                            <img src="${urlIcone}"
                                 alt="Ícone - ${linguagem} - Linguagem principal do projeto"
                            >
                        </figure>

                        <!-- Conteúdo do Projeto -->
                        <div class="project-content">
                            <h3>${nomeFormatado}</h3>
                            <p>${descricao}</p>

                            <!-- Tags do Projeto -->
                            <div class="project-tags">
                                ${tags}
                            </div>

                            ${botoesAcao}
                        </div>

                    </article>
                </div>
            `
        })

        iniciarSwiper()
        

    }catch (error){
        console.error("Erro ao buscar os dados dos projetos no GitHub", error)
    }
}

// Função para inicializar o carrossel do Swiper
function iniciarSwiper() {
  new Swiper('.projects-swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 24,
    centeredSlides: false,
    loop: true,
    watchOverflow: true,

    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 40,
        centeredSlides: false,
      },
      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 40,
        centeredSlides: false,
      },
      1025: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 54,
        centeredSlides: false,
      },
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },

    grabCursor: true,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
  })
}

formulario.addEventListener('submit', function (event) {
	event.preventDefault()
 
	document
		.querySelectorAll('form span')
		.forEach((span) => (span.innerHTML = ''))
 
	let isValid = true
 
	const nome = document.querySelector('#nome')
	const erroNome = document.querySelector('#erro-nome')
 
	if (nome.value.trim().length < 3) {
		erroNome.innerHTML = 'O nome deve ter no mínimo 3 caracteres'
		if (isValid) nome.focus()
		isValid = false
	}
 
	const email = document.querySelector('#email')
	const erroEmail = document.querySelector('#erro-email')
 
	if (!email.value.trim().match(emailRegex)) {
		erroEmail.innerHTML = 'Digite um endereço de e-mail válido'
		if (isValid) email.focus()
		isValid = false
	}
 
	const assunto = document.querySelector('#assunto')
	const erroAssunto = document.querySelector('#erro-assunto')
 
	if (assunto.value.trim().length < 5) {
		erroAssunto.innerHTML =
			'O assunto deve ter no mínimo 5 caracteres'
		if (isValid) assunto.focus()
		isValid = false
	}
 
	const mensagem = document.querySelector('#mensagem')
	const erroMensagem = document.querySelector('#erro-mensagem')
 
	if (mensagem.value.trim().length === 0) {
		erroMensagem.innerHTML = 'A mensagem não pode ser vazia'
		if (isValid) mensagem.focus()
		isValid = false
	}
 
	if (isValid) {
		const submitButton = formulario.querySelector(
			'button[type="submit"]',
		)
		submitButton.disabled = true
		submitButton.textContent = 'Enviando...'
 
		formulario.submit()
	}
})

getAboutGithub();
getProjectsGitHub();