var orderSheet = {},
  openTabs = [],
  orderInfo = {},
  orderItems = {};



/*
     ///////////////////////////////////////////////////////////                                                                                                                                      
     ///////////////////////////////////////////////////////////                                                                                                                                      
    
     .d8b.   .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
    d8' `8b d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
    88ooo88 8P         88       88    88    88 88V8o 88 `8bo.   
    88~~~88 8b         88       88    88    88 88 V8o88   `Y8b. 
    88   88 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
    YP   YP  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
                                                                                                                                        
     ///////////////////////////////////////////////////////////                                                                                                                                      
     ///////////////////////////////////////////////////////////                                                                                                                                      
    
*/

actions.init();

actions.add({
  onNav: function onNav(e, ele) {
    e.preventDefault();

    var jThis = ele,
      catagory = jThis.attr("data-catagory");
    $("#order-form").find("#" + catagory).addClass("show").siblings().removeClass("show");
    jThis.addClass("active").siblings().removeClass("active");
    if (jThis.hasClass("loaded")) return;
    $.ajax({
      url: "data/" + catagory + ".json",
      dataType: "JSON"
    }).done(function(data) {
      renderSection({
        catagory: catagory,
        data: data
      });
      jThis.addClass("loaded");
    });

    openTabs.push(catagory);
    localStorage.setItem("openTabs", JSON.stringify(openTabs));
  },
  imgZoom: function imgZoom(e, ele) {
    var jThis = ele,
      imgSrc = jThis.attr("src"),
      modal = $(".large-image"),
      title = jThis.closest(".card").find(".item-title").text(),
      largeImg = modal.find("img").attr("src", imgSrc);
    modal.addClass("show");
    modal.find("h1").text(title);
    $("body").addClass("modal-active");
  },
  "removeItem": function removeItem(e, jThis) {
    var listItem = jThis.closest("li")
    id = listItem.attr("data-id");
    $("[data-id='" + id + "']").removeClass("selected");
    removeFromOrder(id);
  },
  addItem: function addItem(e, jThis) {
    var itemEle = jThis.closest("li"),
      id = itemEle.attr("data-id");
    itemEle.addClass("selected");
    addToOrder({
      id: id,
      price: itemEle.find(".item-price").attr("data-price"),
      title: itemEle.find(".item-title").text(),
      qty: itemEle.find(".item-qty-input").val()
    });

  },

  submitOffline: function submitOffline() {

  }
});



$(document).on('click', ".modal-active", function closeModal(e) {
  var eTarget = $(e.target);
  if (eTarget.closest(".modal-box").length) return;
  $(".modal-box").removeClass("show");
  $("body").removeClass("modal-active");

});

$(document).on('click', ".close-alert", function closeAlert(e) {
  $(this).closest(".alert").remove();

});



$("#order-form").on("input", ".item-qty-input", function() {
  var jThis = $(this),
    val = jThis.val(),
    itemEle = jThis.closest("li"),
    id = itemEle.attr("data-id");
  if (isItemInOrder(id)) {
    orderItems[id].qty = val;
    getSummaryLineEle(id).find(".item-qty-input").val(val);
    refreshOrderTotals();
  }
  saveItemsLocaly();
});

$("#order-summary").on("input", ".item-qty-input", function() {
  var jThis = $(this),
    val = jThis.val(),
    itemEle = jThis.closest("li"),
    id = itemEle.attr("data-id");
  if (isItemInOrder(id)) {
    orderItems[id].qty = val;
    getItemLineEle(id).find(".item-qty-input").val(val);
    refreshOrderTotals();
  }
  saveItemsLocaly();
});

$("#order-summary").on("input", ".item-comment-input", function() {
  var jThis = $(this),
    val = jThis.val(),
    itemEle = jThis.closest("li"),
    id = itemEle.attr("data-id");
  if (isItemInOrder(id)) {
    orderItems[id].comment = val;
  }
  saveItemsLocaly();
});



$("#order-summary").on("input", ".item-comment-input", function() {
  var jThis = $(this),
    val = jThis.val(),
    itemEle = jThis.closest("li"),
    id = itemEle.attr("data-id");
  if (isItemInOrder(id)) {
    orderItems[id].comment = val;
  }
  saveItemsLocaly();
});

