import os

# Nome do arquivo
nome_arquivo= str(input("Insira o nome da arquivo: ")) 

if not nome_arquivo.endswith('.txt'): #alterando o tipo de arquivo para txt
    nome_arquivo += '.txt'
    
# Nome da pasta
print("""
    Selecione a pasta:
    
    1) a caminho
    2) Estoque
    3) vendido
"""
    )

nome_pasta = str(input("Resposta: ")) 

if nome_pasta == '1':
    nome_pasta = 'a caminho'
elif nome_pasta == '2':
    nome_pasta = 'Estoque'
elif nome_pasta == '3':
    nome_pasta = 'vendido'

# Caminho onde os arquivos serão criados
caminho = fr"C:\Users\Filipe André\OneDrive\Documentos\1 Projetos Pessoais para crescer\projeto 1\Loja\{nome_pasta}"  
loja_caminho = os.path.join(caminho, nome_arquivo)

if not os.path.exists(loja_caminho):
    with open(loja_caminho, 'w') as arquivo:
        print(f"arquivo {nome_arquivo} criada com sucesso!")
        pergunta = str(input("Deseja inserir os dados do item? (s/n) "))
        if pergunta == 's' or pergunta == 'S':
            nome = str(input("Insira o nome do item: "))
            quantidade = int(input("Insira a quantidade do item: "))
            preco = float(input("Insira o preço do item: "))
            tamanho = str(input("Insira o tamanho do item: "))
            cor = str(input("Insira a cor do item: "))
        else:
            nome = ' '
            quantidade = ' '
            preco = ' '
            tamanho = ' '
            cor = ' '
        
        Dados = (nome, quantidade, preco, tamanho, cor)
        
        arquivo.write("Informações:" + '\n' + str(Dados))
        Dados_1 = f"Nome: {nome}\n Quantidade: {quantidade}\n Preço: {preco}\n Tamanho: {tamanho}\n Cor: {cor}\n"
        print(Dados_1,)
        print("o profuto esta:",nome_pasta)
        arquivo.close()
else:
    print(f"Arquivo {nome_arquivo} já existe!")
    
    