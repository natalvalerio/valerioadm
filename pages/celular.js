import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import styles from './estilos.module.css'

function gerar(){
  var num1 = parseInt(document.getElementById('num1').value);
  var num2 = parseInt(document.getElementById('num2').value);
  var resposta = document.getElementById('resposta');
var resp="";
  
  count=0;

 while(count<num2){
   resp=resp+"<p align='center'><font size='32' face='Times'>"+num1+" | <a href='https://api.whatsapp.com/send?phone=+55"+num1+"'><img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBYRXhpZgAATU0AKgAAAAgABAExAAIAAAARAAAAPlEQAAEAAAABAQAAAFERAAQAAAABAAAUw1ESAAQAAAABAAAUwwAAAAB3d3cuaW5rc2NhcGUub3JnAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAwADADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/GbaOawfiH8TdB+FPhx9W8R6pa6TYK2wPKSWkbk7UVcs7YBO1QTgGj4jfEHTfhf4J1bxHrErRaZosDTylcFnI6KoJALMxCqMjLHFfnZZy+OP+Cgfx3lWOSGObynmVZ5W+xaJaAgbRgEkklV4Xc7HJwoJXwM7zp4Plo0I89Wfwr9X/WuuqsfH8U8UPLPZ4XCw9piKnwx/C7t0vstL66pJs+ifF/8AwVK0HT7po9C8Lanqsakjzby6SyV/dQFkbB/2gD7Cm+E/+Cpuh3t0qa54T1LTI2OPMsrtLzZ7kMsRx9Mn2NfJHx3+EWsfs9fEWbw3rT281wkEd1DPbk+VcwvnDruAPDK6nI+8h6jBPHf2l71+f1uKs3pVnGpKzTs48sf8r/ifjuJ8QeIqGJlCtNRcXZxcY2TXTa/4n64fDj4qeH/i54fXVPDerWurWedrmMlZIW/uujAMjY52uAcEHoa6JW3DIr8lfg/8ctc+Bvjm217Qbjy7iEhZ4GY+TfRZyYpB3U9j1U4I5FfqN8LPiXpvxc+H2j+J9JZm0/WoBKqtjdC+SrI2ONyOGRsZ5Wvu+HuII5jBwmuWpHddGu6/VdNNT9a4M4yp53TlTqJRrRV2ls13XW19Gtbaau585/8ABWHxtNoXwA8P6XDI8a67rCNcAHiWOKJ5Np/7aGJv+AV5f/wSQ+JOn6R8WfE3h+6aOO+8RWEMtizkDzDbNKZI19WKy78DtEx7V6d/wVp8FXGvfswaXrVtGXPhbV4nuiP4IZFe3Yj/ALatD+GTX50+G/HGoeDvENjq2l3ktjqWmTpc2txHjdDIhyrDPB56gggjIIIJFfI5/jZ4PPY4mSuopWXk007fj8z804zzirlXF8MdNXUVFpd4tOMrffK3mfYP/BWn4gQ6j8aNB0MaTNZ3Giac0z38ox/aCTspVUx1SMxuMnne7gAYy3yp/afvX3l4S8cfD/8A4Kq/B+HRNekh8O/EbQ42lRYGHnWshADT24Y5mtXKrvjJJXCgkMI5TynwR/4JE3Vv4w1n/hYWsW91okMJi0z+xp2jmunbP76Ten7vYMYT5wzNySq4fHNMlxWYYv63hLThU1T0VtNpdmrW8/XQ5c+4XzDOsy/tHLGqtKu7qSslGytyzW6cUrbXfX3nY+OP7T96+9/+CSvjebWfg14t0aRmdNG1MXMGT/q1miB2j0G+J2+rmvlf9uL9kd/2PfFGiww68ut6X4jW4ks/Nh8q6txCYwyy4+Vv9amHXbkhvlXAz9S/8EivBFxo/wCzt4g8Q3EbR/8ACT6q0doSOJYYUEIYf9tjMv8AwCp4XweIw2c+wqKzinzLytpt6ojgHL8bguKFg68eWUIy51dPRxutVdWbcX80fQn7RWoaL4f+Avjy+8QWseoaFb6JdzX1pI20XKLAxaMEEEFwAowQdx45r8P49aWIRxyTR+bgDBIyx+lfur498IaD8WPBt3oGu2K61pGpFDcWvz+XPtkWRVZlIGNyrkE4IGDkEg0NL+CvhHQfBt14fsfAfhm18O3y7LrS4tOtkguhnOHhC+W4zz8x9+tfXcQ8O1cyqwlGaiop9Ltt/dpt176H6NxxwNiM/wATTqQqxpxhFrZttt3s9tNFbV2u9O/4h6f4juNI1C3vLO5uLO8tZBLBcW8himgcdGR1IZWHYggivoD4df8ABVn4xfDzTBZvrmneI4Y12RnWrETyxj/rpG0bufeRmPvX154//wCCRvwU8aag1xZr4o8GmRizx6df7IiSecLdRyhR7JgDsBTfAf8AwSI+Cng7UFuLxvFXjAK25Yb/AFDdED2yLSOLI9myD3BFfL4bhXOsNUth6ij5qTS+atf8D87y/wAOuLMBXawVaME95RnJJ+qtd/OJ8hfC/wAC/E7/AIKd/HL7dqt/dXFjbMsOpay0IjstGtwd3kwoBs8whvljGWJYM5xlq/VPwF4J0vwD4W0rw7odstponh+3S0t41OfuDaASeWI6sxySxyTkGpPC3hGz8KeHrXR9G0uy8O6LZL5cFlZQpCsS5JKosfyxgkk/LknJPB5raiiWCJURVVFGAAMACvt8lyWOBUpzlz1JfFJ/kvL8/uS/XuE+EoZPGdatUdWvU1nN7vyV7u3dt3b1fRL/2Q=='></a> | <a href='tel:0"+num1+"'><img src='data:image/jpeg;base64,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'></a> </p>";
   num1 = num1 + 1;
   count++;
 }
   resposta.innerHTML=resp;
}


