let request = require('request');
let TDKEY = "16dc3ea230c5476091afb28109dc0e29" ;



const TradeMarketsPrice = async (req, res) => {
    try {

      const demoFun =async (tickers)=>{
        let tdurl = 'https://api.twelvedata.com/price?symbol='+ tickers.toString() + '&apikey=' + TDKEY;

        let getdata = null;
        request.get({
            url: tdurl,
            json: true,
            headers: {'User-Agent': 'request'}
          }, (err, res, data) => {
            if (err) {
              console.log('Error:', err);
            } else if (res.statusCode !== 200) {
              console.log('Status:', res.statusCode);
            } else {
              getdata = data;
             
              console.log(getdata);

            
            }
         
        });
       
        return getdata;
      }
      
      
     const data = demoFun(["USD/JPY", "GDX"])
      


    

    } catch (error) {
        console.log(error);
    }
};




module.exports = { TradeMarketsPrice};
