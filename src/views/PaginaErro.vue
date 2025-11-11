<template>
    <section>
        <h1>Pagina não encontrada!</h1>
        <hr>
        <p>Parece que você digitou uma pagina que não existe! <br>Clique no botão abaixo para retornar ao início.</p>
        <button @click="voltarParaInicio()">Voltar</button>
    </section>
</template>

<script>

  export default {
    name: 'PaginaInicial',
    methods: {
      voltarParaInicio() {
        this.$router.push('/')
      }
    }
  }

</script>

<style>
h1{
    color: rgb(91, 91, 91);
    font-family: Arial, Helvetica, sans-serif;
}
button{
    background-color:rgb(85, 85, 85);
    color: rgb(255, 255, 255);
    border-radius: 8px;
    text-decoration: none;
    border: none;
    width: 120px;
    height: 45px;
    font-size: 12pt;
    margin: 8px;
}
button:hover{
    background-color: rgb(171, 169, 169);
}
p{
    color: rgb(100, 100, 100);
    font-family: Arial, Helvetica, sans-serif;
}
section { 
    background: white;
    border-radius: 10px;
    padding: 15px;
    width: 900px;
    margin: auto;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.367);
    text-align: center;
    margin-top: 28px;
}
</style>