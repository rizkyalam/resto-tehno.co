$(document).ready(function(){

    // mengubah style pada border-bottom di search-input
    $("#input-cari").focusout(() => {
        $(".search-input").css('border-bottom', '3px solid #464648');
    });

    $("#input-cari").focusin( () =>{
        $(".search-input").css('border-bottom', '3px solid #b7cf31');
    });
    
    // mengaktifkan sidebar pada layar jendela yang kurang dari 645px
    $("#menu").on("click", () => {
        $("body").css("overflow", "hidden");
        $("nav").css("width", "80%");
        $("nav").css("display", "inline");
    });

    $(".close-bars").on("click", () => {
        $("body").css("overflow", "auto");
        $("nav").css("width", "0");
        $("nav").css("display", "none");
    });

    $("#menu").blur(() => {
        $("body").css("overflow", "auto");
        $("nav").css("width", "0");
        $("nav").css("display", "none");
    });

    //fungsi cari
    function _cari(){
        if($('.row-search')){
            $('.row-search').html('');
            $('#search-menu').html('');
        }

        $.ajax({
            url: 'https://api.spoonacular.com/food/products/search',
            type: 'get',
            dataType: 'json',
            data: {
                'query': $('#input-cari').val(),
                'apiKey': 'bc309965b3314baf9f6104beea43be4b'
            },
            success: result => {                
                if(result.totalProducts > 0) {
                    let product = result.products;                     

                    $('#ket').css('display', 'none');
                                        
                    $('#search-menu').append(`
                    <div class="row-search"></div>
                    `);

                    $.each(product, (i, data) => {

                        $('.row-search').append(`
                        <div class="card card-search">
                            <img src="${data.image}" alt="${data.id}">
                            <p>${data.title}</p>
                        </div>
                        `);

                    });

                    $('#input-cari').val('');

                } else {

                    $('#search-menu').html(`
                    <p style="text-align: center; padding: 3em;">Hasil tidak ditemukan</p>
                    `);

                    $('#input-cari').val('');

                }
            }
        });
    }

    // Mendapatkan data dari web API
    $("#logo-cari").on("click", () => {
        _cari();
    });

    $("#input-cari").on('keyup', event => {
        if(event.keyCode === 13) {
            _cari();
        }
    });

});