const form=document.getElementById('form-atividade');
const imgAprovado=`<img src="/Calculadora/images/aprovado.png" alt="emoji feliz"/>`
const imgReprovado=`<img src="/Calculadora/images/reprovado.png" alt="emoji triste"/>`
let linhas = '';
const atividades=[];
const notas=[];
const spanAprovado='<span class="situacao aprovado">Aprovado</span>';
const spanReprovado='<span class="situacao reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt('Digite a nota mínima:'));

form.addEventListener('submit', function (e){
    e.preventDefault();

    adicionarLinhas();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionarLinhas(){
    const inputNomeAtividade=document.getElementById('nome-atividade');
    const inputNotaAtividade=document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)){
        alert (`Atividade ${inputNomeAtividade.value} já registrada`);
    } else{
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >=notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += `</tr>`;

        linhas += linha;

        inputNomeAtividade.value='';
        inputNotaAtividade.value='';
    }
}

function atualizaTabela(){
    const corpoTabela=document.querySelector('tbody');
    corpoTabela.innerHTML=linhas;
};

function atualizaMediaFinal(){
    const mediaFinal=calculaMédiaFinal();
    document.getElementById('media-final-valor').innerHTML=mediaFinal.toFixed(2);
    document.getElementById('media-final-situacao').innerHTML=mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMédiaFinal(){
    let somaNotas=0;

    for (let i = 0; i < notas.length; i++) {
        somaNotas += notas[i];
    }

    return somaNotas / notas.length;
}