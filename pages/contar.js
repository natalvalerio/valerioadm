import { useState } from 'react';
import Link from 'next/link'

function Contar() {
    return (
    <span>
        <title>Contador</title>
        <h1>Contador</h1>
        <Contador /> 
        <div>Teste</div>
        <br/>
        <div><Link href="/"><a>Home</a></Link></div>
    </span>
    )
}

function Contador() {
    const [contador,setContador] = useState(1);

    function addContador() {
        setContador(contador + 1);
    }

    return (
        <span>
            <div>{contador}</div>
            <button onClick={addContador}>Adicionar</button>
        </span>
    )
} 

export default Contar