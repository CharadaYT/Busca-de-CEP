function buscar() {
    var cep = document.getElementById('cep').value;
    if (cep.length <= 7) {

        var error = "Preeencha o campo corretamente...";

        var erro = document.getElementById('error');
        if (cep === "") {
            erro = document.getElementById("error").innerHTML = error;
            document.querySelector('#error').classList.add('error');
            document.querySelector('#error').classList.remove('none');
            document.querySelector('#error2').classList.add('none');
            document.querySelector('#infos').classList.add('none')
        }

    }else if (cep.length = 8) {
        const option = { method: 'GET', url: `https://viacep.com.br/ws/${cep}/json/` };

        axios.request(option).then(function (api) {


            var rua = `<span>RUA: ${api.data.logradouro}</span>`;
            var bairro = `<span>Bairro: ${api.data.bairro}</span>`;
            var cidade = `<span>Cidade: ${api.data.localidade}</span>`;
            var estado = `<span>Estado: ${api.data.uf}</span>`;
            var dd = `<span>DDD: ${api.data.ddd}</span>`;
            var complemento = `<span>Complemento: ${api.data.complemento}</span>`;
            if (api.data.complemento === "") {
                complemento = "";
            }

            var cp = ` <span>CEP: ${api.data.cep}</span>`;
            if (cp) {
                document.getElementById('infos').innerHTML = `
               <div class="info">
               ${cp}
               ${rua}
               ${complemento}
               ${bairro}
               ${cidade}
               ${estado}
               ${dd}
               </div>
                `;
                document.querySelector('#error').classList.add('none');
                document.querySelector('#infos').classList.add('infos');
            }

            var error2 = `CEP: ${cep} não foi encontrado!`;

            var erro2 = document.getElementById('error2');

            var test = api.data.erro;
            if (test === true) {
                erro2 = document.getElementById("error2").innerHTML = error2;
                document.querySelector('#error2').classList.add('error2');
                document.querySelector('#infos').classList.add('none')
                document.querySelector('#error2').classList.remove('none')
                document.querySelector('#infos').classList.remove('infos');
              

            } else if (test != true) {
                document.querySelector('#error2').classList.add('none')
                document.querySelector('#error2').classList.remove('error2');
                document.querySelector('#infos').classList.add('infos');
                document.querySelector('#infos').classList.remove('none');
            }
        }).catch(function (error) {
            console.error(error);
        })
        document.querySelector('#error').classList.add('none');
    }

}