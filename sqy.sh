#!/bin/bash

# Instala el proyecto Gulp Secuoyas.
# Dependencias: nodejs
# Secuoyas 2015

# Programs
APPS=(node bower compass)

# Symbols
SKULL="\xE2\x98\xA0"
CHECK="\xe2\x9c\x93"

# Colors
colorReset="\x1b[39;49;00m"
colorRed="\x1b[31;01m"
colorGreen="\x1b[32;01m"
colorPirite="\x1b[43;01m]"

echo -e $colorPirite "\e[91" JANDLER $colorReset

# Welcome
echo -e "\nSecuoyas front-end instalation script\n"

# Comprueba si existe un programa
command_exists () { type "$1" &> /dev/null ; }

# Install a program
install_app () {
    # Node
    if [ "$1" = ${APPS[0]} ]; then
        echo  "Instala node.js con macports, homebrew o desde www.nodejs.org\n";
        echo -e "Instalación abortada"
        exit
    fi

    # Bower
    if [ "$1" = ${APPS[1]}  ]; then
        read -p "Bower no está en el sistema, ¿instalarlo? (s/n)? " answer
        case ${answer:0:1} in
            s|S )
                echo "node install -g bower";;
            * )
            echo No
            echo -e "Instalación abortada"
            exit;;
        esac
    fi

    # Compass
    if [ "$1" = ${APPS[2]}  ]; then
        read -p "Compass no está en el sistema, ¿instalarlo? (s/n)? " answer
        case ${answer:0:1} in
            s|S )
                echo "sudo gem update --system"
                echo "sudo gem install compass";;
            * )
                echo No
                echo -e "Instalación abortada"
                exit;;
        esac
    fi
}

# Loop through programs
for ((i=0; i<${#APPS[*]}; i++));
do
    # Si no está instalado, sugemios la instalación
    if ! command_exists ${APPS[$i]}; then
        echo -e ${APPS[$i]} $colorRed$SKULL $colorReset
        install_app ${APPS[$i]};
    else
        echo -e ${APPS[$i]} $colorGreen$CHECK $colorReset
    fi
done

# Con todas las dependencias instaladas, vamos con el proyecto.
echo "\nInstalando dependencias de node y bower"
echo "npm install --save-dev"
echo "bower install --save"


# Bye :)
echo -e "\nParece que todo ha ido bien. Buena suerte :)\n"
