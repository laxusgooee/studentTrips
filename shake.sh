
#!/bin/sh

v=0;r=0;b=0;a=0;x=0;n=0;d=0;
adbPath='adb';
username=$(whoami);
bundleDir='android/app/src/main/assets/';
sdkDir="/Users/$username/Library/Android/sdk";

usage() { 
    echo "Usage:  $0  [-r] [-v] [-b] [-d] [-a] [-x] [-h] [-n]" 1>&2; exit 1; 
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

# if [ ! -f 'android/local.properties' ]; then
#     echo "no local config which is really neccesary...you have to create it"
#     read -p "so whats your sdk dir ($sdkDir)?" cusSdkDir

#     if [ -z "$cusSdkDir" ]; then
#         cusSdkDir=$sdkDir
#     fi

#     echo "sdk.dir = $cusSdkDir" > android/local.properties
      
#     verbose "created config files"
# fi

while getopts "rvbdaxhn:" o; do
    case "${o}" in
        r)  
            r=1
            ;;
        v)
            v=1
            ;;
        b)
            b=1
            ;;
        d)
            d=1
            ;;
        a) 
            a=1
            ;;
        x) 
            x=1
            ;;
        n) 
            n=1
            npmPackage=$OPTARG
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

device=$1

if [ "$a" -eq "1" ]; then
    react-native run-android
      
    verbose "app should run on ya phone"
fi

if [ "$n" -eq "1" ]; then
    if [ -z "$npmPackage" ]; then
        echo "must put npm package"
        exit
    fi

    npm install $npmPackage --save
      
    verbose "packaged saved"
fi


if [ "$d" -eq "1" ]; then
    react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug

    cd android

    #./gradlew assembleDebug

    #./gradlew assembleRelease

    verbose "built dev for test"
fi

if [ "$b" -eq "1" ]; then

    createFolder $bundleDir

    bundleFile='index.android.bundle'

    createFile "$bundleDir$bundleFile"
    createFile "$bundleDir$bundleFile.meta"
    
    react-native bundle --platform android --dev false --entry-file index.js --bundle-output $bundleDir$bundleFile --assets-dest android/app/src/main/res
      
    verbose "built bundle for assets"
fi

if [ "$r" -eq "1" ]; then
    $adbPath reverse tcp:8081 tcp:8081
      
    verbose "reversed tcp"
fi

if [ "$x" -eq "1" ]; then
    verbose "exit without shake"
    exit
fi

if [ -z "$device" ]; then
    $adbPath shell input keyevent 82
    verbose "shake it all"
else
    $adbPath -s $device shell input keyevent 82
    verbose "operation performed using device $1"
fi
