# Executar o script:
# sh index.sh   

FOLDER_AMOUNT=4

for index in $(seq 1 $FOLDER_AMOUNT); do
# 1,2 -> bash01, bash02
# 3,4 -> shell01, shell02
# -ge significa `maior ou igual`
folder=$([ $index -ge 3 ] && echo bash-0$index || echo shell-0$index)

# -p cria a pasta mesmo que ela já exista
mkdir -p $folder

cd $(pwd)/$folder
npm init -y --scope @mrcarromesa --silent > /dev/null
# jq - precisa estar instalado, para instalar pode instalar via brew:
# brew install jq
cat package.json | jq '{n: .name, v: .version}'
cd ..

done

rm -rf bash* shell*