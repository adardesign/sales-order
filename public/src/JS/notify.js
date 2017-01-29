var notify = {
  defaults: {
    placeholder: ".alert-placeholder",
    closeEle: "<button type='button' class='close close-alert'>×</button>",
    html: "",
    defaultClass: "alert alert-box",
    type: "default",
    autoClose: true,
    delay: 10000
  },
  add: function add(config) {
    config = $.extend({}, this.defaults, config);
    if (config.placeholder === this.defaults.placeholder && !$(config.placeholder).length) {
      $("body").prepend("<div class='alert-placeholder'> </div>")
    }
    var self = this,
      notify = $("<div>", {
        "class": config.defaultClass + " " + config.type,
        html: config.closeEle + "" + config.html
      }).appendTo(config.placeholder).on("mouseenter mouseleave", function(e) {
        if (e.type === "mouseenter") {
          clearTimeout(timeout);
        } else {
          setTheTimeout(1000);
        }
      }),
      timeout,
      setTheTimeout = function(delay) {
        if (!config.autoClose) {
          return;
        }
        timeout = setTimeout(function() {
          self.remove(notify);
        }, delay || config.delay);
      };
    setTheTimeout();
  },
  remove: function remove(notification) {
    notification.find(".close-alert").trigger("click");
  },
  removeAllNotifications: function removeAllNotifications() {
    $(".alert-box").remove();
  },

  removeOldNotification: function removeOldNotification(notificationData) {
    if (!notificationData || (!notificationData.id && !notificationData.text)) {
      return;
    }
    var notifications = $('.alert-box.error'),
      notificationKey = notificationData.id ? notificationData.id : notificationData.text

    if (notifications.length) {
      if (notificationData.id) {
        notifications.find("[data-notify-id='" + notificationData.id + "']").parent().remove();
      } else {
        notifications.find(":contains('" + notificationData.text + "'):last").parent().remove();
      }
    }

  }
};