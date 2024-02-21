confirm("Are you sure you want to delete?")
$(document).ready(function(){

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;

        switch(texto){
            case "5/5": titulo = "30 de Abril de 2023"; mensagem = "<p>Esse foi o dia que fomos assistir um 'filme' na casa da Vanessa.</p><p>Foi incrivel, fizemos muitas coisas e percebi o quanto tava gostando de vc,e tava desconfiando que vc tava querendo ficar comigo.</p><p>E eu estava certo, no mesmo dia quando a francine fez a pergunta na roda perguntando se ficaria com alguem da roda e vc bebeu sendo que os unicos solteiros ali era eu e vc,era para eu ter te puxado e te dado um beijo ja naquele momento mas fui lerdo errei,fui mlk KKKKK!</p>";break;
            case "13/6": titulo = "17 de Junho de 2023"; mensagem = "<p>Grande dia esse foi esse , esse foi o dia que estavamos indo buscar a francine na estacão e finalmente tive coragem de te chamar para ficar ,depois de tanta enrolação eu consegui te chamar para ficar e foi incrivel e a francine sendo vip vendo tudo e esperando a gente terminar kkkkkkkk</p>";break;
            case "12/6": titulo = "03 de novembro de 2023"; mensagem = "<p>Esse dia foi muito especial tambem foi o dia q fomos no parque e ficamos o dia inteiro so nos chamegos e carinho ❤️</p>";break;
            case "19/6": titulo = "05 de janeiro de 2024"; mensagem = "<p>A esse dia foi uma emoção q so,primeiro saimos para tomar sorvete, e na volta vemos uma briga de bar e um cara com uma arma ,quer dizer vc viu KKKKK e corremos ,quanta adrenalina para um dia só , e por fim ainda falou que a vida de solteiro ta chata ,ai que dia incrivel seriooooo.</p>";break;
            case "5/6": titulo = "23 de fevereiro de 2024"; mensagem = "<section class='text-center'><p class='letra-vermelha'><strong>OHHHH bobinha, isso eh hj e este momento está sendo escrito agora...</strong></p></section>";break;
            case "5/9": titulo = "18 de fevereiro de 2024"; mensagem = "<p>Isso foi domingo agora e foi incrivel,mesmo nao saindo como eu tinnha planejado temos ficado 3 horas no trem e tudo mais , mas foi perfeito pq oq mais importa eh que passamos o dia juntos e se divertimos e demos risadas, e quero sempre ter esses momentos com vc.</p>";break;
            case "final": titulo = "23 de Fevereiro de 2024"; mensagem = "<section class='text-center mt-5 mb-5'><p><strong>O dia em que ela disse<br><span class='letra2 letra-vermelha'>SIM</span></strong></p></section>";break;
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}