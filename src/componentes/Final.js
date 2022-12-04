import './Final.css';

export default function Final({reniciarJogo,pontuacao}){
    return(
        <div className='divTelaFinal'>
            <h1> Fim de Jogo</h1>
            <h2> A sua Pontuação foi:<span>{pontuacao}</span></h2>
            <button onClick={reniciarJogo}>Reiniciar Jogo</button>
        </div>
    )
};