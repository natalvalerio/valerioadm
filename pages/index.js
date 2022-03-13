import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import styles from './estilos.module.css'

function estil() {
    <style global jsx>
    {``}
    </style>
}

function Home() {
    return (
        <div>
            <title>Home</title>
            <body class={styles.corpo}>
            <div align="center">
            <h1>Home</h1>
            <Link href="./nick.jpg"><a>
            <img src="nick.jpg" alt='nick' class={styles.imagens} width="250" height="150" /><br />
            </a></Link>
            <Link href="./abc.jpg"><a>
            <img src="abc.jpg"  alt='abc'  class={styles.imagens} width="250" height="150" />
            </a></Link>
            </div>
            
            <p><Link href="/contar"><a>Contador</a></Link></p>
            
            <p><Link href="/teste"><a>Teste</a></Link></p>            

            <p><Link href="/func"><a>Funções</a></Link></p>            

            <p><Link href="/sobre"><a>Sobre</a></Link></p>

            </body>
        </div>
    )
}

export default Home