$("#order-information").on("submit", function onSubmitOrder(e) {
  e.preventDefault();
  // validate...

  if (navigator.onLine === false) {
    submitFallbackOffline();
    return;
  }
  submitOrder();
});



$(document).on("click", ".clearData", function clearData(e) {
  e.preventDefault();


  var jThis = $(this),
    type = jThis.attr("data-type");
  if (type === "all") {
    //clearTempSavedData();
  } else {
    clearTempSavedData();
  }
  location.reload();
});

// toggle-offline-orders



$("#order-details").on("change", ":input", function() {
  var jThis = $(this),
    name = jThis.attr("name"),
    value = jThis.val();
  orderInfo[name] = value;
  localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
});


$(document).on("click", ".toggle-offline-orders", function onToggleOfflineOrders(e) {
  e.preventDefault();
  showOfflineOrders();
});


/*
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    
    .88b  d88. d88888b d888888b db   db  .d88b.  d8888b. .d8888. 
    88'YbdP`88 88'     `~~88~~' 88   88 .8P  Y8. 88  `8D 88'  YP 
    88  88  88 88ooooo    88    88ooo88 88    88 88   88 `8bo.   
    88  88  88 88~~~~~    88    88~~~88 88    88 88   88   `Y8b. 
    88  88  88 88.        88    88   88 `8b  d8' 88  .8D db   8D 
    YP  YP  YP Y88888P    YP    YP   YP  `Y88P'  Y8888D' `8888Y' 
    
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
                                                                        
*/

saveItemsLocaly = function saveItemsLocaly() {
  // 
  localStorage.setItem("orderItems", JSON.stringify(orderItems));
};

showOfflineOrders = function showOfflineOrders() {
  if (!$(".offline-orders").length) {
    var offlineOrders = localStorage.getItem("offline-orders");
    if (!offlineOrders) return;
    offlineOrders = JSON.parse(offlineOrders);
    $("body").append(tmpl("offlineOrdersTmpl", offlineOrders));
  }


  $(".offline-orders").addClass("show");
  $("body").addClass("modal-active");

};


$(document).on("click", ".close-modal", function closeModal(e) {
  $(this).closest(".modal-box").removeClass("show");
  $("body").removeClass("modal-active");
});



getSummaryLineEle = function getSummaryLineEle(id) {
  return $("#order-summary").find("[data-id=" + id + "]");
};
getItemLineEle = function getItemLineEle(id) {
  return $("#order-form").find("[data-id=" + id + "]");
};

renderSection = function renderSection(dataObj) {
  console.log(dataObj);
  var ele = $("#" + dataObj.catagory);
  ele.html(tmpl("catagoryTmpl", dataObj));
};

addToOrder = function addToOrder(obj) {
  if (!orderItems[obj.id]) {
    orderItems[obj.id] = obj;
    refreshOrderSummary();
    refreshOrderTotals();
  }
  saveItemsLocaly();
};
removeFromOrder = function removeFromOrder(id) {
  if (orderItems[id]) {
    delete orderItems[id];
    saveItemsLocaly();
    refreshOrderSummary();
    refreshOrderTotals();

  }

};
isItemInOrder = function isItemInOrder(id) {
  return orderItems[id] ? true : false;
};

refreshOrderSummary = function refreshOrderSummary() {
  $("#order-summary").find("ul").html(tmpl("orderSummaryTmpl", {}));
  refreshOrderTotals();
};

calculateOrderTotals = function calculateOrderTotals() {
  var ammount = 0,
    count = 0,
    totals = {};
  $.each(orderItems, function(i, e) {
    ammount += e.price * e.qty;
    count += (+e.qty);
  });
  totals.ammount = ammount;
  totals.count = count;
  orderInfo.ammount = totals.ammount;
  orderInfo.count = totals.count;
  localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
  return totals;
};

refreshOrderTotals = function refreshOrderTotal() {
  $("#order-total").html(tmpl("orderTotalTmpl", calculateOrderTotals()));

};

