jQuery(document).ready(function($){$('.thumb-product-filter').click(function(event){if(event.preventDefault){event.preventDefault();}else{event.returnValue=false;}
var selecetd_taxonomy=$(this).attr('data-thumb-product-cat');$('.newest_items').fadeOut();$('.loader').show();data={action:'filter_thumb_products',tijarah_thumb_product_ajax_nonce:tijarah_ajax_thumb_products_obj.tijarah_thumb_product_ajax_nonce,taxonomy:selecetd_taxonomy,};$.post(tijarah_ajax_thumb_products_obj.tijarah_thumb_product_ajax_url,data,function(response){if(response){$('.newest_items').html(response);$('.newest_items').fadeIn();$('.loader').hide();$(".sit-preview").smartImageTooltip({previewTemplate:"envato",imageWidth:"500px"});};});});});