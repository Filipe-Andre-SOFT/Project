import os

nome_pasta = str(input("Insira o nome da pasta: "))

caminho = r"C:\Users\Filipe André\OneDrive\Documentos\1 Projetos Pessoais para crescer\projeto 1\Loja"  # Caminho onde as pastas serão criadas
loja_caminho = os.path.join(caminho, nome_pasta)

# Verificando se a pasta "Loja" já existe e criando-a se não existir
if not os.path.exists(loja_caminho):
    os.makedirs(loja_caminho)
    print(f"Pasta {nome_pasta} criada com sucesso!")
else:
    print(f"Pasta {nome_pasta} já existe!")

    