function celular() {
 return ( 
<div>
<meta http-equiv="content-language" content="pt-br">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="google-play-app" content="Gerar lista aleatória">
<meta name="description" content="Gerar lista aleatória">
<title>Celulares Aleatórios</title>

<link rel="icon" href="telefone.png" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="estilo.css">

<body>
<table id="corpo" align="center" cellpadding="0" cellspacing="0">
<tbody><tr>
<td align="center">
<div id="topo">
<center>
<div id="bannerTopo">
</div>
</center>
<h1><a href="">Celulares Aleatórios</a></h1> 
Número<br><input autofocus="" type="tel" maxlength="20" placeholder="22999999999" id="num1" name="num1" tabindex="1" value=""><br>
Quantidade<br><input type="tel" maxlength="3" placeholder="10" id="num2" name="num2" tabindex="2" value=""><br>
<a id="btnVoltar" href="#" id="consultar" title="Clique para gerar!" tabindex="3" onclick="gerar()">Gerar Números</a>

<tr>
<td height="100%" align="center">
<noscript id="mensagem"><u>ATENÇÃO</u><br><span>Ative a função "JavaScript" do seu navegador.</span></noscript>
<div id="texto">
<div id='resposta'></div>
<h2>Olá, bem-vindo!</h2>
<p>A intenção deste serviço é ajudá-lo a gerar listas de números telefônicos aleatórios de forma rápida e prática!</p>
<p>Bastando apenas informar o primeiro número de celular, informar quantos números deseja gerar e clicar em gerar.</p>
<p align="center">** Use o serviço com responsabilidade! **</p><p>
</p><p><i>Cordialmente,<br>Valério</i></p>
</div>
</td>
</tr>
<tr>
<td id="rdlinks">
<a href=""></a> |
<a href="" target="_blank"></a> |
<a href="" target="_blank" rel="nofollow"></a> |
<a href=""></a> |
<a href="" target="_blank" rel="nofollow"></a> |
<a href="mailto:"></a>
</td>
</tr>
<tr>
<td id="rodape" title="9 - 0.002">
Lista de Celulares - 2020<br>
Gere rapidamente uma lista com números aleatórios<br>
</td>
</tr>
</tbody></table>
</body>

<div/>
)
}

export default celular