## Requisitos

- Geral
    - [ ]  A porta utilizada pelo seu servidor deve ser a 5000.
    - [ ]  Versionamento usando Git.
    - [ ]  Faça commits a cada funcionalidade implementada.
    - [ ]  Utilize dotenv.
    - [ ]  O deploy da API deve ser feito no Render e do banco no MongoDB Atlas.
- Armazenamento de dados
    - Para persistir os dados (enquete, opção de voto e voto), utilize coleções do Mongo com a biblioteca `mongodb`.
    - O formato de uma enquete deve ser:
        
        ```jsx
        {
        	_id: ObjectId("54759eb3c090d83494e2d222"),
        	title: 'Qual a sua linguagem de programação favorita?', 
        	expireAt: "2022-02-28 01:00"
        }
        ```
        
    - O formato de uma opção de voto deve ser:
        
        ```jsx
        { 
        	_id: ObjectId("54759eb3c090d83494e2d999"),
        	title: "Javascript", 
        	pollId: ObjectId("54759eb3c090d83494e2d222") 
        }
        ```
        
    - O formato de um voto deve ser:
        
        ```jsx
        { 
        	_id: ObjectId("54759eb3c090d83494e2d000")
        	createdAt: "2022-02-13 01:00", 
        	choiceId: ObjectId("54759eb3c090d83494e2d999"), 
        }
        ```
        
- **POST** `/poll`
    - [ ]  Deve receber pelo body da request, um parâmetro title, contendo o nome da enquete a ser cadastrada e expireAt, contendo a data e hora de expiração da enquete:
        
        ```jsx
        {
            title: "Qual a sua linguagem favorita?",
        		expireAt: "2022-02-28 01:00" 
        }
        ```
        
    - [ ]  **Title** não pode ser uma string vazia, retornar status 422.
    - [ ]  Se **expireAt** for vazio deve ser considerado 30 dias de enquete por padrão.
    - [ ]  Deve retornar a enquete criada em caso de sucesso com status 201.
- **GET** `/poll`
    - [ ]  Retorna a lista de todas as enquetes:
    
    ```jsx
    [
    	{
    		_id: "54759eb3c090d83494e2d222",
        title: "Qual a sua linguagem favorita?",
    		expireAt: "2022-02-28 01:00" 
    	},
    	...
    ]
    ```
    
- **POST** `/choice`
    - [ ]  Deve receber pelo body da request, um parâmetro title, contendo o nome da opção a ser cadastrada e pollId.
        
        ```jsx
        {
            title: "JavaScript",
        		pollId: "54759eb3c090d83494e2d222",
        }
        ```
        
    - Validação:
        - [ ]  Uma opção de voto não pode ser inserida sem uma enquete existente, retornar status 404.
        - [ ]  **Title** não pode ser uma string vazia, retornar status 422.
        - [ ]  **Title** não pode ser repetido, retornar status 409.
        - [ ]  Se a enquete já estiver expirado deve retornar erro com status 403.
    - [ ]  Deve retornar a opção de voto criada em caso de sucesso com status 201.
- **GET** `/poll/:id/choice`
    - [ ]  Retorna a lista de opções de voto de uma enquete:
    
    ```jsx
    [
    	{
    		_id: "54759eb3c090d83494e2d999",
    		title: "Javascript",
    		pollId: "54759eb3c090d83494e2d222" 
    	 },
    	{
    		_id: "54759eb3c090d83494e2d888",
    	  title: "Python",
    		pollId: "54759eb3c090d83494e2d222"
    	},
    	...
    ]
    ```
    
    - [ ]  Validação: caso a enquete não exista deve retornar status 404.
- **POST** `/choice/:id/vote`
    - [ ]  Não recebe nenhum dado do body da requisição. Deve registrar um voto na opção selecionada.
    - [ ]  O voto deve armazenar a data e hora que foi criado no back-end.
    - Validações:
        - [ ]  Verificar se é uma opção existente, se não existir retornar 404.
        - [ ]  Não pode ser registrado se a enquete já estiver expirado, retornar erro 403.
    - [ ]  Retorna status 201 em caso de sucesso.
- **GET** `/poll/:id/result`
- [ ]  Retorna o resultado de uma enquete, ou seja, a opção de voto **mais votada** na enquete até o momento, seguindo o formato sugerido:

```jsx
{
	_id: "54759eb3c090d83494e2d222",
	title: "Qual a sua linguagem de programação favorita?"
	expireAt: "2022-02-14 01:00",
	result : {
		title: "Javascript",
		votes: 487
	}
}
```

- [ ]  Validação: caso a enquete não exista deve retornar status 404.
