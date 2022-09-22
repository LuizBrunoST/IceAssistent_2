// 19/09/2021 Luiz Bruno
window.addEventListener("load", olhar)

//#region function ao iniciar a janela
function olhar(){
    const ice = new Artyom()
    config = {
        lang: "pt-PT",
        continuous:true,//Sempre escutando
        listen:true,
        debug:true,//Imprimir no console.log
        speed:1,
    }
    ice.initialize(config)

    //############# Ice Assistent ##############

    /*
    if(window.location.hostname == "localhost"){
        ice.fatality()
    }else{
        ice.initialize(config)
    }
    */
    atulizar = {
        indexes: ['atualizar','atualizar página'],
        action: function(){
            ice.say("Ok!",{
                onStart: function(){
                    window.location.reload()
                }
            })
        }
    }
    ice.addCommands(atulizar)
    //#region PIADAS
    piadas = {
        indexes: ["Me conte uma piada", "piada"],
        action: function(){
            ice.sayRandom([
                "Sabe o que o limão disse para outro limão,? não conversa comigo hoje não que estou azedo! hahaha",
                "Por que a aranha é o animal mais carente do mundo? Porque ela é um aracneedyou. qui qui."
            ])
        }
    }
    ice.addCommands(piadas)
    //#endregion


    setInterval(function(){
        ice.sayRandom(["Configurações.","Sistemas Ok.","Aviso! Uma anomalia foi detectada."])
    },600000) //600000 10 Minutos


    //#region HORA ATUAL
    //------------ time horas
    time = {
        indexes: ["Que horas são", "Horário de brasília"],
        action:function(){
            data = new Date()
            horas = data.getHours()
            minutos = data.getMinutes()
            ice.say("São" + horas + " horas e " + minutos + " minutos.")
        }
    }
    ice.addCommands(time)
    //#endregion

    //#region DATA ATUAL
    //------------ dia
    dia = {
        indexes: ["Que dia é hoje", "Data de hoje", "Que dia da semana"],
        action:function(){
            data = new Date()
            semana = new Array(7)
            semana[0] = "Domingo"
            semana[1] = "Segunda-Feira"
            semana[2] = "Terça-Feira"
            semana[3] = "Quarta-Feira"
            semana[4] = "Quinta-Feira"
            semana[5] = "Sexta-Feira"
            semana[6] = "Sábado"

            mesT = new Array();
            mesT[0] = "Janeiro"
            mesT[1] = "Favereiro"
            mesT[2] = "Março"
            mesT[3] = "Abril"
            mesT[4] = "Maio"
            mesT[5] = "Junho"
            mesT[6] = "Julho"
            mesT[7] = "Agosto"
            mesT[8] = "Setembro"
            mesT[9] = "Outubro"
            mesT[10] = "Novembro"
            mesT[11] = "Dezembro"

            mesTotal = mesT[data.getMonth()]
            n = semana[data.getDay()]
            dia = data.getDate()
            mes = data.getMonth() + 1
            ano = data.getFullYear()
            ice.sayRandom([n + " dia " + dia + " do " + mes + " de " + ano, n + " Dia" + dia + " de " + mesTotal + " de " + ano])
        }
    }
    ice.addCommands(dia)
    //#endregion

    //#region desativando a ice
    iceOffline = {
        indexes:["Desativar assistente", "Desativar microfone"],
        action: function(){
            ice.say("Ok, Não estou te escutando, mas para ativar terá que atualizar a página manualmente.",{
                onStart: function(){
                    ice.fatality()
                }
            })
        }
    }
    ice.addCommands(iceOffline)
    //#endregion

    //#region Voltar para página anterior e adiante
    goBackGoForward = {
        indexes:["Voltar", "Frente"],
        action:function(i){
            if(i == 0 ){
                ice.say("Ok.")
                window.history.back()
            }else if(i == 1){
                ice.say("Ok.")
                window.history.forward()
            }
        }
    }
    ice.addCommands(goBackGoForward)
    //#endregion

    //#region  Condicionais => Verificando o site ativo
    if(window.location.hostname == "www.youtube.com"){
        //#region YOUTUBE
        //################### PlayYoutube
        playYoutube = {
            indexes:["play vídeo", "pause vídeo"],
            action:function(i){
                if(i == 0){
                    ice.say("Ok!")
                    document.querySelector('button.ytp-play-button').click()
                }else if(i == 1){
                    ice.say("Ok!")
                    document.querySelector('button.ytp-play-button').click()
                }
            }
        }
        ice.addCommands(playYoutube)

        //################### continuar Video Youtube
        continuarVideoYoutube = {
            indexes:["Continuar vídeo"],
            action: function(){
                ice.say("Ok, Continuando!")
                document.querySelector('tp-yt-paper-button#button').click()
            }
        }
        ice.addCommands(continuarVideoYoutube)

        //################### proximo Video Youtube
        proximoVideoYoutube = {
            indexes:["Pular vídeo"],
            action:function(){
                ice.say("Ok, Pulando vídeo",{
                    onStart:function(){
                        ice.fatality()
                        document.querySelector('a.ytp-next-button').click()
                    },
                    onEnd:function(){
                        ice.initialize(config)
                    }
                })
            }
        }
        ice.addCommands(proximoVideoYoutube)

        //################### Qual é proximo Video Youtube
        qualeproximovideo = {
            indexes:["Qual é o próximo vídeo"],
            action: function(){
                textoProximo = document.querySelector('span#video-title').textContent
                ice.newPrompt({
                    question:"O próximo é " + textoProximo + ". Deseja assistir?",
                    options:["Sim","Não"],
                    onMatch: (i) => {
                        var action
                        if(i == 0){ 
                            action =  () => {
                                ice.say("Ok.")
                                document.querySelector('a.ytp-next-button').click()
                            }
                        }
                        if(i == 1){ 
                            action =  () => {
                                ice.say("Ok.")
                            }
                        }
                        return action
                    }
                })
            }
        }
        ice.addCommands(qualeproximovideo)
        /*
        //################### Tela cheia
        fullscreen = {
            indexes:["fullscreen","tela cheia"],
            action:function(){
                ice.say("Ok, enquadrando.",{
                    onStart:function(){
                        ice.fatality()
                        document.querySelector("video.html5-main-video").requestFullscreen()
                    },
                    onEnd:function(){
                        ice.initialize(config)
                    }
                })
            }
        }
        ice.addCommands(fullscreen)
        */

        //#endregion

    }else if(window.location.hostname == "www.netflix.com"){
        //#region NETFLIX
        //##################### Perfil
        neflixPerfil = {
            indexes:["Netflix"],
            action:function(i){
                ice.newPrompt({
                    question:"Qual perfil você quer entrar?",
                    options:["Luiz Bruno", "Cancelar"],
                    onMatch: (i) => {
                        var action
                        if(i == 0){
                            action =  () => {
                                document.querySelector("div.profile-icon").click()
                            }
                        }
                        return action
                    }
                })
            }
        }
        ice.addCommands(neflixPerfil)

        //################### continuarAssistindo
        continuarAssistindo = {
            indexes:["Continuar assistindo","Continuar","Continue"],
            action:function(){
                ice.say("Ok.")
                document.querySelector('span.ltr-18i00qw').click()
            }
        }
        ice.addCommands(continuarAssistindo)

        //################### pularAbertura
        pularAbertura = {
            indexes:["Pular abertura", "Pule abertura", "Pular a abertura", "Pule a abertura"],
            action:function(){
                ice.say("Ok.")
                document.querySelector('span.ltr-18i00qw').click()
            }
        }
        ice.addCommands(pularAbertura)

        //################### play_pauseNetflix
        play_pauseNetflix = {
            indexes:["Pause filme", "Play filme"],
            action:function(i){
                if(i == 0){
                    ice.say("Ok.")
                    document.querySelector('video').pause()
                }else if(i == 1){
                    ice.say("Ok.")
                    document.querySelector('video').play()
                }
            }
        }
        ice.addCommands(play_pauseNetflix)
        //#endregion

    }else if(window.location.hostname == "web.whatsapp.com"){
        //#region WHATSAPP
        enviar = {
            indexes:["Enviar"],
            action:function(){
                document.querySelector('button._4sWnG').click()
            }
        }
        ice.addCommands(enviar)
        //#endregion
        
    }else if(window.location.hostname == "www.facebook.com"){
        //##################### FACEBOOK
        ice.sayRandom(["Você está no Facebook","Facebook"])        
    }else if(window.location.hostname == "www.mercadolivre.com.br" || window.location.hostname == "lista.mercadolivre.com.br"){
        //#region LISTA E MERCADO LIVRE
        pesquisar = {
            indexes: ["Pesquise por *", "Procure por *"],
            smart:true,
            action:function(i, str){
                ice.say("Ok, buscando por " + str,{
                    onStart:function(){
                        ice.fatality()
                        setTimeout(function(){
                            nav_search_input = document.querySelector('input.nav-search-input')
                            nav_search_input.value = str
                        },1000)
                        setTimeout(function(){
                            nav_search_btn = document.querySelector('button.nav-search-btn')
                            nav_search_btn.click()
                        },2000)
                    },
                    onEnd:function(){
                        ice.initialize(config)
                    }
                })
            }
        }
        ice.addCommands(pesquisar)
        fretes = {
            indexes: ["Frete grátis", "Econômico"],
            action:function(i){
                if(i == 0){
                    document.querySelectorAll('span.ui-search-animated-switch__switch-bar.ui-search-animated-switch__switch-bar--off')[1].click()
                }else if(i == 1){
                    document.querySelectorAll('span.ui-search-animated-switch__switch-bar.ui-search-animated-switch__switch-bar--off')[0].click()
                }
            }
        }
        ice.addCommands(fretes)
        //#endregion

    }else if(window.location.hostname == "www.google.com"){
        //#region GOOGLE
        pesquisar = {
            indexes: ["Pesquise por *","Procure por *", "Ache o *", "Pesquise *", "Procure *"],
            smart:true,
            action:function(i, str){
                ice.say("Ok pesquisando " + str,{
                    onStart:function(){
                        ice.fatality()
                        document.querySelector('input.gLFyf.gsfi').value = str
                        setTimeout(function(){
                            document.querySelector('input.gNO89b').click()
                        },1000)
                        setTimeout(function(){
                            ice.say("Estes são os resultados.")
                        },3000)
                    },
                    onEnd:function(){
                        ice.initialize(config)
                    }
                })
            }
        }
        ice.addCommands(pesquisar)

        links = {
            indexes:["Item *"],
            smart:true,
            action:function(i, str){
                ice.say("Item " + str,{
                    onStart:function(){
                        ice.fatality()
                        document.querySelectorAll('h3.LC20lb.DKV0Md')[str].click()
                    },
                    onEnd:function(){
                        ice.initialize(config)
                    }
                })
            }
        }
        ice.addCommands(links)
        //#endregion

    }
    //#endregion

}
//#endregion