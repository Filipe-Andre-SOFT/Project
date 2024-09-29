#Selecionar pasta para apagar
import os
import shutil

# Caminho da pasta
caminho = r"C:\Users\Filipe André\OneDrive\Documentos\1 Projetos Pessoais para crescer\projeto 1\Loja"
os.chdir(caminho)

pasta = input("Insira o nome da pasta que deseja apagar: ") # nome da pasta a ser apagada

# Apagando pasta
shutil.rmtree(pasta)

print(f"Pasta {pasta} apagada com sucesso!")
