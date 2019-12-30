function uploadlambda {
  cd "backend/lambda/$1"
  zip "../../../tmp/$1.zip" ./index.js
  cd -

  aws lambda update-function-code --function-name "$1" --zip-file fileb://tmp/"$1".zip
}

uploadlambda splytsPut
uploadlambda splytsGet
uploadlambda splytsGetById
