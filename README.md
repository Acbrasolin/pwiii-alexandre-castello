# PWIII-Alexandre Castello
Programação Web III por Prof Joao Siles e Najara
# Como Criar um Projeto Spring Boot com Java

Guia passo a passo para criar um projeto Spring Boot utilizando dois métodos:

- **Spring Initializr** — ferramenta online para gerar a estrutura inicial do projeto
- **IntelliJ IDEA** — criação do projeto diretamente pela IDE

## Sumário

1. [O que é Spring Boot?](#1-o-que-é-spring-boot)
2. [Método 1 — Spring Initializr](#2-método-1--spring-initializr)
   - 2.1 [Configurando o projeto](#21-configurando-o-projeto)
   - 2.2 [Adicionando dependências](#22-adicionando-dependências)
   - 2.3 [Gerando e baixando o projeto](#23-gerando-e-baixando-o-projeto)
3. [Método 2 — IntelliJ IDEA](#3-método-2--intellij-idea)
   - 3.1 [Criando o projeto](#31-criando-o-projeto)
   - 3.2 [Adicionando dependências pelo IntelliJ](#32-adicionando-dependências-pelo-intellij)
4. [Estrutura básica do projeto](#4-estrutura-básica-do-projeto)
5. [Executando a aplicação](#5-executando-a-aplicação)
6. [Comparação dos dois métodos](#6-comparação-dos-dois-métodos)

---

## 1. O que é Spring Boot?

Spring Boot é um framework Java que facilita a criação de aplicações prontas para uso, já configurado com tudo o que uma aplicação precisa para rodar, sem exigir configuração do zero.

Com o Spring Boot é possível criar:

- APIs REST
- Aplicações web
- Serviços de back-end

A grande vantagem é reduzir a quantidade de configuração necessária, permitindo focar no desenvolvimento das funcionalidades.

---

## 2. Método 1 — Spring Initializr

Ferramenta online que gera automaticamente a estrutura inicial de um projeto Spring Boot. Acesse: https://start.spring.io/

### 2.1 Configurando o projeto

| Campo | Valor a selecionar | O que significa |
|---|---|---|
| Project | Gradle - Groovy | Sistema de build usado para compilar e gerenciar dependências |
| Language | Java | Linguagem de programação do projeto |
| Spring Boot | 4.1.0 | Versão do Spring Boot |
| Group | com.exemplo | Identificador do grupo/organização |
| Artifact | demo | Nome do projeto gerado |
| Package name | com.exemplo.demo | Gerado automaticamente a partir de Group e Artifact |
| Packaging | Jar | Formato do arquivo gerado no build |
| Java | 21 | Versão do JDK utilizado |

> **Dica:** o campo *Package name* é preenchido automaticamente, mas pode ser alterado manualmente.

### 2.2 Adicionando dependências

Dependências são bibliotecas externas que adicionam funcionalidades prontas ao projeto.

**Passo a passo:**
1. Clique em **ADD DEPENDENCIES...** (ou `Ctrl + B`)
2. Pesquise o nome da dependência (ex: `Web`)
3. Selecione **Spring Web**
4. Confirme que ela aparece em *Dependencies*

Dependências comuns:
- **Spring Web** — cria APIs REST/web, já com Tomcat embutido
- **Spring Boot DevTools** — reinicia a aplicação automaticamente ao detectar mudanças
- **Lombok** — reduz código repetitivo (getters, setters, construtores)

**Adicionar depois de criado**, edite `build.gradle`:

```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
}
```

Depois, no IntelliJ, clique em **Load Gradle Changes**.

### 2.3 Gerando e baixando o projeto

1. Revise as configurações e dependências
2. Clique em **GENERATE** (ou `Ctrl + Enter`)
3. Extraia o `.zip` baixado
4. No IntelliJ: `File → Open...` e selecione a pasta do projeto
5. Aguarde o carregamento das dependências Gradle

---

## 3. Método 2 — IntelliJ IDEA

Criação direta pela IDE, sem passar pelo navegador (mesmo processo do Spring Initializr, integrado).

### 3.1 Criando o projeto

1. Abra o IntelliJ IDEA → **New Project**
2. Selecione **Spring Boot** no painel esquerdo
   - Se não aparecer, verifique o plugin Spring em `File → Settings → Plugins`
3. Preencha:
   - Name: `demo`
   - Language: `Java`
   - Type: `Gradle - Groovy`
   - Group: `com.exemplo`
   - Artifact: `demo`
   - JDK: `21`
   - Packaging: `Jar`
4. Clique em **Next**

### 3.2 Adicionando dependências pelo IntelliJ

1. Pesquise `Web`
2. Marque **Spring Web**
3. Clique em **Create**

```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

---

## 4. Estrutura básica do projeto

```
demo/
├── src/
│   ├── main/
│   │   ├── java/com/exemplo/demo/DemoApplication.java
│   │   └── resources/application.properties
│   └── test/
│       └── java/com/exemplo/demo/DemoApplicationTests.java
├── build.gradle
└── settings.gradle
```

**DemoApplication.java** — classe principal que inicia o Spring Boot:

```java
package com.exemplo.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

**application.properties** — configurações da aplicação:

```properties
server.port=8080
spring.application.name=demo
```

**build.gradle** — dependências e configuração do build:

```gradle
plugins {
    id 'org.springframework.boot' version '4.1.0'
    id 'io.spring.dependency-management' version '1.1.0'
    id 'java'
}

group = 'com.exemplo'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '21'

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

---

## 5. Executando a aplicação

1. Abra `DemoApplication.java` em `src/main/java/com/exemplo/demo/`
2. Execute de uma das formas:
   - Clique no ▶️ ao lado do método `main`
   - Botão direito → **Run 'DemoApplication'**
   - Atalho `Shift + F10`

Console esperado ao concluir:

```
Started DemoApplication in 2.345 seconds (process running for 2.789)
```

O Tomcat embutido inicia automaticamente e a aplicação fica disponível para requisições.

---

## 6. Comparação dos dois métodos

| Método | Característica principal |
|---|---|
| Spring Initializr | Cria o projeto pelo navegador; arquivo `.zip` baixado e importado na IDE |
| IntelliJ IDEA | Cria e configura o projeto direto na IDE, sem sair do ambiente |

- Use o **Spring Initializr** para uma visão mais clara das opções ou em editores sem integração com Spring.

# pwiii-alexandre-castello

# TUTORIAL DE INICIAÇÃO DE PROJETO LARAVEL 🟥

## Requisitos
Antes de começar a instalação do *Laravel*, é necessário de outros componentes. Você precisa ter instalado na sua máquina o [*PHP*](https://php.net/), [*Composer*](https://getcomposer.org/) e o [*instalador do Laravel*](https://github.com/laravel/installer), além disso, também será necessário o *[Node e o NPM](https://nodejs.org/)*   ou o [*Bundle*](https://bun.sh/) para poder compilar os recursos front-end do seu aplicativo.

Caso não possua esses arquivos instalados em sua máquina, os comandos a seguir instalam eles.

**Comando para Windows PowerShell 💻:**
    
    #Run as administrator...
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.4'))

**Comando para macOS 🍎:**

    /bin/bash -c "$(curl -fsSL https://php.new/install/mac/8.4)"

**Comando para Linux 🐧:**

    /bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"

Após executar o comando a cima necessário para a sua máquina, feche e reabra o seu terminal para a execução do próximo código. Agora que você já possui os componentes solicitados, podemos começar a instalação do *instalador do Laravel* via *Composer*:

    composer global require laravel/installer

Agora que todos os preparativos foram instalados, você já está pronto para a criança do seu aplicativo *Laravel*!

## Criação e Iniciação do Projeto 
Agora que está tudo pronto, podemos executar o nosso primeiro código para a criação do nosso aplicativo *Laravel*:

    laravel new example-app

O *instalador do Laravel* perguntará qual é o seu *framework de teste*, *banco de dados* e *kit inicial preferidos*, selecione com base em suas preferencias. Após a criação do aplicativo, você já pode acessar servidor de desenvolvimento do *Laravel* usando a seguinte sequência de códigos:

> **Atenção**: *Cada linha do código deve ser executado **INDIVIDUALMENTE!***

    cd example-app
    npm install
    npm run build
    composer run dev

 Pronto! O seu projeto foi criado e iniciado com sucesso! Ele estará localizado no seu http://localhost:0000/, para caso queira abrir, basta usar pressionar o *Ctrl* e clicar com o *Mouse* para acessar o seu aplicativo *Larevel*.

## Desenvolvimento de um Projeto
Ao baixar um projeto e tentar executar, alguns erros irão aparecer. Siga esses passos para resolvê-los. Todos os comandos devem ser rodados no PowerShell.

## Passo 1
Use o comando seguinte para baixar as dependências do projeto, que vai para uma pasta chamada Vendor:

    composer install

## Passo 2
Se o projeto possuir Javascript, use o seguinte comando para instalar as dependências dele:

    npm install

## Passo 3
Após rodar o comando "npm install", caso o projeto possua Webpack ou Vite, também será necessário rodar este comando:

    npm run build

## Passo 4
Agora, em uma pasta chamado Vendor, terá um arquivo chamdo ".env.example". Copie e cole esse arquivo nessa mesma pasta e renomeie a cópia como apenas ".env".

## Passo 5
Para agora, será necessário criar uma chave encriptada para o projeto. Para isso, use o seguinte comando:

    php artisan key:generate

## Passo 6
O último passo requer que rode as _migrations_ para que seja criado um banco de dados. Isso é feito com o comando a seguir:

    php artisan migrate

Pronto! Após esses passos, seu projeto estará funcionando corretamente.

## Para rodar a aplicação

Para Rodar a aplicação bastar escrever o código:

    composer run dev

## Automoção 

Um arquivo chamado configurações-laravel está nesse repositório onde fara todos esses comandos automaticamente, a única necessidade será de criar o arquivo .env

