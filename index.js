// *******************************************************************
// ** SCCM_API
// *******************************************************************

const request   = require('request')
const SimpleAPI = require('./modules/SimpleAPI')

/* ------------------------------------------ */
/* Get Data                                   */
/* ------------------------------------------ */

var reqParam = {
  url: 'http://10.16.250.72/v_sccm_acct_de?out=rows' // &limit=2000'
}
request.get(reqParam, function (error, response, payload) {      
  console.log('GET:', error)
  if (!error){
    request.del('http://164.139.134.79:8001/sccm', undefined, function (error, response, body) {
      console.log('DELETE:', error)
      if (!error){

        /* ------------------------------------------ */
        /* Insert into Database (POST)                */
        /* ------------------------------------------ */
        payload = JSON.parse(payload)
        payload.forEach(element => {

        /* ------------------------------------------ */
        /* Prepare JSON (BODY)                        */
        /* ------------------------------------------ */
        var body = { 
          json: { 
              ComputerName: element.ComputerName,
              SystemOUName: element.SystemOUName,
              Model: element.Model,
              Account: element.Expr1,
              Timestamp: element.Timestamp
            }
          }

        /* ------------------------------------------ */
        /* Do the POST                                */
        /* ------------------------------------------ */
        // Parameters
        // domain: 164.139.134.79
        // port: 8001
        // timeout: 30 secs
        // ssl: false 
        // debug: false
        // json response:true
        var api = new SimpleAPI('164.139.134.79', 8001, 1000 * 30, false, false, true)
        var headers = {
          'Content-Type': 'application/json',
          'Accept':       'application/json' 
        }
        var params = {
        }
        var path = '/SCCM';

        api.Post(path, headers, params, body.json
            , function(response) { // success
              //console.log( response );
            }
            , function(error, body) { // error

              switch (error.toString()) {
                case 'Error: read ECONNRESET':
                  //console.log('A:',error.toString())
                  //console.log('A:',body)  
                  break
                case 'Error: connect ETIMEDOUT 164.139.134.79:8001':  
                  break
                case 'Error: socket hang up':
                  break
                default:
                  console.log('A:',error.toString())
              }

            }
            , function(error) { // timeout
              //console.log('B', new Error('timeout error') );
        })

        
//        request.post('http://10.16.148.162:8080/sccm', body, function (error, response, payload) {
//          if (!error) {
//            console.log('OK:', response)
//          } else {
//            console.log('ERROR:',error)
//          }
//        })


        }) // END FOR
      }
    })
  }
})

