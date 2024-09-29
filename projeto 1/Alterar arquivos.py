import os

# nome do arquivo
nome_arquivo= str(input("Insira o nome da arquivo: "))
if not nome_arquivo.endswith('.txt'): #alterando o tipo de arquivo para txt
    nome_arquivo += '.txt'
# nome da pasta
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

# caminho onde os arquivos são criados
caminho = fr"C:\Users\Filipe André\OneDrive\Documentos\1 Projetos Pessoais para crescer\projeto 1\Loja\{nome_pasta}"  
loja_caminho = os.path.join(caminho, nome_arquivo)

# editar arquivo
with open(loja_caminho, 'w') as arquivo:
    print(f"arquivo {nome_arquivo} selecionado")
    print("""O que deseja editar:
        1) nome
        2) quantidade
        3) preco
        4) tamanho
        5) cor
        """)
    edit = str(input("Resposta: "))
    if edit == '1':
        nome = str(input("Insira o novo nome do item: "))
        arquivo.write(f"Nome: {nome}\n")
    elif edit == '2':
        quantidade = int(input("Insira a nova quantidade do item: "))
        arquivo.write(f"Quantidade: {quantidade}\n")
    elif edit == '3':
        preco = float(input("Insira o novo preço do item: "))
        arquivo.write(f"Preço: {preco}\n")
    elif edit == '4':
        tamanho = str(input("Insira o novo tamanho do item: "))
        arquivo.write(f"Tamanho: {tamanho}\n")
    elif edit == '5':
        cor = str(input("Insira a nova cor do item: "))
        arquivo.write(f"Cor: {cor}\n")
    else:
        print("Insira um valor valido")
        exit()