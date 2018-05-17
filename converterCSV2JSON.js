// convertercsv2json.js program
const csv2json = require('csvtojson')
const fs = require('fs')

var csvFile = 'customer-data.csv'


if (process.argv[2] != null) {
  csvFile = process.argv[2]
}
let jsonData = ""
let counter = 0
let splitArr = csvFile.split(".")
let fileName = splitArr[0] + ".json"
console.log(`The converted file will be named: ${fileName}`)
const converter = csv2json()
converter.fromFile(csvFile)
converter.on('json',(jsonObj) =>{
  jsonData += JSON.stringify(jsonObj)+"\n"
  counter++
})
converter.on('done', (error) =>{
  if(error){
    console.log(error.message)
  } else {
    console.log(`File ${csvFile} was parsed successfully`)
    console.log(`Total records parsed: ${counter}`)
    fs.writeFile(fileName,jsonData, function(error2) {
      if(error2){
        console.log(error2)
      }
      console.log('The file was saved successfully!')
    })
  }
})
