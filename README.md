# Estudo sobre método MVC(Model-View-Controller)

## Aplicação Todo List:
Nesta aplicação apliquei os estudo do padrão **MVC (Model-View-Controller)** e realizei a criação de um Todo List simples, onde é possível adicionar uma tarefa, dar check se a tarefa já foi concluída e também deletar a tarefa da lista. 

## O que é o MVC(Model-View-Controller)?
**MVC** é um padrão de arquitetura de software responsável por contribuir na otimização da velocidade entre as requisições feitas pelo comando dos usuários. 

### Model:
Gerencia e controla a forma como os dados se comportam por meio das funções, lógica e regras de negócios.

### View:
É responsável por apresentar informações de forma visual ao usuário. Ela é a única parte da estrutura visível para o usuário, é ela que vai mandar as requisições feitas do usuário para o servidor ou para a aplicação. Portanto, o view vai enviar a requisição ao controller, que em seguida devolve uma resposta e a view exibe isso para o usuário.

### Controller:
É responsável por controlar as requisições enviadas pelo View com as respostas fornecidas pelo Model. Nele, é processado tudo que o usuário informou na requisição, e uma vez processado, é também onde uma resposta é gerada.

## Como funciona a arquitetura MVC? 
O Controller se comunica com a View e com o Model para gerar a requisição. O Model nunca se comunica com a View, cabendo a função de renderização e entrega ao Controller. Mas o Model avisa quando as solicitações foram atendidas para que a View possa mostrá-las ao usuário.

### Vantagens de utilizar MVC:
* Pode ser usada em vários frameworks;
* É possível separar a interface de usuário das regras de negócios;
* Reutilização de códigos, principalmente em projetos diferentes;
* Agilidade na atualização da interface da aplicação;
* Facilidade de manutenção do código;
* Facilidade na implementação de camadas de segurança;
* Integração de equipes de desenvolvedores;

### Desvantagens de utilizar MVC:
* Complexidade do entendimento inicial do conceito da divisão das camadas;
* Tempo para planejar a aplicação;

