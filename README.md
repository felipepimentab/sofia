# Sofia

> Conjunto de scripts para converter dados fornecidos pelo site da cinemateca em um arquivo `.tsv` importável pelo sheets, excel, etc.

## 🛠️ Instalando sofia
Para instalar **sofia** basta abrir o terminal e executar o comando a seguir.

```
curl -sSL https://raw.githubusercontent.com/felipepimentab/sofia/main/scripts/install.sh | sh
```

Após a execução do comando, feche e abra o terminal para atualizar o *path*.

## 🚀 Usando sofia

Para usar é preciso fornecer um arquivo `.txt`. Para gerar um a partir do HTML gerado pelo site da cinemateca o jeito mais fácil é seguindo o passo a passo a seguir:

- Baixe o arquivo HTML do site da cinemateca;
- Clique com o botão direito no arquivo baixado;
- Selecione a opção **Abrir Com**;
- Selecione o **Editor de Texto.app** (nativo do Mac);
- Apague a primeira linha (`Content-type: text/html; charset= iso-8859-1`);
- Salve e feche a janela do **Editor de Texto**;
- Abra novamente o mesmo arquivo com o **Editor de Texto** (talvez demore um pouco);
- Dessa vez o editor vai abrir o arquivo formatado como texto rico e com a acentuação correta;
- Copie o arquivo inteiro com `cmd+A` e `cmd+C`;
- Ainda no editor de texto, no menu superior, clique em **Arquivo > Novo**;
- Cole (`cmd+V`) o texto copiado na nova janela aberta;
- Salve o novo arquivo com um nome simples, sem maiúsculas, acentos ou espaços (confira se extensão do arquivo está como `.txt` e a codificação do texto está como `UTF-8`);
- (Recomendo salvar esse arquivo em uma pasta fácil, de preferência a ***Home*** 🏠).

Para usar **sofia** para converter o arquivo `.txt` em `.tsv`, abra o terminal e execute o comando a seguir, substituindo os termos entre `< >`.

```
sofia <path_to_input.txt> <path_to_output.tsv(optional)>
```

Por exemplo, se o arquivo `.txt` foi salvo na pasta **Documentos** 📄 com o nome `lista-de-cinejornais.txt` então o primeiro termo será `./Documents/lista-de-cinejornais.txt`, uma vez que o terminal já abre na pasta ***Home*** 🏠 por padrão (neste caso, `./` é a pasta ***Home*** 🏠).

O segundo termo é opicional e representa o caminho onde será salvo o arquivo gerado e seu nome. Por exemplo, para salvar o arquivo como `tabela-de-cinejornais.tsv` na pasta **Documentos** 📄, o segundo termo seria `./Documents/tabela-de-cinejornais.tsv`. Se não for passado o segundo termo o arquivo gerado será salvo com o nome e caminho *default*: com o nome `output.tsv` na pasta  ***Home*** 🏠.