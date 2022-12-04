import { useState, useRef } from 'react';
import './Jogando.css';

export default function Jogando({verificacaoLetra, palavraSorteada, categoriaSorteada, letras, letrasAdivinhadas, letrasErradas, chances, pontuacao}){
   
   const [letraJogando, setLetraJogando] = useState("");
    const inputLetraRef = useRef(null);

   const formularioJogando = (e) =>{
    e.preventDefault();
    verificacaoLetra(letraJogando);
    setLetraJogando("");
    inputLetraRef.current.focus();
   }

    return(
        <div className='divTelaJogando'>
            <p className='pontos'>
                <span>Pontuação : {pontuacao}</span>
            </p>
            <h1>Adivinhe a Palavra: </h1>
            <h3 className='dicaDaPalavra'> Dica sobre a Palavra: <span>{categoriaSorteada}</span>
            </h3>
            <p>Você ainda tem {chances} tentativas(s).</p>
            <div className='jogando'>
                {letras.map((letras, i)=>(
                    letrasAdivinhadas.includes(letras)?(
                        <span key={i} className='divLetrasJogando'>{letras} </span>
                    ):(
                        <span key={i} className='fundoLetras'> </span>
                        )
                ))}
            </div>
            <div className='letrasJogando'>
                <p> tente adivinhar a letra da palavra:</p>
                <form onSubmit={formularioJogando}>
                    <input 
                    type="text" 
                    name="letra" 
                    maxLength="1" 
                    onChange={(e)=> setLetraJogando(e.target.value)}
                    required
                    value={letraJogando}
                    ref={inputLetraRef}
                    />
                    <button> Jogar</button>
                </form>
            </div>
            <div className='letrasChutadas'>
                <p> Letras Utilizadas:</p>
                {letrasErradas.map((letras, i)=>(
                    <span key={i}>{letras},</span>
                ))}
            </div>
        </div>
    )
};