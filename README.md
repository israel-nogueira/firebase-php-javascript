# Firebase Realtime (PHP+JAVASCRIPT)

É uma classe intermediária para o repositório  **luqmanrom/firebase-php** que faz em PHP a autenticação e o CRUD básico.

Modelei essa classe para que pudesse utilizar em meu projeto particular.

Basicamente eu utilizo para criar eventos no front-end enquanto atualizo no Back.
Porém pode ser utilizada de varias maneiras.

Aproveitem! 

## Dependência

Faça download via Composer da classe original
```
composer require geckob/firebase
```

## Início


### 1. Authentication

**1.1 Gerar chave secreta da conta de serviço**
Para gerar o arquivo secreto, siga estas etapas

1. Vá até [Firebase Console](https://console.firebase.google.com/)
2. Crie seu projeto
3. Ao lado esquerdo superior clique em uma engrenagem
4. Acesse a opção "Configuração do projeto"
5. Vá e clique na aba "Contas de serviço"
6. Role até em baixo, e clique no botao "Gerar nova chave privada"
7. Faça download do arquivo "secret.json"
8. Proteja o acesso direto a seu arquivo com o apache ou NGIX

**1.2 Utilize o aqruivo na classe PHP**
```php
    $firebase = new \Geckob\Firebase\Firebase('./secret.json');
```
### 2. PHP

A operação CRUD no Firebase Database é baseada no [Firebase REST API Docs](https://www.firebase.com/docs/rest-api.html).

Supondo que a autenticação seja feita com sucesso, siga os passos:

```php

                // Setamos o path da base
				websocket::base('/')
				
				// Crie um novo nó, se o nó já existir, ele atualizará o valor 
				->set('testObject','testValue')
				
				// Suporta vários nós, se não existir, ele criará o nó
				->set('testObject/testKey','testValueObject')
				
				// Também poderá criar arrays com sub nós
                ->set('testObject',['testKey'=>'value','testValueObject'=>'other value'])
                
                /*
				* Função push adaptada para trabalhar da maneira a qual eu acho correta
				* Original insere uma chave randômica
				*/
				
				//Se for uma string ('value'), ele transforma em array e adiciona o valor
				->push('testKey','STRING QUALQUER') // return ['value','STRING QUALQUER']

				//Se for uma array ["teste"=>"123"], ele insere um novo item 
				->push('testObject','STRING QUALQUER') // return ["teste"=>"123","0"=>"STRING QUALQUER"]
				
				//Se for uma array ["teste"=>"123"], e o novo dado for outra array, ele insere um novo item 
				->push('testObject',['string'=>'test']) // return ["teste"=>"123","string"=>"test"]

                // exclui o nó inteiro
				->delete('Estatico/aaa/teste2')

                // Retorna o nó pedido
				->get('testObject'); // return ['string'=>'test']

```

### 3. JAVASCRIPT

**3.1 Pegar as credenciais de acesso da API**
Para gerar as credenciais, siga estas etapas

1. Vá até [Firebase Console](https://console.firebase.google.com/)
2. Crie seu projeto
3. Ao lado esquerdo superior clique em uma engrenagem
4. Acesse a opção "Configuração do projeto"
5. Vá e clique na aba "Geral"
6. Role até em baixo, e clique no radiobox "Firebase SDK snippet"
7. Copie as credenciais e cole no topo do seu arquivo **firebase.js**

Agora que nosso Javascript está 100%, vamos as funções no arquivo **index.html**

```javascript


    // Aqui recebemos o valor do nó
	window.websocket.base('/pessoas/eu').get().then(function(retorno) {
	 	console.log(retorno);
	 });
	 
    /*
	* Função push adaptada para trabalhar da maneira a qual eu acho correta
	* Original insere uma chave randômica
	* aqui a gente realmente insere um ítem 
	*/
	window.websocket.base('/').push('associado',[1,2,3,4]).then(function(snapshot) {
	 	console.log(snapshot);
	 });
	 
    // Aqui setamos um novo valor ao nó, e retornamos o conteudo
    window.websocket.base('/pessoas/eu').set({nome: 'João',sobrenome: 'Silva'}).then(function(retorno) {
    	window.websocket.base('/pessoas/eu').get().then(function(retorno) {
    		console.log(retorno);
    	});
    });
	// exclui o nó 
	window.websocket.base('/pessoas/eu').delete().then(function() {
	 	console.log('deletado');
	 });


//################################################################################
//  LISTNERS
//################################################################################

	// UPDATE RETORNA  INCLUSOES, EXCLUSOES E ALTERAÇÕES	
	window.websocket.onUpdate(function(snapshot) {
		console.log('onUpdate',snapshot);
	});

	// RETORNA APENAS ALTERAÇÕES DE VALORES
	window.websocket.onChanged(function(snapshot) {
		console.log('onChanged',snapshot);
	});


	// RETORNA ITENS ADICIONADOS
	window.websocket.onAdded(function(snapshot) {
		console.log('onAdded',snapshot);
	});


	// RETORNA ITENS DELETADOS
	window.websocket.onDelete(function(snapshot) {
		console.log('onDelete',snapshot);
	});

	

```

## AGRADECIMENTO

Quero agradecer o [Luqman Rom](https://github.com/luqmanrom) que disponibilizou publicamente essa classe em PHP que me foi tão útil


## License 

#### The MIT License (MIT)
```
Copyright (c) 2012-2016 Tamas Kalman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```	



