#!/bin/bash

# Instala el proyecto Gulp Secuoyas.
# Dependencias: nodejs
# Secuoyas 2015

# Programs
APPS=(node bower gulp)

# Symbols
SKULL="\xE2\x98\xA0"
CHECK="\xe2\x9c\x93"

# Colors
colorReset="\x1b[39;49;00m"
colorRed="\x1b[31;01m"
colorGreen="\x1b[32;01m"
colorPirite="\x1b[43;01m]"

# Welcome
echo -e "\nSecuoyas front-end instalation script\n"

# Func. Comprueba si existe un programa.
command_exists () { type "$1" &> /dev/null ; }

# Func. Instala un programa.
install_app () {
    # Node
    # Si no está instalado node, el script te avisa y para el proceso de instalación.
    if [ "$1" = ${APPS[0]} ]; then
        echo  "Instala node.js con macports, homebrew o desde www.nodejs.org\n";
        echo -e "Instalación abortada"
        exit
    fi

    # Bower
    # Si no está bower se instala con npm
    if [ "$1" = ${APPS[1]}  ]; then
        read -p "Bower no está en el sistema, ¿instalarlo? (s/n)? " answer
        case ${answer:0:1} in
            s|S )
                echo "npm install -g bower";;
            * )
            echo No
            echo -e "Instalación abortada"
            exit;;
        esac
    fi
    
    # Gulp (global)
    # Si no está gulp se instala con npm
    if [ "$1" = ${APPS[2]}  ]; then
        read -p "Gulp no está en el sistema, ¿instalarlo? (s/n)? " answer
        case ${answer:0:1} in
            s|S )
                echo "npm install -g gulp";;
            * )
            echo No
            echo -e "Instalación abortada"
            exit;;
        esac
    fi
    
}

# Pasamos por todos los programas (node y bower)
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
echo -e "\nInstalando dependencias de node y bower"
npm install --save-dev --silent
bower install --save

# Bye :)
echo -e "\nParece que todo ha ido bien. Buena suerte :)\n"
