#!/bin/sh

i=0;
v=0;
curPath=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd );
username=$(whoami);

usage() { 
	echo "Usage: [-v] [-i: module_item] module_name" 1>&2; exit 1; 
}

verbose() {

	if [ "$v" -eq 1 ]; then
		echo $1
	fi
}

createFolder() {
    if [ ! -d $1 ]; then
        mkdir $1
    fi
}

createFile() {
    if [ ! -f $1 ]; then
        touch $1
    fi
}

createInner() {
    pDir=$1

    createFolder $pDir
    createFolder "${pDir}/components"

    createFile "${pDir}/index.js"
    createFile "${pDir}/View.js"
    createFile "${pDir}/style.js"
    #createFile "${pDir}/components/index.js"

    verbose "created $modulePackage in $module"
}

while getopts "hvi:" o; do
    case "${o}" in
        i)
            i=1
            modulePackage=$OPTARG
            ;;
        v)
            v=1
            ;;
        h)
            usage
            ;;
        *)
            usage
            ;;
    esac
done
shift $((OPTIND-1))

module=${curPath}/${1}/

if [ -z "$1" ]; then
    usage
    exit;
fi

if [ "$i" -eq "1" ]; then
    createInner $module${modulePackage}

    exit;
fi



createFolder $module
createFolder "${module}/common"

createFile "${module}/index.js"
createFile "${module}/store.js"

createInner "${module}/welcome"

verbose "omodule $1 created"