submitOrder = function submitOrder() {
  var dfd = $.Deferred();


  var orderPayload = {
    orderItems: orderItems,
    orderInfo: orderInfo
  }

  orderPayload = JSON.stringify(orderPayload)
    // 
  $.ajax({
    url: "API/submitOrder",
    data: {
      orderData: orderPayload
    },
    type: "POST"
  }).done(function onSubmit(data) {
    dfd.resolve(data);
  }).done(function orderSucsess() {
    $(".submit-order").before($("#sucsessTmpl").html());
    $(".submit-order").remove();
    clearTempSavedData();
  }).fail(function orderFail(err) {
    // 
    if (navigator.onLine) {
      notify.add({
        html: "<p>You appear to be online, And it still didn't submit, somthing must be worng...</p>",
        type: "error alert-danger order-fail sticky",
        autoClose: false
      });
    } else {
      submitOffline();
    }
  });
  // if succeses 
  // clearStorage
  return dfd;
};


clearTempSavedData = function clearTempSavedData() {
  localStorage.removeItem("orderItems");
  localStorage.removeItem("orderInfo");
  localStorage.removeItem("openTabs");
}


submitOffline = function() {
  var offlineOrderCount = localStorage.getItem("offline-order-count") || 0,
    getOfflineOrders = localStorage.getItem("offline-orders");
  getOfflineOrders = getOfflineOrders ? JSON.parse(getOfflineOrders) : [];
  getOfflineOrders.push({
    orderItems: orderItems,
    orderInfo: orderInfo
  });


  localStorage.setItem("offline-order-count", ++offlineOrderCount);
  localStorage.setItem("offline-orders", JSON.stringify(getOfflineOrders));
  // localStorage.clear();

  notify.add({
    html: "<p>Your order has been submitted <strong>offline</strong>, Make sure to submit it when you are online again</p>",
    type: "error alert-info sticky",
    autoClose: true
  });
}

onOnlineChanger = function onOnlineChanger(e) {};
window.addEventListener('online', onOnlineChanger);
window.addEventListener('offline', onOnlineChanger);


setTimeout(function setDate() {
  Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  });
  $(".order-date :input").val(new Date().toDateInputValue()).trigger("input");
}, 1000);

fetch('data/categories.json', {
  method: 'get'
}).then(function(response) {
  var contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then(function(json) {
      // process your JSON further
    });
  } else {
    console.log("Oops, we haven't got JSON!");
  }
});


$.ajax({
  url: "data/categories.json",
  dataType: "JSON"
}).done(function renderCatagories(categories) {
  $(".order-nav").html(tmpl("categoryNavTmpl", categories));
  $("#order-form").html(tmpl("categorySectionContainerTmpl", categories));
  loadSavedState();
});

loadSavedState = function loadSavedState() {

  // get storaed items
  var storedItems = localStorage.getItem("orderItems"),
    storedOpenTabs = localStorage.getItem("openTabs"),
    storedorderInfo = localStorage.getItem("orderInfo"),
    offlineOrder,
    itemLineEle,
    itemObj,
    summaryLineEle;


  if (storedItems || storedOpenTabs || storedorderInfo) {
    $("body").append($("#savedDataTmpl").html());
  }

  if (storedOpenTabs) {
    storedOpenTabs = JSON.parse(storedOpenTabs);
    storedOpenTabs.forEach(function(e) {
      console.log(e);
      $(".order-nav").find("[data-catagory=" + e + "]").trigger("click");
    });
  }

  if (storedItems) {
    storedItems = JSON.parse(storedItems);
    setTimeout(function() {
      Object.keys(storedItems).forEach(function(e) {
        itemObj = storedItems[e];
        itemLineEle = getItemLineEle(e);
        itemLineEle.find(".item-qty-input").val(storedItems[e].qty);
        itemLineEle.find(".item-add").trigger("click");
        // need to fix 
        if (itemObj.comment) {
          summaryLineEle = getSummaryLineEle(e);
          summaryLineEle.find(".item-comment-input").val(itemObj.comment);
        }
      });
    }, 3000);

    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
  }

  if (storedorderInfo) {
    storedorderInfo = JSON.parse(storedorderInfo);
    orderInfoKeys = Object.keys(storedorderInfo);

    orderInfoKeys.forEach(function(e) {
      $("#order-details").find("[name='" + e + "']").val(storedorderInfo[e]);
    });
    orderInfo = storedorderInfo;
  }

  // Handle offlineOrder
  var offlineOrderCount = localStorage.getItem("offline-order-count");
  if (offlineOrderCount > 0) {
    $(".container").prepend("<a class='toggle-offline-orders' href='#'>See " + offlineOrderCount + " Offline Orders</a>");
  }

};