import './App.css';

import {useCallback, useEffect, useState} from "react";
import { ListaDePalavras } from './data/ListaDePalavras';


import TelaInicial from './componentes/TelaInicial';
import Jogando from './componentes/Jogando';
import Final from './componentes/Final';

const estagios =[
  {id:1, name:"comecando"},
  {id:2, name:"jogando"},
  {id:3, name:"final"}
];

const numeroDeChances = 5;

function App() {
  const [estagioJogo, setEstagioJogo] = useState(estagios[0].name);
  const [palavras] = useState(ListaDePalavras);

  const [palavraSorteada, setPalavraSorteada] = useState("");
  const [categoriaSorteada, setCategoriaSorteada] = useState("");
  const [letras, setLetras] = useState([]);

  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [chances, setChances] = useState(numeroDeChances);
  const [pontuacao, setPontuacao] = useState(0);


const sorteadaPalavraECategoria = useCallback(() =>{
      const categorias = Object.keys(palavras)
      const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]
      const palavra = ListaDePalavras[categoria][Math.floor(Math.random() * ListaDePalavras[categoria].length)]
      return {palavra,categoria}
    },[palavras]);

const iniciandoJogo = useCallback(() => {
  limpandoChances();

  const {categoria, palavra} = sorteadaPalavraECategoria();

  let palavrasFinal = palavra.split("");
  palavrasFinal = palavrasFinal.map((letMap) => letMap.toLowerCase());

  setPalavraSorteada(palavra);
  setCategoriaSorteada(categoria);
  setLetras(palavrasFinal);

  setEstagioJogo(estagios[1].name)
},[sorteadaPalavraECategoria]);

const verificacaoLetra = (letraJogando) =>{
  const normalizarLetra = letraJogando.toLowerCase();

  if(letrasAdivinhadas.includes(normalizarLetra)||letrasErradas.includes(normalizarLetra)){
    return;
  }

  if(letras.includes(normalizarLetra)){
    setLetrasAdivinhadas((atualLetrasAdivinhadas)=>[
      ...atualLetrasAdivinhadas,
      letraJogando,
    ])
  }else{
    setLetrasErradas((atualLetrasErradas)=>[
    ...atualLetrasErradas,
    normalizarLetra,
  ])
  setChances((atualChances) => atualChances - 1)
}} 

useEffect(()=>{
  if(chances <= 0){
    limpandoChances()
    setEstagioJogo(estagios[2].name);
  }

},[chances])

useEffect(()=>{
//set deixa apenas itens unico dentro do array
const listaDeLetras = [...new Set(letras)]

if(letrasAdivinhadas.length === listaDeLetras.length){
  setPontuacao((atualScore)=>atualScore += 50)
  iniciandoJogo();
}

},[letrasAdivinhadas,letras, iniciandoJogo])

const reniciarJogo = () =>{
  setPontuacao(0);
  setChances(numeroDeChances);
  limpandoChances();
  setEstagioJogo(estagios[0].name)
}
const limpandoChances =()=>{
  setLetrasAdivinhadas([])
  setLetrasErradas([])
}

  return(
    
  <div className='App'>
    {estagioJogo === 'comecando' && <TelaInicial iniciandoJogo={iniciandoJogo}/>}
    {estagioJogo === 'jogando' && <Jogando
    verificacaoLetra={verificacaoLetra} 
    palavraSorteada={palavraSorteada}
    categoriaSorteada={categoriaSorteada} 
    letras={letras}
    letrasAdivinhadas={letrasAdivinhadas} 
    letrasErradas={letrasErradas}
    chances={chances}
    pontuacao={pontuacao}/>}
    {estagioJogo === 'final' && <Final reniciarJogo={reniciarJogo}
    pontuacao={pontuacao}/>}

  </div>
  )
}

export default App;
