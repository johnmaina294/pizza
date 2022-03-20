function capitalize_inputs(str) { 
  return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function placeOrder() { 
  var name = capitalize_inputs($("input#name").val());
  var flavor = $("#pizza-flavor").val();
  var size = $("#pizza-size").val();
  var crust = $("#pizza-crust").val();
  var toppings = [];
  $.each($('input[name="toppings"]:checked'),
      function() {
          toppings.push($(this).val());
      });
  var number = $("#pizza-number").val();
  var sizeCost;
  if (flavor === "Bbq Beef" || flavor === "Bbq Chicken" || flavor === "Hawaiian" || flavor === "Pulled Pork") {
      if (size === "Small") {
          sizeCost = 420;
      } else if (size === "Medium") {
          sizeCost = 670;
      } else if (size === "Large") {
          sizeCost = 920;
      }
  } else if (flavor === "Bbq Pork" || flavor === "Grilled Pork" || flavor === "Margharita" || flavor === "Marinara" || flavor === "Pepperoni") {
      if (size === "Small") {
          sizeCost = 470;
      } else if (size === "Medium") {
          sizeCost = 720;
      } else if (size === "Large") {
          sizeCost = 970;
      }
  } else if (flavor === "Chicken Tikka" || flavor === "Gamberi" || flavor === "Mushroom" || flavor === "Oyster" || flavor === "Spicy Veggie" || flavor === "Original Veggie") {
      if (size === "Small") {
          sizeCost = 520;
      } else if (size === "Medium") {
          sizeCost = 770;
      } else if (size === "Large") {
          sizeCost = 1120;
      }
  }
  var crustCost; 
  if (crust === "Gluten Free") {
      crustCost = 250;
  } else if (crust === "Hand Tossed") {
      crustCost = 220;
  } else if (crust === "Original") {
      crustCost = 170;
  } else if (crust === "Pan") {
      crustCost = 200;
  } else if (crust === "Stuffed") {
      crustCost = 270;
  } else if (crust === "Thin") {
      crustCost = 120;
  }
  var checkboxes = $('input[name="toppings"]:checked').length; 
  if (checkboxes <= 3) { 
      if (size === "Small") {
          var toppingsCost = checkboxes * 90;
      } else if (size === "Medium") {
          var toppingsCost = checkboxes * 120;
      } else if (size === "Large") {
          var toppingsCost = checkboxes * 150;
      }
      $("input[type='checkbox']:not(:checked)").prop({
          disabled: true
      });
      $('#placeorder').prop('disabled', true);
      $("#yourorder").show();
      var price = (sizeCost + crustCost + toppingsCost);
      var totalPrice = parseInt(price * number);
      $(".salutation").text("Hey" + " " + name + ". Here's your order:");
      $(".pizza-size").append('<tr><td id="pizza-size">' + size);
      $(".number").append('<tr><td id="number">' + number);
      $(".pizza-crust").append('<tr><td id="pizza-crust">' + crust);
      $(".pizza-flavor").append('<tr><td id="pizza-flavor">' + flavor);
      $(".pizzaTotal1").append('<tr><td id="pizzaTotal1">' + totalPrice);
      arrayTotal.push(totalPrice);
      if (toppings == "") {
          $(".toppings").append('<tr><td id="pizza-toppings">' + "-");
      }
      if (toppings != "") {
          $(".toppings").append('<tr><td id="pizza-toppings">' + toppings);
      }
      $(".name").text(name);
  } else {
      document.getElementById("pizza-toppings-help").innerHTML = "Please select a maximum of 3!";
      document.getElementById("pizza-toppings-help").style.cssText = 'color:red !important' 
  }
}

function makeDelivery() {
  $("#deliveryConfirmation").show();
  var location = capitalize_inputs($("input#location").val()); 
  var phone = $("input#phone").val();
  $(".location").text(location);
  $(".phone").text(phone);
  $("#delivery").hide();
}

$(document).ready(function() {
  $("#orders").submit(function(event) {
      event.preventDefault();
      placeOrder();
  });
  $("#deliveryDetails").submit(function(event) {
      event.preventDefault();
      makeDelivery();
  });
});

function cancelOrders() {
  location.reload(); 
}

var arrayTotal = []; 

function deliveryOptions() {
  $("#deliveryOptions").show();
  $("#orderDetails").hide();
  document.getElementById("orders").reset(); 
  $('#placeorder').prop('disabled', false); 
  var checkoutTotal = 0;
  arrayTotal.forEach(function(index) {
      checkoutTotal = checkoutTotal + index;
  });
  $(".totalPick").text(checkoutTotal);
  var checkoutTotalDel = checkoutTotal + 200;
  $(".totalDel").text(checkoutTotalDel);
}

function pickUp() {
  $("#pickUpConfirmation").show();
  $("#yourorder").hide();
}

function deliver() {
  $("#delivery").show();
  $("#yourorder").hide();
}

function reloadPage() {
  location.reload(); 
}

function clearTextarea() {
  $("#messageForm").reset();
}

function addOrder() {
  $('#placeorder').prop('disabled', false); 
  $("input[type='checkbox']").prop({ 
      disabled: false
  });
  $("input[type='checkbox']").prop({ 
      checked: false
  });
} 