import qrcode from 'qrcode';


class qrController {

    test(req,res){
        qrcode.toString('I am a pony!',{type:'terminal'}, function (err, url) {
            console.log(url)
          })
    }
}
export default new qrController();