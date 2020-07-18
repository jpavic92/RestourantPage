$(document).ready(function(){ 
    $('[data-toggle="popover"]').popover();  
    $('[data-toggle="tooltip"]').tooltip();

})

function createRow(jelo, kolicina) {
    return $("<tr><td>" + jelo.JeloId + "</td><td>" + jelo.Naziv +"</td><td>" + kolicina + "</td><td>D</td></tr>");
}

$(function () {

    $.getJSON('http://www.fulek.com/VUA/SUPIT/GetCategoriesAndFoods', function (data) {
        var menuDiv = $('#menu');
        var title, line, itemDiv, itemDesc,itemName, itemPrice, nameAndDescDiv, priceDiv;

        $(data).each(function () {
            title = document.createElement('h4');
            line = document.createElement('div');

            title.append(this.Naziv);
            title.setAttribute("style", "text-align:center")
            $(line).addClass('titleLinija')

            $(menuDiv).append(title);
            $(menuDiv).append(line);

            var ponuda = this.Ponuda;

            $(this.Ponuda).each(function () {
                itemDiv = document.createElement('div');
                nameAndDescDiv = document.createElement('div');
                priceDiv = document.createElement('div');

                itemName = document.createElement('p');
                itemDesc = document.createElement('p');
                itemPrice = document.createElement('a');

                itemName.append(this.Naziv);
                itemDesc.append(this.Opis);
                itemPrice.append(this.Cijena + '.00 kn');

                nameAndDescDiv.append(itemName);
                nameAndDescDiv.append(itemDesc);
                priceDiv.append(itemPrice);

                itemDiv.append(nameAndDescDiv);
                itemDiv.append(priceDiv);

                itemPrice.setAttribute("style", "padding:10px; background-color: #ccc; display: block; text-decoration: none; color: black; ");
                itemPrice.setAttribute("href", "#");
                itemName.setAttribute("style", "font-weight:600; margin-bottom: 0;");
                itemDesc.setAttribute("style", "font-size: .7em;");
                itemDiv.setAttribute("class", "row");
                itemDiv.classList.add("itemDiv");
                itemDiv.setAttribute("data-toggle", "popover");
                nameAndDescDiv.setAttribute("class","col-md-9");
                priceDiv.setAttribute("class","col-md-3 price-div");

                $(menuDiv).append(itemDiv);

                orderName = this.Naziv;

                var order = this;

                $(priceDiv).popover({
                    title: '<h5><strong>' + orderName + '</strong></h5>',
                    html: true,
                    sanitize: false,
                    container: 'body',
                    placement:'right',
                    content: function () {
                        $(document).off('focusin.modal');
                        var content = $('#popover-content').clone().removeClass("d-none").attr("id", "jelo"+ order.JeloId);
                        content.find(".poperOrder").click(function() {
                            var jelo = ponuda.filter(p => p.JeloId == order.JeloId)[0];
                            var kolicina = content.find('.orderQuantity').val();
                            var note = content.find('.orderNotes').val();
                            var tableRow = createRow(jelo,kolicina,note);
                            $("#ordersTable tbody").append(tableRow);
                        });

                        return content;
                    }
                })

                //Close popover when a new one opens 
                $(priceDiv).on('click', function () {
                    $('.price-div').not(this).popover('hide');
                });

                $(document).on('click','.poperClose', function () {
                    $(this).parents(".popover").popover('hide');
                })
            })
        })
    })
})