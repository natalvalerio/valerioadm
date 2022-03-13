import Link from 'next/link' 

function CapsLock1(props) {
    const textoInserido1 = props.texto
    const textoEmCapsLock1 = textoInserido1.toUpperCase()
    return <span>{textoEmCapsLock1}</span>
}

function CapsLock2(props) {
    const textoInserido2 = props.children
    const textoEmCapsLock2 = textoInserido2.toUpperCase()
    return <span>{textoEmCapsLock2}</span>
}

function Pagina() {
    return (
    <div>
    <title>Funções</title>
    <CapsLock1 texto="Teste de Capslock1" />
    <br />
    <CapsLock2>Teste de CapsLock2</CapsLock2>
    <div><Link href="/"><a>Home</a></Link></div>
    </div>
    )
}

export default Pagina