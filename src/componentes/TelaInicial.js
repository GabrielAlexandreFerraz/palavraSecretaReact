import './TelaInicial.css';

export default function TelaInicial({iniciandoJogo}){
    return(
        <div className='divTelaInicial'>
            <h1> Palavra Secreta </h1>
            <p> Clique no botão para Começar a Jogar!</p>
            <button onClick={iniciandoJogo}>Começar o Jogo</button>
        </div>
    )
};