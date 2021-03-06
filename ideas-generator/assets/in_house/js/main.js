$(function() {
    var Main = {

        // TODO get this from the backend
        //products: ["", "", "", "", "", ""],
        //markets: ["", "", ""],

        randomProduct: '',
        randomMarket: '',

        init: function () {
            //all init data
            Main.getDataFromServer();
            Main.bindSpinButton();
        },

        //TODO - save in backend in local cache for with Expiry
        initDropDowns: function(){

           if (Main.markets == undefined || Main.products == undefined){
               setTimeout(Main.initDropDowns, 200);
               return;
           }

            Main.fillSelectWithData($('#product select'),
                Main.products, Main.randomItemIndex(Main.products));
            Main.fillSelectWithData($('#market select'),
                Main.markets,  Main.randomItemIndex(Main.markets));
        },

        fillSelectWithData: function(select, array, randomIndex){
            var optionElement;
            $.each(array, function(index, serverData) {
                var text = serverData.attributes.name;
                optionElement = '<option></option>';
                if (randomIndex == index){
                    optionElement = '<option selected="selected"></option>';
                }
                select.append(
                    $(optionElement).val(text).html(text)
                );
            });
        },

        // a method to select a random item from the products/markets array
        randomItemIndex: function(array){
            return Math.floor(Math.random()*array.length);
        },

        getDataFromServer: function(){
            var query = new Parse.Query('Markets');
            query.find({
                success: function(markets) {
                    Main.markets = markets;
                }
            });

            query = new Parse.Query('Products');
            query.find({
                success: function(products) {
                    Main.products = products;
                }
            });

            Main.initDropDowns();
        },

        bindSpinButton: function(){
            $('#spin-btn').on('click', function () {
                Main.initDropDowns();
            })
        }




    };

    window.Main = Main;

    $(document).ready(function() {
        //global easy to use methods
        function p(message){
            console.log(message);
        }

        window.p = p;

        function initFromServer() {
            if (typeof(Parse) == 'undefined') {
                console.log('Parse not ready yet');
                setTimeout(initFromServer, 200);
            }else{
                console.log('Parse is ready');
                setTimeout(Main.init, 300)

            }
        }

        initFromServer();
    });

});